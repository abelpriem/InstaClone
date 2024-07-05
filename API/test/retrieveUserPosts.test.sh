# El -H 'Content-Type: aplication/json' sirve para indicar al servidor que lo que le manda en data es un tipo .json (cabecera)
# El -v sirve para indicar en consola los procesos que estánocurriendo en el servidor
# Si no especificamos ningun -d (Dato) el servidor ya sabe que se trata de un GET y no un POST

# source pepetest.sh

blue='\033[0;34m'
green='\033[0;32m'
tomato='\033[1;31m'

reset='\033[0m'

echo -e "${blue}TEST RETRIEVE USER POSTS ${reset}\n"

echo -e "${green}CASE Retrieve POSTS succesfully on from correct user id owner${reset}\n"

curl 'http://localhost:8000/users/65bd35a35ddc38a66f31e722' \
-H 'Authorization: Bearer 65bd36ce5ddc38a66f31e9a0' \
-v 

