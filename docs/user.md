# User API Spec

# Register user
Endpoint : POST /api/users/register

Request Body : 
```json
{
      "username":"aravzaki",
      "password" : "rahasia"
}
```
Response Body(Success) : 
```json
{
      "data": {
            "username":"arvazaki"
      }
}
```
Response Body(Failed) : 
```json
{
      "errors": "error message"
}
```
# Login User
Endpoint : POST /api/users/login

Request Body : 
```json
{
      "username":"aravzaki",
      "password" : "rahasia"
}
```
Response Body(Success) : 
```json
{
      "data": {
            "username":"arvazaki",
            "token" : "token"
      }
}
```
Response Body(Failed) : 
```json
{
      "errors": "error message"
}
```