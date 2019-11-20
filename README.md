# essentialism-be

# Documentation for Essentialism (November 2019)



<b>BaseURL:</b> https://the-essentials.herokuapp.com

<b>Note:</b> A token is require for all but the Register and Login endpoints!
<details>
<summary><b>POST - Register new user</b></summary>

Endpoint: BaseURL/api/auth/register
Requires an object with a username and password, both are strings and username has to be unique: 

```
{
	"username": "Alethia",
	"password": "12345"
}
```

If successful, will return status code of 201 (CREATED), the new user's id and a token (example):

```
{
    "message": "Hello, Alethia!",
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
    "userId": 18
}
```
</details>

<details>
<summary><b>POST - Login</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/auth/login</code>
<br>
<br>
Requires an object with username and password, both are strings: 

```
{
	"username": "Alethia",
	"password": "12345"
}
```

If successful, will return status code of 200 (OK), the new item object and a token (example):

```
{
    "message": "Successful login, Alethia!",
    "token": "eyJhbGciOiJI...",
    "userId": 18
}
```
</details>


<details>
<summary><b>GET - Get user via user id</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/users/:userId</code>
<br>
<br>
No body required in the request. 
<br>
<br>
If successful, will return status code of 200 (OK) and a single user object with an array of the user's pillars and prompts:

```
{
    "user": {
        "id": 13,
        "username": "Live",
        "pillars": [
            {
                "id": 49,
                "pillar": "Grace"
            },
            {
                "id": 51,
                "pillar": "Art"
            },
            {
                "id": 52,
                "pillar": "Trust"
            }
        ],
        "prompts": [
            {
                "id": 26,
                "prompt": "Some of the current projects I'm"
            }
        ]
    }
}
```
</details>


<details>
<summary><b>GET - get a specific user's pillars</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/pillars/:userId</code>
<br>

<br>
No body required in the request. 
<br>
<br>
If successful will return status code of 200 (OK) and an array of pillar-objects:

```
[
    {
        "id": 41,
        "pillar": "Meaning"
    },
    {
        "id": 42,
        "pillar": "Justice"
    },
    {
        "id": 43,
        "pillar": "Individuality"
    },
    {
        "id": 44,
        "pillar": "Adaptability"
    }
]
```
</details>


<details>
<summary><b>GET - get a specific user's prompts</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/prompts/:userId</code>
<br>
<br>
No body required in the request. 
<br>
<br>
If successful will return status code of 200 (OK) and an array of prompt-objects:
```
[
    {
        "id": 21,
        "prompt": "I value these values because they have been integrated into my upbringing"
    },
    {
        "id": 22,
        "prompt": "The projects I'm involved in are x, y, z"
    }
]
```
</details>

<details>
<summary><b>DELETE - Deletes a user with a specific ID</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/users/:userId</code>
<br>

<br>
No body required in the request
<br>
<br>
If successful will return status code of 200 (OK) and will return an object of the user's information:

```
{
    "id": 10,
    "username": "Katie",
    "pillars": [
        {
            "id": 37,
            "pillar": "Endurance"
        },
        {
            "id": 38,
            "pillar": "Wisdom"
        },
        {
            "id": 39,
            "pillar": "Trust"
        },
        {
            "id": 40,
            "pillar": "Dedication"
        }
    ],
    "prompts": [
        {
            "id": 19,
            "prompt": "I value these values because they have been integrated into my upbringing"
        },
        {
            "id": 20,
            "prompt": "The projects I'm involved in are x, y, z"
        }
    ]
}
```
</details>

<details>
<summary><b>POST - Post pillars for specific user</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/pillars</code>
<br>
<br>
Requires an array of objects. Must sepcify user_id and pillar fields & the top field is optional (but defaults to false): 

```
[
	{
	"pillar": "Compassion",
	"user_id": 13,
	"top": "true"
	},
	{
	"pillar": "Health",
	"user_id": 13,
	"top": "true"
	},
	{
	"pillar": "Athleticism",
	"user_id": 13,
	"top": "true"
	},
	{
	"pillar": "Productivity",
	"user_id": 13 //will default to false
	}
]
```

If successful will return status code of 201 (CREATED) and a message:

```
message: "New pillars were added!"
```
</details>


<details>
<summary><b>POST - Post prompts for specific user</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/prompts</code>
<br>
<br>
Requires an array of objects. Must sepcify user_id and prompt fields: 

```
[
{
	"prompt": "I chose these 3 values since I think they have added value to my life and wellbeing",
	"user_id": 13
},
{
	"prompt": "Current projects I'm working on include painting a portrait and remodeling the kitchen",
	"user_id": 13
}
]
```

If successful will return status code of 201 (CREATED) and a message:

```
message: "New prompts were created!"
```
</details>

<details>
<summary><b>PUT - Edits a pillar by the pillar's id</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/pillars/:pillarId</code>
<br>

<br>
Requires an object with the pillar field being updated:

```
{
	"pillar": "Hospitality"
}
```

If successful will return status code of 201 (CREATED) and a single object of the newly created item:

```
{
    "id": 18,
    "pillar": "Hospitality"
}
```
</details>

<details>
<summary><b>DELETE - Deletes a pillar by pillar id</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/pillars/:pillarId</code>
<br>
<br>
No body required in the request. 
<br>
<br>
If successful will return status code of 200 (OK) and an object of the deleted pillar:

```
{
    "id": 18,
    "pillar": "Hard Work"
}
```
</details>


<details>
<summary><b>PUT - Edits an prompt by the prompt's id</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/prompts/:promptId</code>
<br>

<br>
Requires an object with the prompt field being updated:

```
{
	"Prompt": "I started working on a project with a local ..."
}
```

If successful will return status code of 201 (CREATED) and a single object of the newly created item. Here is an example:

```
{
    "id": 10
	"Prompt": "I started working on a project with a local ..."
}
```
</details>

<details>
<summary><b>DELETE - Deletes a prompt by a prompt's id</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/prompts/:prompId</code>
<br>
<br>
No body required in the request. 
<br>
<br>
If successful will return a status code of 200 (OK) and an object of the updated prompt:

```
{
    "id": 10
   "prompt": "The projects I'm involved in are x, y, z"
}
```
</details>
