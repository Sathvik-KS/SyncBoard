from django.contrib import admin
from .models import Note, LiveDoc

# Register your models here.
admin.site.register(Note)
admin.site.register(LiveDoc)