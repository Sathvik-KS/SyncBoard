from django.urls import re_path

from .consumer import LiveDocConsumer, MessageConsumer

websocket_urlpatterns = [
    re_path(r"ws/notes/(?P<room_name>[\w-]+)/$", MessageConsumer.as_asgi()),
    re_path(r"ws/livedoc/(?P<room_name>[\w-]+)/$", LiveDocConsumer.as_asgi()),
]
