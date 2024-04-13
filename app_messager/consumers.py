# https://channels.readthedocs.io/en/latest/topics/consumers.html


import json, re
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncConsumer
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
	async def send_chat_message_inDB(self, event):
		from app_messager.models import GroupsModel
		group_all = await database_sync_to_async(GroupsModel.objects.all)()
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
		await database_sync_to_async(chat.save)()

		print('[CONSUMER > is RECORD in DB] end')


	async def websocket_disconnect(self, close_code):
		# от ключение пользователя
		print('receive', close_code)
		# Remove the channel_layer instance from the connected_clients set
		self.connected_clients.remove(self.channel_name)

	async def websocket_receive(self, event):
		await self.send_chat_message_inDB(event)

		# Send the message to all connected clients
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