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
            await self.delete_note(data["id"])
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type" : "note_deleted", "id" : data["id"]}
            )

        else:
            note = await self.save_note(data["message"])
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type" : "note_message", "message" : note.content, "id" : note.id}
            )

    async def note_message(self, event):
        await self.send(text_data=json.dumps({"action" : "new", "message" : event["message"], "id" : event["id"]}))

    async def note_deleted(self, event):
        await self.send(text_data=json.dumps({"action" : "delete", "id" : event["id"]}))

    @database_sync_to_async
    def save_note(self, content):
        return Note.objects.create(title = "Untitled", content = content)

    @database_sync_to_async
    def delete_note(self, note_id):
        Note.objects.filter(id = note_id).delete()
