from rest_framework import viewsets

from .models import LiveDoc, Message, Room
from .serializers import LiveDocSerializer, MessageSerializer, RoomSerializer

# Create your views here.


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        queryset = Message.objects.all()
        room_name = self.request.query_params.get("room_name")
        if room_name:
            queryset = queryset.filter(room__name=room_name)
        return queryset


class LiveDocViewSet(viewsets.ModelViewSet):
    serializer_class = LiveDocSerializer

    def get_queryset(self):
        queryset = LiveDoc.objects.all()
        room_name = self.request.query_params.get("room_name")
        print(room_name, "room")
        if room_name:
            queryset = queryset.filter(room_name=room_name)
        return queryset


class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer

    def get_queryset(self):
        queryset = Room.objects.all()
        room_name = self.request.query_params.get("name")

        if room_name:
            queryset = queryset.filter(name = room_name)
        
        return queryset