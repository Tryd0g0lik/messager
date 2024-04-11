# https://channels.readthedocs.io/en/latest/topics/consumers.html


import json
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

	@database_sync_to_async
	def send_chat_message_inDB(self, event):

		def save_datas_inDB(chat):
			new_message_text = []
			print('[CONSUMER > SAVED DB] BEFORE:', '[TEST > event.TEXT]: ', event['text'])
			chat['group'] = 1 # event['text']['groupId']
			# print('ddddddddddddddddd',  event['text'] )
			data_message = json.loads(event['text'])
			new_message_text.append({'eventtime': data_message['eventtime'], 'message': data_message['message']})
			chat.content = str(new_message_text)

			chat.autor_id = data_message['userId']
			return chat

		if Chat_MessageModel.objects.filter(group='53c97b25-2345-428a-a468-7197db713904').exists():

			print("There is at least one object in some_queryset")
			chat = Chat_MessageModel.objects.filter(group='53c97b25-2345-428a-a468-7197db713904')[0]

			chat = save_datas_inDB(chat)
			chat.save()
			print('[CONSUMER > UPDATE DB] end')
		else:
			chat = Chat_MessageModel()

			chat = save_datas_inDB(chat, 1)

			chat.save()
			print('[CONSUMER > SAVED DB] end')

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
