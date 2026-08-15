from django.urls import re_path
from .consumer import NoteConsumer, LiveDocConsumer

websocket_urlpatterns = [
    re_path(r"ws/notes/$", NoteConsumer.as_asgi()),
    re_path(r"ws/livedoc/$", LiveDocConsumer.as_asgi()),
]