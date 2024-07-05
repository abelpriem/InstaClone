# API

## Register User ✅

- Request: POST /users "Content-Type: application/json" { name, email, password }
- Response: 201
- Response (error) : 400 "Content-Type: application/json" { error, message }

## Authenticate User ✅

- Request: POST /users/auth "Content-Type: application/json" { email, password }
- Response: 200 application/json 'userId'
- Response (error) : 400 "Content-Type: application/json" { error, message }

## Retrieve User ✅

- Request: GET /users "Authorization: Bearer userId"
- Response: 200 "Content-Type: application/json { name }
- Response (error) : 400 "Content-Type: application/json" { error, message }

## Change Email ✅

- Request: POST /users/email
- Response: 200 "Content-Type: application/json { email, new email, password }
- Response (error) : 400 "Content-Type: application/json" { error, message }

## Change Password ✅

- Request: POST /users/password
- Response: 200 "Content-Type: application/json { email, password, new password }
- Response (error) : 400 "Content-Type: application/json" { error, message }

## Create Post ✅

- Request: POST /newpost "Authorization: Bearer userId" "Content-Type: application/json" { image, text }
- Response: 201
- Response (error) : 400 "Content-Type: application/json" { error, message }

## Retrieve Post ✅

- Request: GET /newpost "Authorization: Bearer userId"
- Response: 200 "Content-Type: application/json" [ { post } ]
- Response (error) : 400 "Content-Type: application/json" { error, message }

## Retrieve Favs ✅

- Request: GET /users/favs "Authorization: Bearer userId"
- Response: 200 "Content-Type: application/json" [ { favs }]
- Response (error) : 400 "Content-Type: application/json" { error, message }

## Retrieve User Posts

- Request: GET /users/:userId "Authorization: Bearer token"
- Response: 200 "Content-Type: application/json" [ { user posts }]
- Response (error) : 500 "Content-Type: application/json" { error, message }

## Delete Post ✅

- Request: DELETE /newpost "Authorization: Bearer userId"
- Response: 200
- Response (error) : 400 "Content-Type: application/json" { error, message }

## Toggle Like ✅

- Request: PATCH /newpost/postId/likes "Authorization: Bearer userId"
- Response: 204
- Response (error) : 400|404|500 "Content-Type: application/json" { error, message }

## Toggle Fav ✅

- Request: PATCH /users:postId/favs "Authorization: Bearer userId"
- Response: 204
- Response (error) : 400|404|500 "Content-Type: application/json" { error, message }

## Update Post Text ✅

- Request: PATCH /newpost "Authorization: Bearer userId" "Content-Type: application/json" { new text }
- Response: 202
- Response (error) : 400|404|500 "Content-Type: application/json" { error, message }

## Add Comments (With callback, no promises) ✅

- Request: POST /newpost/:postId "Authorization: Bearer userId" "Content-Type: application/json" { post comment }
- Response: 200
- Response (error) : 400|404|500 "Content-Type: application/json" { error, message }
