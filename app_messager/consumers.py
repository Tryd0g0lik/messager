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
		group_all = GroupsModel.objects.all()
		json_data = json.loads(event['text'])

		id = 0
		group_all_len = len(list(group_all))
		'''
			Check a group number 'ID' in the 'groupId' 
		'''
		for i in range(0, group_all_len):
			if (str(list(group_all)[i].uuid) == json_data['groupId']):
				id = list(group_all)[i].id

		print('[CONSUMER > SAVED DB] BEFORE: datas record')
		data_message = json.loads(event['text'])
		date_str = str(data_message['eventtime'])
		chat = Chat_MessageModel()

		chat.content = json.dumps({f"{date_str}": f"{data_message['message']}"})
		chat.group_id = id
		chat.author_id = json_data['userId']
		chat.autor_id = data_message['userId']
		chat.save()
		print('[CONSUMER > is RECORD in DB] end')


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

		print(f'[CONSUMER > RECEIVE]: Received event: {json.dumps(event)}')
		await self.send({
			"type": "websocket.send",
			"text": json.dumps(event),
		})
		print('websocket_Good!', event)
