1. Создание .env файла. Сначала необходимо создать .env файл, после скопировать в него все содержимое .env.example файла. После .env файл нужно заполнить(в формате: var=value) по инструкции: 

API_PORT - порт на котором будет запущено приложение, по умолчанию = 3000

DATABASE_... - так как приложение запускается в докере, можно просто поставить значения по умолчанию, кроме пароля
 
USER - postgres
PASSWORD - password
HOST - db
PORT - 5342
DBNAME - payment-handler
SCHEMA - public

DATABASE_URL - значение необходимое для ORM prisma. Чтобы создать нужное значение, вместо переменных, которые будут написаны верхним регистром, вставьте их значения.

DATABASE_URL - postgresql://DATABASE_USER:DATABASE_PASSWORD@DATABASE_HOST/DATABASE_DBNAME

REDIS_.. - данные о redis, также можно оставлять по умолчанию

HOST - redis
PORT - 6379
PASSWORD - password

APPLICATION_NAME - название приложения, которое будет отображено в письме, отправленном пользователю


YANDEX_LOGIN, YANDEX_PASSWORD - логин и пароль приложения для использования почтового сервиса Яндекса 

JWT_SECRET - строка из 32 случайных символов 

ALPHA_... - данные для использования эквайринга альфа банка

ALPHA_API_URL - ссылка api альфа банка, ( формат https://alfa.rbsuat.com/payment/rest/ обязательно / на конце)
ALPHA_REGISTRATION_URI - метод для создания запроса на оплату ( формат register.do  без / )
ALPHA_GET_STATUS_URI - метод для создания запроса на получение статуса ( формат такой же ^ )
ALPHA_LOGIN - логин для api
ALPHA_PASSWORD - пароль для api 
ALPHA_RETURN_SUCCESS_URL - http://localhost:DEV_PORT/v1/alfa-bank/success-payment
ALPHA_RETURN_FAILED_URL - http://localhost:DEV_PORT/v1/alfa-bank/failed-payment ( вместо DEV_PORT вставьте порт, который вы уже выбрали для переменной с таким же названием )
ALPHA_REDIRECT_TO_FAIL - Ссылка на страничку после неудачной оплаты 
ALPHA_REDIRECT_TO_SUCCESS - Ссылка на страничку после удачной оплаты

