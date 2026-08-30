from .models import Note, LiveDoc
from rest_framework import serializers


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"

class NoteCreateSocketSerializer(serializers.Serializer):
    title = serializers.CharField()
    message = serializers.CharField()

class LiveDocSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiveDoc
        fields = "__all__"