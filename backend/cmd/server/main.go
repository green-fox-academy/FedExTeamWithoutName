package main

import (
	"log"
	"meme/cmd/create"
	"meme/cmd/feed"
	"meme/cmd/forgottenPass"
	"meme/cmd/login"
	"meme/cmd/register"
	"meme/cmd/verify"

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
	router.POST("/meme", create.CreateMeme)
	router.GET("/feed", feed.GetAllPublicMemes)
	router.GET("/mymemes")
	router.GET("/meme")
	log.Fatal(router.Run(":8080"))
}
