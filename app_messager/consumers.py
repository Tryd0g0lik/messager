# https://channels.readthedocs.io/en/latest/topics/consumers.html


import json, re
import asyncio

from asgiref.sync import sync_to_async

from app_messager import models
from channels.generic.websocket import AsyncConsumer, WebsocketConsumer  # AsyncWebsocketConsumer

# https://channels.readthedocs.io/en/latest/topics/databases.html#database-sync-to-async
from channels.db import database_sync_to_async

from app_messager.models import *

# from .models import импорт сообщения в чате  https://youtu.be/RVH05S1qab8?t=435

# # https://youtu.be/r6oTcAYDRt0?t=752
#
# # Пользователь при подключении подключается на один из каналов
#
'''
	TODD: https://channels.readthedocs.io/en/latest/topics/consumers.html#basic-layout
'''
class ChatConsumer(AsyncConsumer): # WebsocketConsumer
	# async def websocket_connect(self, event):
	async def websocket_connect(self, event):
		# подключение пользователя

		# https://youtu.be/r6oTcAYDRt0?t=905
		'''
			 Название канала на который подкрисываемся можно изменить
			 Данные от пользователя или от системы отправляем на этот канал
		:return:
		'''
		test = {"type": "websocket.accept"}
		for v in event.values() :
			print('websocket K: ', v)
			# print('websocket V: ', v)
		print('websocket_CONNECTe: ', json.dumps(event) )
		await self.send(test)

		# self.accept()

	@sync_to_async
	def send_chat_message_inDB(self, event):
		from app_messager.models import GroupsModel
		chats_all =Chat_MessageModel.objects.all()
		group_all = GroupsModel.objects.all()

		json_data = json.loads(event['text'])
		print('rrrrr: ', json_data['groupId'])
		print('------------------------', '7a3a744a-64ab-492b-89bf-9ee7c72b91f1' in json_data['groupId'])


		id = 0
		group_all_len = len(list(group_all))
		'''
			Check a group number 'ID' in the 'groupId' 
		'''
		for i in range(0, group_all_len):
			print('TEST 0: ', i ,  '/',  group_all_len)
			print('[UUID]: ', str(list(group_all)[i].uuid))
			print('[GOUPID]: ', json_data['groupId'])
			if (str(list(group_all)[i].uuid) == json_data['groupId']):
				id = list(group_all)[i].id
				print('[id]: ', id)


		chat_ind = 0
		chats_all_len = len(list(chats_all))
		count_row = Chat_MessageModel.objects.count()
		'''
			Check the we have records or not
		'''
		for i in range(0, chats_all_len):
			print('TEST 1: ', i,  '/',  chats_all_len)
			if ((count_row > 0) and (chats_all[i].group_id == id)):
				chat_ind = chats_all[i].id
				print('TEST chat_ind: ', chat_ind)

		print('[CONSUMER > SAVED DB] BEFORE:', '[TEST > event.TEXT]: ', event['text'])
		data_message = json.loads(event['text'])
		date_str = str(data_message['eventtime'])
		chat = Chat_MessageModel()
		if ((count_row > 0) and (len(group_all)>0)):
			print('[CONSUMER > SAVED DB] BEFORE:', 'line from the db ', event['text'])
			chat = Chat_MessageModel.objects.get(pk=chat_ind)

			content_json = json.loads(chat.content)
			content_json[date_str] = data_message['message']
			chat.content = json.dumps(content_json)
			print('group_id', id)
		else:
			chat.content = json.dumps({f"{date_str}": f"{data_message['message']}"})

		chat.group_id = id

		chat.author_id = json_data['userId']
		new_message_text = chat.content



		print('[eventtime]: ',date_str, data_message['message'])


		chat.content = str(new_message_text)

		chat.autor_id = data_message['userId']
		chat.save()
		print('[CONSUMER > UPDATE DB] end')


	async def websocket_disconnect(self, close_code):
		# от ключение пользователя
		print('receive', close_code)

	async def websocket_receive(self, event):
		await self.send_chat_message_inDB(event)


		for v in event.values() :
			print('receive K: ', v)
			# print('websocket V: ', v)
		# https://youtu.be/r6oTcAYDRt0?t=1036
		# получаем данные/ Рассылаем всем подпизчикам
		# Вводим логику для манипуляции полученными данными

		print(f'[CONSUMER > RECEIVE]: Received event {json.dumps(event)}')
		await self.send({
			"type": "websocket.send",
			"text": event['text'],
		})
		print('websocket_Good!', event)
