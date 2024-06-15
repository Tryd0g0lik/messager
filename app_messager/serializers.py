from rest_framework import serializers

from app_messager.models import Chat_MessageModel, FileModels, SubGroupsModel
from  django.db.models.fields import CharField

class Chat_MessageSerializer(serializers.ModelSerializer):
	print('------------------')
	subgroup_id = CharField()

	class Meta:
		model = Chat_MessageModel
		fields = ['id', 'author', 'content', 'group', 'file', 'subgroup_id']

	def create(self, validated_data):
			subgroup = SubGroupsModel();
			subgroup.save()
			queryset_subgroup_id = SubGroupsModel.objects.last().id
			validated_data['subgroup_id'] = queryset_subgroup_id

			return Chat_MessageModel.objects.create(**validated_data)
	# def to_representation(self, instance):
	# 	subgroup = SubGroupsModel();
	# 	subgroup.save()
	# 	queryset_subgroup_id = SubGroupsModel.objects.last().id
	#
	# 	representation = super().to_representation(instance)
	# 	representation['subgroup_id'] = queryset_subgroup_id
	# 	return representation

		
class File_MessagesSerializer(serializers.ListSerializer):
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
