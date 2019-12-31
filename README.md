# Back-End

## API Base URL
https://gigapets-winter-2019.herokuapp.com

## Server Running Check
GET /

## Register User \(Parent\)
/api/auth

**POST**
{
"username": <username *string*>,
"password": <password *string*>
}

*RETURNS*

{
  "id": <Parent id *integer*>,
  "username": <Parent username *string*>
}