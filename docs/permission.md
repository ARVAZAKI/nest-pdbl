# Permission API Spec

# POST Permission 
Endpoint : POST /api/permission

Request Body : 
```json
{
      "file":"izin.pdf",
      "keterangan" : "izin sakit",
      "user_id": "1234rtgfd"
}
```
Response Body(Success) : 
```json
{
      "data": {
            "file":"izin.pdf",
            "keterangan" : "izin sakit",
            "user_id": "1234rtgfd"
      }
}
```
Response Body(Failed) : 
```json
{
      "errors": "error message"
}
```
# GET Permission
Endpoint : GET /api/permission/:id

Response Body(Success) : 
```json
{
      "data": {
            "file":"izin.pdf",
            "keterangan" : "izin sakit",
            "user_id": "1234rtgfd",
            "status": "approved"
      }
}
```
Response Body(Failed) : 
```json
{
      "errors": "error message"
}
```