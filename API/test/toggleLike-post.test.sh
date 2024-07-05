# El -H 'Content-Type: aplication/json' sirve para indicar al servidor que lo que le manda en data es un tipo .json (cabecera)
# El -v sirve para indicar en consola los procesos que estánocurriendo en el servidor
# Si no especificamos ningun -d (Dato) el servidor ya sabe que se trata de un GET y no un POST
# Con el -X 'PATCH' le indica al servidor que se trata de un método patch

# source pepetest.sh

blue='\033[0;34m'
green='\033[0;32m'
tomato='\033[1;31m'

reset='\033[0m'

echo -e "${blue}TEST TOGGLE LIKE POST${reset}\n"

echo -e "${green}CASE Add like on post with user id${reset}\n"

curl 'http://localhost:8000/newpost/18ge8esdqgww/likes' \
-H 'Authorization: Bearer 24dlukpa1skg' \
-X PATCH \
-v

# > PATCH /newpost/18ge8esdqgww/likes HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 24dlukpa1skg
# >
# < HTTP/1.1 204 No Content
# < X-Powered-By: Express
# < Date: Mon, 18 Dec 2023 12:00:32 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# <
# * Connection #0 to host localhost left intact

echo -e "${tomato}CASE Error trying toggle on wrong id post${reset}\n"

curl 'http://localhost:8000/newpost/18ge8esdqgww/likes' \
-H 'Authorization: Bearer 25dlukpa1skg' \
-X PATCH \
-v

# > PATCH /newpost/18ge8esdqgww/likes HTTP/1.1
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
# < Date: Mon, 18 Dec 2023 12:03:15 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# <
# {"error":"NotFoundError","message":"user not found"}