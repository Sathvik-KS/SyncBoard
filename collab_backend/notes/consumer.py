import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import LiveDoc, Note
from .serializers import NoteCreateSocketSerializer


class NoteConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"notes_{self.room_name}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get("action")

        if action == "delete":
            deleted = await self.delete_note(data["id"], data["sender_id"])
            if deleted:
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {"type" : "note_deleted", "id" : data["id"]}
                )

        elif action == "new":
            serializer = NoteCreateSocketSerializer(data = data)
            if serializer.is_valid():
                # use the validated data from the serializer
                title_data = serializer.validated_data["title"]
                message_data = serializer.validated_data["message"]
                # Save the using the function save_note and save the return data into note variable
                note = await self.save_note(title_data, message_data, data["sender_id"], self.room_name)
                # Send the note saved response to the group 
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {"type" : "note_created", "message" : note.content, "id" : note.id, "sender_id" : note.sender_id}
                )
                # If the data isn't valid, send the error to the user alone
            else:
                error = {
                    "type" : "error",
                    "code" : "INVALID_PAYLOAD",
                    "message" : "Invalid note data.",
                }
                # No channel because it isn't sent to all the users, only the creater of the message
                await self.send(text_data = json.dumps(error))

        else:
            error = {
                "type" : "error",
                "code" : "INVALID_ACTION",
                "message" : "Unsupported action.",
            }
            await self.send(text_data = json.dumps(error))

    async def note_created(self, event):
        await self.send(text_data=json.dumps({
            "type" : "note_created",
            "message" : event["message"], 
            "id" : event["id"], 
            "sender_id" : event["sender_id"],
            }))

    async def note_deleted(self, event):
        await self.send(text_data=json.dumps({
            "type" : "note_deleted",
            "id" : event["id"]
        }))

    @database_sync_to_async
    def save_note(self, title, content, sender_id, room_name):
        return Note.objects.create(
            title = title, 
            content = content, 
            sender_id = sender_id, 
            room_name = room_name
        )

    @database_sync_to_async
    def delete_note(self, note_id, sender_id):
        delete_count, _ = Note.objects.filter(id = note_id, sender_id = sender_id).delete()
        return delete_count > 0



class LiveDocConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"livedoc_{self.room_name}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.save_doc(self.room_name, data["content"])
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type" : "doc_update", "content" : data["content"]}
        )

    async def doc_update(self, event):
        await self.send(text_data = json.dumps({"content" : event["content"]}))


    @database_sync_to_async
    def save_doc(self, room_name, content):
        doc, _ = LiveDoc.objects.update_or_create(
            room_name = room_name,
            defaults = {"content" : content}
        )
        return doc