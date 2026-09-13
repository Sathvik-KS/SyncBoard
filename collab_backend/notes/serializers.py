from rest_framework import serializers

from .models import LiveDoc, Message, Room


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"


class MessageCreateSocketSerializer(serializers.Serializer):
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