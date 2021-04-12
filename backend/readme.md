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
