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

##### /meme
/meme endpoint is waiting for an id:

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