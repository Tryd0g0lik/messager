from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from app_messager.models import Chat_MessageModel, FileModels, SubGroupsModel, GroupsModel
from  django.db.models.fields import CharField
# "{"corrects":false,"eventtime":"2024-6-16@7:13:44 AM","message":"sssss","userId":"3","groupId":"7a3a744a-64ab-492b-89bf-9ee7c72b91f1"}"
class Chat_MessageSerializer(serializers.ModelSerializer):
	print('------------------')
	subgroup_id = CharField()

	class Meta:
		model = Chat_MessageModel
		fields = ['id', 'author', 'content', 'group', 'file', 'subgroup_id']


	def to_internal_value(self, data):
		'''
		was made changes the key of dictionary for view the relevant-datas
		:param data: entrypoint
		:return: new datas relevant
		'''
		group = data.pop('groupId')
		author = data.pop('userId')

		''' Get content '''
		content = data.pop('message')
		data['content'] = content

		''' get group id '''
		group = GroupsModel.objects.filter(uuid=group)
		data['group'] = group[0].id

		''' get author id '''
		author = int(author)
		data['author'] = author

		return super().to_internal_value(data)

	def create(self, validated_data):
			subgroup = SubGroupsModel();
			subgroup.save()
			queryset_subgroup_id = SubGroupsModel.objects.last().id
			validated_data['subgroup_id'] = queryset_subgroup_id
			json_data = Chat_MessageModel.objects.create(**validated_data)
			return json_data

	def to_representation(self, instance):
		subgroup = SubGroupsModel();
		subgroup.save()

		json_data = super().to_representation(instance)
		message = Chat_MessageModel.objects.filter(subgroup_id= json_data['subgroup_id'])
		file = json_data['file']

		# representation['subgroup_id'] = queryset_subgroup_id
		# JSONRenderer().render
		kwargs = {
			'indexes': json_data['id'],
			'corrects': False,  # queryset_corrects,
			'userId': json_data['author'],
			'message': json_data['content'],
			'groupId': json_data['group'],
			"postId": json_data['id'],
			"eventtime": message[0].timestamp, # self.initial_data['eventtime'],
			# 'fileIndex':None,

			'fileInd': json_data['file'] if json_data['file'] != None else '',
			'subgroup_id': json_data['subgroup_id']
		}
		return kwargs

		
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
