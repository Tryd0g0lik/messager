import json
import pytest
from channels.testing import WebsocketCommunicator
from project.asgi import application

@pytest.mark.asyncio
async def test_my_consumer():
    '''
         - https://rtfmd.com/en/channels/3/topics/testing/#websocketcommunicator is PREFERENCE !
         - https://channels.readthedocs.io/en/latest/topics/testing.html#websocketcommunicator
         - https://github.com/django/channels/blob/main/docs/topics/testing.rst
        There is we run testing for the connection with websocked
        :return: ```
        receive {'type': 'websocket.disconnect', 'code': 1000
        ``
    '''

    communicator = WebsocketCommunicator(application, path="api/ws/chat/")
    # await communicator.force_login('root-user')
    connected, subprotocol = await communicator.connect()
    assert connected
    # Test sending text
    await communicator.send_json_to({"corrects": False, "eventtime": "2024-6-17@3:35:47 PM", "message": "33357", "userId": "3", "groupId": "7a3a744a-64ab-492b-89bf-9ee7c72b91f1"})
    response = await communicator.receive_json_from()
    assert response == json.dumps({"corrects":False,"eventtime":"2024-6-17@3:35:47 PM","message":"33357","userId":"3","groupId":"7a3a744a-64ab-492b-89bf-9ee7c72b91f1"})
    # Close
    await communicator.disconnect()

