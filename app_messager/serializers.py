import re
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
		data = dict(data)
		'''
		was made changes the key of dictionary for view the relevant-datas
		:param data: entrypoint
		:return: new datas relevant
		'''
		# group = int(data.pop('groupId')) if data.get('groupId') and data['groupId'] else int(data.get('group')[0])

		group_bool = True if bool(data.get('groupId')) else False
		group = GroupsModel.objects.filter(uuid = data.get('groupId'))[0].id if group_bool else data.get('group')[0] # get the uuid
		author = int(data.pop('userId')) if data.get('userId') else int(data.get('author')[0])

		''' Get content '''
		content = data.pop('message') if data.get('message') else data.get('content')[0]
		data['content'] = content

		''' get group id '''
		# if
		# group = None
		# group = GroupsModel.objects.filter(subgroup_id=index)[0]['groupId'] if group_bool else index
		# data['group'] = group[0].id if type(group) == list and len(group) > 0 else group
		data['group'] = group

		''' get author id '''
		author = int(author)
		data['author'] = author

		''' file '''
		data['file'] = ''
		return super().to_internal_value(data)

	def create(self, validated_data):
			subgroup = SubGroupsModel();
			subgroup.save()
			queryset_subgroup_id = SubGroupsModel.objects.last().id
			validated_data['subgroup_id'] = queryset_subgroup_id
			json_data = Chat_MessageModel.objects.create(**validated_data)
			return json_data

	def to_representation(self, instance):
		'''
		There is converting to the JSON template for a websocket of frontend
		:param instance: geting the validate's datas after writing to the database
		:return: json
		'''
		subgroup = SubGroupsModel();
		subgroup.save()

		json_data = super().to_representation(instance)
		message = Chat_MessageModel.objects.filter(subgroup_id= json_data['subgroup_id'])

		kwargs = {
			'indexes': json_data['id'],
			'corrects': False,  # queryset_corrects,
			'userId': json_data['author'],
			'message': json_data['content'],
			'groupId': json_data['group'],
			"postId": json_data['id'],
			"eventtime": message[0].timestamp,


			'fileInd': json_data['file'] if json_data['file'] != None else '',
			'subgroup_id': json_data['subgroup_id']
		}
		return kwargs

	# def update(self, instance, validated_data):
		# raise_errors_on_nested_writes('update', self, validated_data)
		# info = model_meta.get_field_info(instance)

		# Simply set each attribute on the instance, and then save it.
		# Note that unlike `.create()` we don't need to treat many-to-many
		# relationships as being a special case. During updates we already
		# have an instance pk for the relationships to be associated with.
		# m2m_fields = []
		# for attr, value in validated_data.items():
		# 	if attr in info.relations and info.relations[attr].to_many:
		# 		m2m_fields.append((attr, value))
		# 	else:
		# 		setattr(instance, attr, value)
		#
		# instance.save()

		# Note that many-to-many fields are set after updating instance.
		# Setting m2m fields triggers signals which could potentially change
		# updated instance and we do not want it to collide with .update()
		for attr, value in m2m_fields:
			field = getattr(instance, attr)
			field.set(value)

		return instance

	# def update(self, instance, validated_data):
	# 	pass
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
