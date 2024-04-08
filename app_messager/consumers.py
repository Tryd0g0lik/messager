# https://channels.readthedocs.io/en/latest/topics/consumers.html


import json
import asyncio
from channels.generic.websocket import AsyncConsumer # AsyncWebsocketConsumer

# https://channels.readthedocs.io/en/latest/topics/databases.html#database-sync-to-async
from channels.db import database_sync_to_async

# from .models import импорт сообщения в чате  https://youtu.be/RVH05S1qab8?t=435

# # https://youtu.be/r6oTcAYDRt0?t=752
#
# # Пользователь при подключении подключается на один из каналов
#

'''
	TODD: https://channels.readthedocs.io/en/latest/topics/consumers.html#basic-layout
'''
class ChatConsumer(AsyncConsumer):

	async def websocket_connect(self, event):
		# подключение пользователя
		# https://youtu.be/r6oTcAYDRt0?t=905
		'''
			 Название канала на который подкрисываемся можно изменить
			 Данные от пользователя или от системы отправляем на этот канал
		:return:
		'''
		print('websocket_CONNECTe: ', event)
		await self.send({
			"type": "websocket.accept",
		})

		# self.group_name = 'tableData'
		# await self.channel_layer.group_add(
		# 	self.group_name,
		# 	self.channel_name
		# )
		# await self.accept()

	async def websocket_disconnect(self, event):

		# от ключение пользователя
		print('receive', event)

	async def  websocket_receive(self, event):
		# https://youtu.be/r6oTcAYDRt0?t=1036
		# получаем данные/ Рассылаем всем подпизчикам
		# Вводим логику для манипуляции полученными данными
		await self.send({
			"type": "websocket.send",
			"text": event["text"],
		})
		# https://youtu.be/r6oTcAYDRt0?t=1113
		print('websocket_Good!', event)