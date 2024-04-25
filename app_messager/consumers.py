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
		json_data = json.loads(event['text'])

		id = 0
		'''
			Check a group number 'ID' in the 'groupId' 
		'''
		group_all = GroupsModel.objects.all()
		group_all_len = len(list(group_all))
		for i in range(0, group_all_len):
			if (str(list(group_all)[i].uuid) == json_data['groupId']):
				id = list(group_all)[i].id

		print('[CONSUMER > SAVED DB] BEFORE: datas record')
		data_message = json.loads(event['text'])
		date_str = str(data_message['eventtime'])
		corrects_bool = bool(data_message['corrects'])

		# chat.autor_id = data_message['userId']

		chat:object = {}
		if ('fileIndex' in data_message):
			# chat.file_id = data_message['fileIndex']
			for ind in range(0, len(list(data_message['fileIndex']))):
				chat = Chat_MessageModel()
				chat.file_id = list(data_message['fileIndex'])[ind]
				chat.content = f"{data_message['message']}" # json.dumps({f"{date_str}": f"{data_message['message']}"})
				chat.group_id = id
				chat.author_id = json_data['userId']
				chat.save()

		elif ('fileIndex' not in data_message) :
			chat = Chat_MessageModel()
			chat.content = f"{data_message['message']}" # json.dumps({f"{date_str}": f"{data_message['message']}"})
			chat.group_id = id
			chat.author_id = json_data['userId']
			chat.save()

		print('[CONSUMER > FILE] BEFORE: EVENT', 'test')
		# data_file = json.loads(event['file'])
		# upload_files.link = data_file



		print('[CONSUMER > is RECORD in DB] end')
		return  {"_message": chat.id}

	async def websocket_disconnect(self, close_code):
		# от ключение пользователя
		print('receive', close_code)
		# Remove the channel_layer instance from the connected_clients set
		self.connected_clients.remove(self.channel_name)

	async def websocket_receive(self, event):
		print('============ After: Send the message to all connected clients ============')
		event_json = event;
		new_event: str = ''
		print('============ Before:  send_chat_message_inDB ============')
		if json.loads(event['text'])['corrects'] != True:
			data_message = await self.send_chat_message_inDB(event)
			''' Get the elias a message's box from. It's will be inserted in to the html message (postId) '''
			event_text_keys_list_new = list(json.loads(event_json['text'])) + ['postId'];
			event_text_val_list_new = list(json.loads(event_json['text']).values()) + [
				str(list((data_message).values())[0]).split('+')[0]]
			new_event_json = dict(zip(event_text_keys_list_new, event_text_val_list_new))
			event_json['text'] = json.dumps(new_event_json)
			new_event = json.dumps(event_json)
		elif (json.loads(event['text'])['corrects'] == True) and \
			('corrects' in json.loads(event['text'])) and ('fileIndex' in json.loads(event['text'])) and \
			(type(json.loads(event['text'])['fileIndex']) == list) and \
			(len(json.loads(event['text'])['fileIndex']) > 0):
			await self.send_chat_message_inDB(event)
			new_event = event_json['text']

		else:
			new_event = event_json['text']

		# сделать асинхронной  сделать загрузку файлов + Typing...
		# Send the message to all connected clients
		for client in self.connected_clients:
			await self.channel_layer.send(client, {
				"type": "websocket.send",
				"text": event.get('text',  new_event),
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

# class UplodFileConsumer(AsyncConsumer):
# 	connected_clients = set()
# 	async def websocket_connect(self, event):
# 		test = {"type": "websocket.accept"}
# 		for v in event.values() :
# 			print('Upload websocket K: ', v)
# 		print('Upload websocket_CONNECTe: ', event)
# 		await self.send(test)
# 		self.connected_clients.add(self.channel_name)
#
# 	@sync_to_async
# 	def record_link_to_server(self, event):
# 		# upload_file
# 		print(f'[CONSUMER > UPLOAD]: record_link_to_server: {json.dumps(event)}')
#
# 	async def websocket_receive(self, event):
# 		await self.record_link_to_server(event)
#
# 	async def websocket_disconnect(self, close_code):
# 		# от ключение пользователя
# 		print('receive', close_code)
# 		# Remove the channel_layer instance from the connected_clients set
# 		self.connected_clients.remove(self.channel_name)