# Back-End

## API Base URL

https://gigapets-winter-2019.herokuapp.com

## Server Running Check

GET /

## Register User \(Parent\)


**POST** /api/auth/register

**BODY**

{
"username": <username _string_>,
"password": <password _string_>
}

_RETURNS_

{
"id": <Parent's id _integer_>,
"username": <Parent's username _string_>
}

## Parent Login

**POST** /api/auth/login

**BODY**

{
"username": <username _string_>,
"password": <password _string_>
}

_RETURNS_

{
"id": <Parent id _integer_>,
"username": <Parent username _string_>,
"token": <Parent's jwt token _string_>
}

# AUTHENTICATED ROUTES THAT REQUIRE JWT TOKEN

## Parent Login

/api/parents/child

**POST**

{
**REQUIRED:**
"name": <Child's Name _string_>,
"parent\_id": <ID of parent adding child to db _integer_> \(**Parent id must already exist**\)

**OPTIONAL:**
"parent\_2\_id": <ID of 2nd parent if applicable> \(**Parent id must already exist**\)
}

_RETURNS_

{
"id": <Child's ID _integer_>,
"name": <Child's Name _string_>,
"parent\_id": <Parent's ID _string_>

}

## Add Food Entry

/api/parents/food

**POST**
{
**REQUIRED:**
"child\_id": <ID of child being recorded _integer_> \(**Child id must already exist**\)

**OPTIONAL:**
"date": <"yyyy-mm-dd" _string_>
\(**COMPLETELY OMIT DATE TO AUTOMATICALLY DATE ENTRY AS CURRENT DATE**\)
"dairy": <Units of dairy consumed _integer_>

"fruits", "grains", "proteins", "vegetables", "treats" --
_Work the same as dairy. Include as many or as few as desired._
\(**OMITTED FOOD CATEGORIES WILL DEFAULT TO ZERO**\)
}

_RETURNS_

{
"child\_id": <Id of child being recorded _integer_>,
"id": <ID of food entry _integer_>,
"date": <Date of food entry _string_>

}

### Example

{
"child\_id": 5,
"fruits": 4,
"proteins": 7
}

* Is equivalent to *
 {
"child_id": 5,
"date": "2019-12-31", <---- The current date
"dairy": 0,
"fruits": 4,
"grains": 0,
"proteins": 7,
"vegetables": 0,
"treats": 0
}

*And will return*

 {
    "child_id": 5,
    "id": 9,
    "date": "2019-12-31"
}

