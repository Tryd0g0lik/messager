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

		# filter_list = self.get_queryset(object_list[0], args, kwargs)
		# if (len(list(filter_list)) > 0):
		# 	file_id = list(filter_list)[0].file_id
		# 	# kwargs['pk'] = file_id
		# 	# request.parser_context['pk'] = file_id
		# 	# request.parser_context['kwargs'] = file_id
		# 	content_one = (Chat_MessageModel.objects.filter(pk=self.kwargs['pk'])[0]).content
		# 	content_list = Chat_MessageModel.objects.filter(content=content_one)