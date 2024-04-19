from rest_framework import serializers

from app_messager.models import Chat_MessageModel


# class Chat_MessageSerialiser(serializers.Serializer):
# 	author = serializers.IntegerField()
# 	timestamp = serializers.DateTimeField()
# 	content = serializers.CharField()
# 	group = serializers.IntegerField()
# 	file = serializers.IntegerField()

class Chat_MessageSerialiser(serializers.ModelSerializer):
	class Meta:
		model = Chat_MessageModel
		fields = ['id', 'author', 'content', 'group', 'file']