package main

import (
	"log"
	"meme/cmd/forgottenPass"
	"meme/cmd/login"
	"meme/cmd/register"
	"meme/cmd/verify"
	"meme/cmd/create"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

var (
	router = gin.Default()
)

func main() {
	router.Use(static.Serve("/", static.LocalFile("../../../Frontend/public", true)))
	router.POST("/register", register.RegisterTheUser)
	router.POST("/login", login.LoginFunction)
	router.GET("/verify", verify.VerifyUserByEmail)
	router.POST("/forgottenpass", forgottenPass.ForgottenPass)
	router.POST("/creatememe", create.CreateMeme)
	router.GET("/feed",  )
	router.GET("/mymemes",  )
	router.GET("/meme",  )
	log.Fatal(router.Run(":8080"))
}
