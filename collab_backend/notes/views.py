from django.shortcuts import render
from .models import Note, LiveDoc
from .serializers import NoteSerializer, LiveDocSerializer

from rest_framework import viewsets

# Create your views here.

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer

    def get_queryset(self):
        queryset = Note.objects.all()
        room_name = self.request.query_params.get('room_name')
        if room_name:
            queryset = queryset.filter(room_name=room_name)
        return queryset

class LiveDocViewSet(viewsets.ModelViewSet):
    serializer_class = LiveDocSerializer

    def get_queryset(self):
        queryset = LiveDoc.objects.all()
        room_name = self.request.query_params.get('room_name')
        print(room_name, "room")
        if room_name:
            queryset = queryset.filter(room_name=room_name)
        return queryset