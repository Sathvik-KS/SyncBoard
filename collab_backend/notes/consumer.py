import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Note

class NoteConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "notes_room"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


    async def receive(self, text_data):
        data = json.loads(text_data)

        if data.get("action") == "delete":
            deleted = await self.delete_note(data["id"], data["sender_id"])
            if deleted:
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {"type" : "note_deleted", "id" : data["id"]}
                )

        else:
            note = await self.save_note(data["title"], data["message"], data["sender_id"])
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type" : "note_message", "message" : note.content, "id" : note.id, "sender_id" : note.sender_id}
            )

    async def note_message(self, event):
        await self.send(text_data=json.dumps({
            "action" : "new", 
            "message" : event["message"], 
            "id" : event["id"], 
            "sender_id" : event["sender_id"],
            }))

    async def note_deleted(self, event):
        await self.send(text_data=json.dumps({"action" : "delete", "id" : event["id"]}))

    @database_sync_to_async
    def save_note(self, title, content, sender_id):
        return Note.objects.create(title = title, content = content, sender_id = sender_id)

    @database_sync_to_async
    def delete_note(self, note_id, sender_id):
        delete_count, _ = Note.objects.filter(id = note_id, sender_id = sender_id).delete()
        return delete_count > 0



class LiveDocConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "live_doc"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type" : "doc_update", "content" : data["content"]}
        )

    async def doc_update(self, event):
        await self.send(text_data = json.dumps({"content" : event["content"]}))