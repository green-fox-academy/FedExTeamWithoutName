# meme project backend

### How to run

Install go dependencies with

```
go get -d ./...
```

To run the server navigate to backend/cmd/server and use the following command:

```
go run main.go
```

### Magic words

You will not need this one, I have done this already, just FYI
```
go mod init meme
```

Import dependencies you have used to go.mod
```
go mod tidy
```

### Prerequisites

 - You will need GO 1.16 to run this app
 - The project root directory should be in your $GOPATH/src/ directory


### Endpoints

##### /meme (GET)
/meme endpoint gives back the detailed data of a given name.
It is waiting for an id for the meme:

 ```
http://localhost:8080/meme?id=2
 ```

and returns with the following JSON in the body:
 ```
{"meme":
  {
      "url":"https://s3-us-west-2.amazonaws.com/memebuilder/uploads/1618345065_6075fc698beae.jpg",
      "reactions":[
          {"reactionId":1,"username":"ottoka"},
          {"reactionId":1,"username":"admin"},
          {"reactionId":2,"username":"admin"},
          {"reactionId":2,"username":"endre"}],
      "comments":[
          {"username":"ottoka","text":"kiscica"},
          {"username":"ottoka","text":"Fordulj balra a harmadik horcsognel"}]
  }
}
 ```
##### /register (POST)
/register endpoint is used with POST method and waiting for 
an email, a username and a password in a JSON incorporated 
in the body:
 ```
{
    "username": "user",
    "password": "password",
    "email": "user@email.com"
}
 ```
and returns with the following JSON in the body:
 ```
{
    "id": userResult.Id, 
    "username": userResult.Username}
 ```
and sends a validation email on the given email address(user@email.com)
with a link to the /verify endpoint, which contains a verification token.

### /verify (GET)
/verify endpoint receives the request from the link sent to the given
email address in case of succesful registration. It verifies the request
with the help of the in the header sent verification token.
If the verification was successful, it sets the registered user's status 
to verified in the database.

It returns with the following JSON in the body:
 ```
{"message": "ok"}
 ```

##### /login (POST)
/login endpoint is used with POST method and waiting for 
a username nad a password in a JSON incorporated in the body:
 ```
{
    "userName": "user",
    "password": "password",
}
 ```
and returns with the following JSON in the body:
 ```
{"status": "ok", 
"token": "{tokenstring}", 
"userId": id }
 ```

##### /forgottenPass (POST)
/forgottenPass creates a randomly generated string as a new password 
in case the user forgets the previous one. It needsa username and the 
email address given at the registration.
It verifies, whether the email exists both in general and in the data-
base. If the verification is successful sends a personalized message 
to the user with the new password to the given email address

It is waiting for the following JSON incorporated into the body:
 ```
{
    "userName": "user",
    "email": "email",
}
 ```
and returns with the following JSON in the body:
 ```
{"message": "Your password has been reset, you can find your new password in the email sent to " + email}
 ```

##### /feed (GET)
/feed sends back the data of all the public memes that appear in
the main feed. For this there is no need to login.

It returns with the following JSON in the body:
 ```
{
    "memeData": [
        {
            "id": 2,
            "username": "admin",
            "memeUrl": "https://s3-us-west-2.amazonaws.com/memebuilder/uploads/1618345065_6075fc698beae.jpg",
            "numberOfComments": 6,
            "reactions": [
                {
                    "memeId": 2,
                    "reactionId": 1,
                    "reactionCount": 3
                },
                {
                    "memeId": 2,
                    "reactionId": 3,
                    "reactionCount": 1
                },
                {
                    "memeId": 2,
                    "reactionId": 4,
                    "reactionCount": 2
                },
                {
                    "memeId": 2,
                    "reactionId": 2,
                    "reactionCount": 2
                }
            ]
        },
        {
            "id": 3,
            ...         
        }
    ],
    "message": "ok"
}
 ```

##### /switchfeedactivity (PUT)
/switchfeedactivity sets the meme status between public and private,
so the meme is able to appear in the main feed or not.
It gets the userid from the token sent in the header and verifies
wheter the user trying to modify the status of his/her own meme.
It is waiting for a JSON in the body with the meme's URL:
 ```
{
    "memeID": id,
    "trigger": 0 or 1
}
 ```
It returns with the following JSON in the body:
 ```
{
    "message": "ok"
    "memestatus": "public" or "private" 
    }
 ```

##### /myfeed (GET)
/myfeed sends back the data of all own memes made by a user to 
appear in a private feed.

It gets the userid from the token sent in the header and verifies it.
It returns with the following JSON in the body:
 ```
{
    "memeData": [
        {
            "id": 4,
            "username": "ottoka",
            "memeUrl": "https://s3-us-west-2.amazonaws.com/memebuilder/uploads/1618345065_6075fc698beae.jpg",
            "isPublic": 0,
            "numberOfComments": 0,
            "reactions": [
                {
                    "memeId": 4,
                    "reactionId": null,
                    "reactionCount": 0
                }
            ]
        }
    ],
    "message": "ok"
}
 ```

##### /meme (POST)
/meme with the POST method saves a meme's URL into the database.
It gets the userid from the token sent in the header and authenti-
cates the sender.

It is waiting for a JSON in the body with the meme's URL:
 ```
{"memeurl": "urlstring"}
 ```
It returns with the following JSON in the body:
 ```
{"message": "ok"}
 ```

##### /modifyReactions (POST)
/modifiyReactions increases the database value of a reaction at a meme.

It gets the userid from the token sent in the header and authenticates 
the sender.
Since a user is allowed use one type of reaction only once per meme, the
endpoints checks the database, whether such a reaction already exists.
Also checks that the given meme exists in the database. 

It is waiting for a JSON in the body with the meme's URL:
 ```
{
    "reactionId": id,
    "memeID": id}
 ```
It returns with the following JSON in the body:
 ```
{"message": "ok"}
 ```

##### /comment (POST)
/comment saves the comments into the database.
Validates the length of a string (max. 140 characters), and checks
whether the comment is an empty string.
It gets the userid from the token sent in the header and verifies it.

It is waiting for a JSON in the body with the meme's URL:
 ```
{
    "memeID": id,
    "text": "comments text(max. 140 character"}
 ```
It returns with the following JSON in the body:
 ```
{"message": "ok"}
 ```