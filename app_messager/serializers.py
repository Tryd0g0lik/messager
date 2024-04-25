from rest_framework import serializers

from app_messager.models import Chat_MessageModel, FileModels


class Chat_MessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Chat_MessageModel
		fields = ['id', 'author', 'content', 'group', 'file']
		
class File_MessagesSerializer(serializers.ModelSerializer):
	class Meta:
		model = FileModels
		fields = ['id', 'link', 'size']