from django.contrib import admin

from .models import LiveDoc, Message, Room

# Register your models here.
admin.site.register(Message)
admin.site.register(LiveDoc)
admin.site.register(Room)
