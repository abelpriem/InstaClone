# El -H 'Content-Type: aplication/json' sirve para indicar al servidor que lo que le manda en data es un tipo .json
# El -d indica al servidor el tipo de dato que está enviando el cliente
# El -v sirve para indicar en consola los procesos que estánocurriendo en el servidor

# source pepetest.sh

blue='\033[0;34m'
green='\033[0;32m'
tomato='\033[1;31m'

reset='\033[0m'

echo -e "${blue}TEST CHANGE PASSWORD USER${reset}\n"

echo -e "${green}CASE Password change succesfully${reset}\n"

curl 'http://localhost:8000/users/password' \
-H 'Content-Type: application/json' \
-d '{ "email": "nosoy@batman.com", "password": "1234", "newPassword": "hello555" }' \
-v

# > POST /users/password HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 78
# >
# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < Date: Thu, 14 Dec 2023 17:55:45 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# < Content-Length: 0


echo -e "${tomato}CASE Error with wrong credentials and old password${reset}\n"

curl 'http://localhost:8000/users/password' \
-H 'Content-Type: application/json' \
-d '{ "email": "nosoy@batman.com", "password": "1234", "newPassword": "hello555" }' \
-v

# > POST /users/password HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 78
# >
# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 47
# < ETag: W/"2f-gSxgt/X3rXUFm8ouTih67ywXda0"
# < Date: Thu, 14 Dec 2023 17:56:57 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# <
# {"error":"Error","message":"wrong credentials"}