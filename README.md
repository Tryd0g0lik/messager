# Install
## Python
```txt
pip install -r requirements.txt  
```
### Javascript 
First, passing to the `messager\app_messager\frontend` \
Note: Second step it's `yarn add package.json` or `npm install package.json` - It's for a developer \
To the `SETTINGS.py` insert the `SECRET_KEY` 

#### Command for Developer
Below i'm public commands for run the project' frontend to the development mode.
 - `yarn run server:front` or `npm run server:front` This command be run the `webpack.server` \
 - `yarn run build:dev` for a build to the project, It's  the development mode.


/* --------------------- */ \
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

# CORS

INSTALLED_APPS = [
    ...
    'corsheaders',
		....
]
MIDDLEWARE = [
		...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
		...
]
CORS_ALLOW_ALL_ORIGINS = True
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:8080",
#     "http://127.0.0.1:8000",
#     "http://127.0.0.1:59337"
# ]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
CSRF_TRUSTED_ORIGINS = [
    "127.0.0.1:8000",
    "127.0.0.1:60404"
]

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
### HTML-chat template 
pthname: `app_messager\templates\index.html`\
NOTE!!: right now  i can't add a script wich insrt `data-groupId="7a3a744a-64ab-492b-89bf-9ee7c72b91f1"` to the html code. 
#### Replace the code
Before this's
```html
<div id="group" data-groupId='7a3a744a-64ab-492b-89bf-9ee7c72b91f1' class="col-12 col-lg-7 col-xl-9">
```
After this's
```html
<div id="group" data-groupId='< your_var_of_script_the_number_group >' class="col-12 col-lg-7 col-xl-9">
```
this's the group number we get when to create a group of two people


### Message box
pthname: `app_messager\frontend\src\scripts\MessageForm\index.ts` \
NOTE: Now, i can't get the script for create the user group and get number it. \
I insert a static group number, number `1`.

#### Replace the code
Before this's
```ts
socket.beforeSend(String([JSON.stringify({ eventtime: datetime, message: messages, userId: indexUser, groupId: '53c97b25-2345-428a-a468-7197db713904' })]));
```
After the
```ts
socket.beforeSend(String([JSON.stringify({ eventtime: datetime, message: messages, userId: indexUser, groupId: < Your_number > })]));
```

`53c97b25-2345-428a-a468-7197db713904` - it's number from the `app_messager_groupsmodel` db. \
Table `app_messager_groupsmodel` it's the model `GroupsModel` of `app_messager\models.py` and PrimaryKey string.  


#### Replace the code
Before this's
```js
const indexUser = 3; // target.dataset.id;
```
After this's
```js
const indexUser = target.dataset.id;
```

#### Django Models
For include to done to the project, you need to change 

pathname: `app_messager\models.py` \
Before this's \
`Messeger_User.user = models.OneToOneField(User, on_delete= models.CASCADE, unique=True, )`
After this's \
`Messeger_User.user = models.OneToOneField(<your_nam_table_registration_user>, on_delete= models.CASCADE, unique=True, )` Here is us only need the id it user



## Files for  message
We can sending files of the `git`, `png`, `jpg`, `jpeg`, `doc`, `pdf`, `xls`, `xls`, `xlsx`, `doc`, `docx`, `ods`, `odt`. \
You can chage to the `messager\app_messager\correctors.py` \
```py
extension = ('git', 'png', 'jpg', 'jpeg', 'doc', 'pdf', 'xls', 'xls', 'xlsx',
			                    'doc', 'docx', 'ods', 'odt')
```
Note: this's variable used for the more than an one files

- User can send an one or more files.
- Each file be checked on the unique. The user can be raname self file, but unique = False if he sent the his.
- The user can make the copy from self file and rename it. Exemple. Makes 4 copies from the one file and send its In chat message will see only one  the file
- The user can't send a file if the one file's weight more than 10MB or the total weight (all ) files > 64 MB on single massge. \
For change a totall's weight is the page: `app_messager\frontend\src\scripts\services\upload_files.ts` and code \
```js
if (Object(fileArr[i]).size > 10000000) {
	....
}

// and

if ((totalSize > 64000000) || (fileSizeLarge)) {
	....
}
```
## Timer of the message
If message was sent yesterday, fos message's time has pattern a `2022-02-01 1:02:09 PM` \
If is today, timer pattern has a `1:02:09 PM`. 

 ### Check the key of localStorage. 
 Key fileId be has a value:
 - 'false' - user no sending the file;
 - 'true' - user has sent file but has not received a file id in now time.
 - var a number type is id file.
 - form upload files has anime 'loader...'


 
 // app_messager\frontend\src\scripts\services\upload_files.ts \
 группа - общий вес файлов в чате (с двух груп) - не реализовано \


// app_messager\frontend\src\scripts\templates\messages.ts
```html
<div class="user-name font-weight-bold mb-1">${(resultCheckUser) ? 'You' : 'NOT your'}
<div class='pencil'></div>
</div>
```
Взамен `'NOT your'` необходимо вставить имя пользователя

## Реализованные задачи
- поисковая строка, которая ищет методом подобным ilike %s%, где s строка из минимум 3 символов.
- В результате поиска по строке внутри диалога должна подсвечиваться live-подскзака (по типу поисковых систем по контексту) и напротив каждого элемента в этой подсказке должна быть кнопка go to message/
- Поиск должен срабатывать при нажатии на клавишу enter или кнопку search в этой же поисковой строке.( В результате поиска отображаются все диалоги, удовлетворяющие критерию поиска.)
- Независимо от результатов поиска или/и сплошного отображения всех диалогов, на странице должна быть предусмотрена пагинация по 12 диалогов максимум на 1 странице.
- Диалоги состоят из сообщений. Каждое сообщение создаётся путем:
  - a) ввода сообщения
  - б) или/и прикрепления файлов.
  - в) Суммарный объем файлов в одном сообщении не может быть больше 10Мб. Суммарный объем файлов в диалоге не может быть больше 64Мб.
  - г) Если отправляется какой-либо файл повторно, то его дубль не должен храниться на сервере, а в сообщении должна создаваться ссылка на уже отправленный файл. 
  - д)Уникальность файла вычислять по алгоритму md5.

 - В отправленных сообщениях можно:
   - Изменить текст, нажав на соответствующую иконку карандашика. При изменении текста сообщения, оно должно также меняться и у собеседника.
   - Удалить файл, нажав на соответствующую иконку корзины возле файла. При этом файл должен быть так же удален из видимости собеседника, и файл должен быть удален с сервера.
   - Отправленное сообщение можно удалить целиком, независимо от того, были ли в нем прилагаемые файлы или нет.
 - Каждое сообщение должно иметь мелким шрифтом дату и время сообщения
 - В случае, если файлы прилагались к сообщению, и само сообщение удаляется целиком, то эти файлы удаляются с сервера.
 - Допускается отправка пустого сообщения в случае если есть хотя бы один прикрепленный файл. 

 
-- -- -

#### *Проект был прерван*
