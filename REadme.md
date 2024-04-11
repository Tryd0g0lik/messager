Note: Redis. maybe need re-install on the old version. It's  2.4.2. \
IN now time we get an Error from  the Redis"  


messager\app_messager\views.py
def home_page - will get an authorization conditions.

## A'settings.py'
```py
import os

INSTALLED_APPS = [
    'daphne',
    'webpack_loader',
      ....  
  'bootstrap4',
    'channels',
    'channels_redis',
    'app_messager'
]

ROOT_URLCONF = 'project.urls'
# WSGI_APPLICATION = 'project.wsgi.application' # http
ASGI_APPLICATION = 'project.asgi.application' # websocket - a channels real time
# ASGI_APPLICATION = 'project.returning.application'
AUTHENTICATION_BACKENDS= [
    "django.contrib.auth.backends.ModelBackend",
    "sesame.backends.ModelBackend",
]

# chennals
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}

...


WEBPACK_LOADER ={
    'DEFAULT':{
        'CACHE':not DEBUG,
        'BUNDLE_DIR_NAME': 'app_messager/interface/dist/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        'POLL_INTERVAL':0.1,
        'TIMEOUT': None,
        'IGNORE': [
            '.+\.map$'
        ],
'LOADER_CLASS': 'webpack_loader.loader.WebpackLoader',
    }
}

if not DEBUG:
    WEBPACK_LOADER['DEFAULT'].update({
        'BUNDLE_DIR_NAME': 'dist/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-prod.json')
    })
```

## Frontend
pthname: 'app_messager\frontend\src\scripts\MessageForm\index.ts'
NOTE: Now, i can't get the script for create the user group and get number it. \
I insert a static group number, number '1'.

### Replce the code
Before it's
```ts
socket.beforeSend(String([JSON.stringify({ eventtime: datetime, message: messages, userId: indexUser, groupId: '53c97b25-2345-428a-a468-7197db713904' })]));
```
After the
```ts
socket.beforeSend(String([JSON.stringify({ eventtime: datetime, message: messages, userId: indexUser, groupId: < Your_number > })]));
```

`53c97b25-2345-428a-a468-7197db713904` - it's number from the `app_messager_groupsmodel` db. \
Table `app_messager_groupsmodel` it's the model `GroupsModel` of `app_messager\models.py` and PrimaryKey string.  
