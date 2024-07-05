# El -H 'Content-Type: aplication/json' sirve para indicar al servidor que lo que le manda en data es un tipo .json (cabecera)
# El -v sirve para indicar en consola los procesos que estánocurriendo en el servidor
# Si no especificamos ningun -d (Dato) el servidor ya sabe que se trata de un GET y no un POST

# source pepetest.sh

blue='\033[0;34m'
green='\033[0;32m'
tomato='\033[1;31m'

reset='\033[0m'

echo -e "${blue}TEST RETRIEVE USER${reset}\n"

echo -e "${green}CASE Retrieve user succesfully on correct user id${reset}\n"

curl 'http://localhost:8000/users' \
-H 'Authorization: Bearer 24dlukpa1skg' \
-v

# > GET /users HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 24dlukpa1skg     
# > 
# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 42
# < ETag: W/"2a-9YJdasQaEgyqjWK5Teqz1S9kE7k"
# < Date: Thu, 14 Dec 2023 17:29:26 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"id":"24dlukpa1skg","name":"Bruce Wayne"}

echo -e "${tomato}CASE Error trying retrieve wrong user id${reset}\n"

# curl 'http://localhost:8000/users' \
# -H 'Authorization: Bearer 25dlukpa1skg' \
# -v

# > GET /users HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 25dlukpa1skg
# >
# < HTTP/1.1 404 Not Found
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 52
# < ETag: W/"34-Cs2INrsYwSHLSHCKVUFPEWh9NjI"
# < Date: Mon, 18 Dec 2023 12:04:46 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# <
# {"error":"NotFoundError","message":"user not found"}