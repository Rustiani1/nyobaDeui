# User API Spec

## Register User API

Endpoint : /api/users

Request Body :

```json
{
    "username" : "ryi",
    "password" : "rahasia",
    "name" : "Rusti Yuni"
}
```

Response Body Success :

```json
{
    "data" : {
        "username" : "ryi",
        "name" : "Rusti Yuni"
    },
}
```

Response Body Error :

```json
{
    "errors" : "username already registered"
}
```

## Login User API

Endpoint : POST/api/users/login

Request Body :

```json
{
     "username" : "ryi",
     "password" : "rahasia"
}
```

Response Body Success :

```json
{
    "data" : {
        "token" : "unique-token"
    }
}
```

Response Body Error :

```json
{
    "errors" : "username or password wrong"
}
```

## Update User API

Endpoint : PATCH/api/users/current

Headers : 
- Authorization : token

Request Body :

```json
{
    "name" : "Rusti Yuni lagi", //optional
    "password" : "new password" //optional
}
```

Response Body Success :

```json
{
    "data" : {
        "username" : "ryi",
        "name" : "Rusti Yuni lagi"
    }
}
```

Response Body Error :

```json
{
    "errors" : "name length max 100"
}
```

## Get User API

Endpoin : GET/api/users/current

Headers : 
- authorization : token

Response Body Success:

```json
{
    "data" : {
        "username" : "ryi",
        "name" : "Rusti Yuni"
    }
}
```

Response Body Error:

```json
{
    "errors" : "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE/api/users/logout

Headers : 
- Authorization : token

Response Body Success :

```json
{
    "data" : "OK"
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized"
}
```