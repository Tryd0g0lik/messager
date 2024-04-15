# https://channels.readthedocs.io/en/latest/topics/consumers.html


import json, re
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncConsumer
from django.utils import asyncio

from app_messager.models import *

'''
	TODD: https://channels.readthedocs.io/en/latest/topics/consumers.html#basic-layout
'''
class ChatConsumer(AsyncConsumer):
	connected_clients = set()

	async def websocket_connect(self, event):
		'''
			 Название канала на который подкрисываемся можно изменить
			 Данные от пользователя или от системы отправляем на этот канал
		:return:
		'''
		test = {"type": "websocket.accept"}
		for v in event.values() :
			print('websocket K: ', v)
		print('websocket_CONNECTe: ', json.dumps(event))
		await self.send(test)

		# Add the channel_layer instance to the connected_clients set
		self.connected_clients.add(self.channel_name);
		# self.accept()

	@sync_to_async
	def send_chat_message_inDB(self, event):
		print('============ send_chat_message_inDB ============')
		from app_messager.models import GroupsModel
		print('TEST 1')
		group_all = GroupsModel.objects.all()
		upload_files = FileModels()
		print('TEST 2', event )
		json_data = json.loads(event['text'])

		id = 0
		print('TEST 3', list(group_all))
		group_all_len = len(list(group_all))
		'''
			Check a group number 'ID' in the 'groupId' 
		'''
		print('TEST 4')
		for i in range(0, group_all_len):
			print('TEST 5')
			if (str(list(group_all)[i].uuid) == json_data['groupId']):
				print('TEST 6')
				id = list(group_all)[i].id

		print('[CONSUMER > SAVED DB] BEFORE: datas record')
		data_message = json.loads(event['text'])
		date_str = str(data_message['eventtime'])
		chat = Chat_MessageModel()

		chat.content = json.dumps({f"{date_str}": f"{data_message['message']}"})
		chat.group_id = id

		chat.author_id = json_data['userId']
		chat.autor_id = data_message['userId']
		# print('[CONSUMER > FILE] BEFORE: EVENT', event['file'])
		# data_file = json.loads(event['file'])
		# upload_files.link = data_file

		chat.save()

		print('[CONSUMER > is RECORD in DB] end')


	async def websocket_disconnect(self, close_code):
		# от ключение пользователя
		print('receive', close_code)
		# Remove the channel_layer instance from the connected_clients set
		self.connected_clients.remove(self.channel_name)

	async def websocket_receive(self, event):
		print('============ Before:  send_chat_message_inDB ============')
		await  self.send_chat_message_inDB(event)
# сделать асинхронной  сделать загрузку файлов + Typing...
		# Send the message to all connected clients
		print('============ After: Send the message to all connected clients ============')
		for client in self.connected_clients:
			await self.channel_layer.send(client, {
				"type": "websocket.send",
				"text": event.get('text',  json.dumps(event)),
			})

		for v in event.values() :
			print('receive K: ', v)
		print(f'[CONSUMER > RECEIVE]: Received event: {json.dumps(event)}')
		print('websocket_Good!')

	async def websocket_send(self, event):
		await self.send({
			"type": "websocket.send",
			"text": event.get('text', json.dumps(event)),
		})

class UplodFileConsumer(AsyncConsumer):
	connected_clients = set()
	async def websocket_connect(self, event):
		test = {"type": "websocket.accept"}
		for v in event.values() :
			print('Upload websocket K: ', v)
		print('Upload websocket_CONNECTe: ', event)
		await self.send(test)
		self.connected_clients.add(self.channel_name)

	@sync_to_async
	def record_link_to_server(self, event):
		# upload_file
		print(f'[CONSUMER > UPLOAD]: record_link_to_server: {json.dumps(event)}')

	async def websocket_receive(self, event):
		await self.record_link_to_server(event)

	async def websocket_disconnect(self, close_code):
		# от ключение пользователя
		print('receive', close_code)
		# Remove the channel_layer instance from the connected_clients set
		self.connected_clients.remove(self.channel_name)