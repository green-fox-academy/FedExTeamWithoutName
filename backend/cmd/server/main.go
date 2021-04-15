package main

import (
	"log"
	"meme/cmd/comment"
	"meme/cmd/create"
	"meme/cmd/feed"
	"meme/cmd/forgottenPass"
	"meme/cmd/login"
	"meme/cmd/meme"
	"meme/cmd/myfeed"
	"meme/cmd/register"
	"meme/cmd/switchFeedactivity"
	"meme/cmd/verify"
	"meme/modifyReactions"

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
	router.POST("/switchfeedactivity", switchFeedactivity.SwitchFeedActivity)
	router.GET("/myfeed", myfeed.GetOwnMemes)
	router.GET("/meme", meme.GetMeme)
	router.POST("/modifyReactions", modifyReactions.ModifyReactions)
	router.POST("/comment", comment.CreateComment)
	log.Fatal(router.Run(":8080"))
}
