from django.contrib import admin

from .models import LiveDoc, Note

# Register your models here.
admin.site.register(Note)
admin.site.register(LiveDoc)