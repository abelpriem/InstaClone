# El -H 'Content-Type: aplication/json' sirve para indicar al servidor que lo que le manda en data es un tipo .json
# El -d indica al servidor el tipo de dato que está enviando el cliente
# El -v sirve para indicar en consola los procesos que estánocurriendo en el servidor

# source pepetest.sh

blue='\033[0;34m'
green='\033[0;32m'
tomato='\033[1;31m'

reset='\033[0m'

echo -e "${blue}TEST CREATE POST${reset}\n"

echo -e "${green}CASE Creating a new post${reset}\n"

curl 'http://localhost:8000/newpost' \
-H 'Authorization: Bearer 24dlukpa1skg' \
-H 'Content-Type: application/json' \
-d '{ "image": "https://elcorreoweb.es/documents/10157/0/image_content_18563891_20161222114201.jpg", "text": "soy Batman!" }' \
-v

# > POST /newpost HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 146
# >
# < HTTP/1.1 201 Created
# < X-Powered-By: Express
# < Date: Thu, 14 Dec 2023 15:43:56 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# < Content-Length: 0

echo -e "${tomato}CASE Error with wrong user id${reset}\n"

curl 'http://localhost:8000/newpost' \
-H 'Authorization: Bearer noexiste' \
-H 'Content-Type: application/json' \
-d '{ "image": "https://elcorreoweb.es/documents/10157/0/image_content_18563891_20161222114201.jpg", "text": "soy Batman!" }' \
-v

# > POST /newpost HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 141
# >
# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 44
# < ETag: W/"2c-DA3KcjMxbAqH25TOBQigpuC1Bjs"
# < Date: Thu, 14 Dec 2023 15:45:56 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# <
# {"error":"Error","message":"user not found"}