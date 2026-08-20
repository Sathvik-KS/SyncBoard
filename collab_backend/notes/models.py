from django.db import models

# Create your models here.
class Note(models.Model):
    room_name = models.CharField(max_length = 200, default = "general")
    title = models.CharField(max_length = 200)
    content = models.TextField()
    sender_id = models.CharField(max_length=100, default = "anonymous")
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

class LiveDoc(models.Model):
    room_name = models.CharField(max_length = 200, unique=True)
    content = models.TextField(default = "")

    def __str__(self):
        return self.room_name