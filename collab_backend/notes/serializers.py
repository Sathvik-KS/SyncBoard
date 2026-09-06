from rest_framework import serializers

from .models import LiveDoc, Note, Room


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


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"