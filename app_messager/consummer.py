
from channels.generic.websocket import AsyncWebsocketConsumer
# https://youtu.be/r6oTcAYDRt0?t=752

# Пользователь при подключении подключается на один из каналов

class TableData(AsyncWebsocketConsumer):
	async def connect(self):
		# подключение полюзователя
		# https://youtu.be/r6oTcAYDRt0?t=905
		'''
			 Название канала на который подкрисываемся можно изменить
			 Данные от пользователя или от системы отправляем на этот канал
		:return:
		'''
		self.group_name = 'tableData'
		await self.channel_layer.group_add(
			self.group_name,
			self.channel_name
		)
		await self.accept()

	async def disconnect(self, close_code):

		# от ключение пользователя
		pass

	async def receive(self, text_data):
		# https://youtu.be/r6oTcAYDRt0?t=1036
		# получаем данные/ Рассылаем всем подпизчикам
		# Вводим логику для манипуляции полученными данными

		# https://youtu.be/r6oTcAYDRt0?t=1113
		print(text_data)