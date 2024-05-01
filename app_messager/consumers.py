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

	# @sync_to_async
	# def send_chat_message_inDB(self, event):


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
		if (('corrects' in list(json.loads(event['text']).keys())) and \
			(json.loads(event['text'])['corrects'] != True)):
			''' Get the elias a message's box from. It's will be inserted in to the html message (postId) '''
			# event_text_keys_list_new = list(json.loads(event_json['text'])) + ['postId'];
			# event_text_val_list_new = list(json.loads(event_json['text']).values()) + [json.loads(event['text'])['groupId']]
			# new_event_json = dict(zip(event_text_keys_list_new, event_text_val_list_new))
			# event_json['text'] = json.dumps(new_event_json)
			new_event = json.dumps(event_json)

		elif (('corrects' in list(json.loads(event['text']).keys())) and \
		      (json.loads(event['text'])['corrects'] == True) and \
			('fileIndex' in json.loads(event['text'])) and \
			(type(json.loads(event['text'])['fileIndex']) == list) and \
			(len(json.loads(event['text'])['fileIndex']) > 0)):

			new_event = event_json
		elif (('remove' in list(json.loads(event['text']).keys())) and \
		      (json.loads(event['text'])['remove'])):
			new_event = event_json['text']

		else:
			new_event = event_json['text']
		# сделать асинхронной  сделать загрузку файлов + Typing...
		# Send the message to all connected clients
		for client in self.connected_clients:
			await self.channel_layer.send(client, {
				"type": "websocket.send",
				"text": json.dumps(event.get('text',  new_event)),
			})

	async def websocket_send(self, event):
		await self.send({
			"type": "websocket.send",
			"text": event.get('text', json.dumps({"text":event})),
		})
