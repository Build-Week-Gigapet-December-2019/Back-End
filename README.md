# Back-End

## API Base URL

[https://gigapets-winter-2019.herokuapp.com](https://gigapets-winter-2019.herokuapp.com/)

### Server Running Check

**GET** /



### Register User (Parent)

**POST**  /api/auth/register



**BODY**

{ 

"username": <Parent's username *(string*)>,

"password": <Parent's password *(string*)>

}

***RETURNS***

{

 "id": <Parent's id (*integer*)>,

 "username": <Parent's username *(string*)>,
 
 "token": <JWToken *(string*)>

 }



## Parent Login

**POST** /api/auth/login



**BODY**

{

 "username": <Parent's username (*string*)>,

 "password": <Parent's password (*string*)> 

}

***RETURNS***

{

 "id": <Parent's Id (*integer*)>,

 "username": <Parent's username (*string*)> ,

 "token": <Parent's jwt token (*string*)> 

}

# AUTHENTICATED ROUTES THAT REQUIRE JWT TOKEN

### Add New Child



**POST** /api/parents/child



**REQUIRED BODY:**

{ 

 "name": <Child's Name (*string*)>,

 "parent_id": <Parent's Id (*integer*)>, (**Parent id must already exist**)

 "parent_2_id": <ID of 2nd parent if applicable (*string*)> **(OPTIONAL)** (**Parent id must already exist**)

 }

*RETURNS*

{

 "id": <Child's ID (*integer*)>,

 "name": <Child's Name (*string*)>,

 "parent_id": <Parent's ID (*string*)>

}


### Retrieve a parent's children

**GET**  /api/parents/children/<:parentId (*integer*)>

*RETURNS* Array of children in the following format:
(parent_2 is in place for stretch functionality)

[

    {
        "id": 3,
        "name": "Billy",
        "parent_id": 1,
        "parent_2_id": null
    },

    {
        "id": 7,
        "name": "Nancy",
        "parent_id": 1,
        "parent_2_id": null
    },
]


### Add Food Entry

**POST**  /api/parents/food



**REQUIRED BODY:**

{

 "child_id": <ID of Child being recorded (*integer*)> (**Child id must already exist**)

**-- OPTIONAL --**

 "date": <"yyyy-mm-dd" (*string*)>  

(**OMIT DATE TO AUTOMATICALLY USE CURRENT DATE**) 

"dairy": <Units of Category Consumed (*integer*)>

"fruits", "grains", "proteins", "vegetables", "treats" 

-- *Work the same as dairy. Include as many or as few as desired.* 

(**OMITTED FOOD CATEGORIES WILL DEFAULT TO ZERO**) }

*RETURNS*

{

 "child_id": <ID of Child being recorded (*integer*)> , 

"id": <Id of the food entry (*integer*)>,

 "date": <Date of the food entry (*string*)>

}

### Example

{ 

"child_id": 5, 

"fruits": 4, 

"proteins": 7 

}

##### Is equivalent to:

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

###### *And will return*

{

 "child_id": 5,

 "id": 9,

 "date": "2019-12-31" 

}
