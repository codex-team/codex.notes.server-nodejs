# codex.notes.server


## Create new user
curl -H "Content-Type: application/json" --data '{"password": 1}' http://localhost:3000/user/create
> {"result":"success","data":{"user_id":"59ce9b0cd99688013c27e333"}}

## Validate user password
curl -H "Content-Type: application/json" --data '{"password": 1}' http://localhost:3000/user/59ce9b0cd99688013c27e333/validate
> {"result":"success"}