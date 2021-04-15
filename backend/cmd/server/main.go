package main

import (
	"log"
	"meme/cmd/comment"
	"meme/cmd/create"
	"meme/cmd/feed"
	"meme/cmd/forgottenPass"
	"meme/cmd/login"
	"meme/cmd/meme"
	"meme/cmd/modifyReactions"
	"meme/cmd/myfeed"
	"meme/cmd/register"
	"meme/cmd/switchFeedactivity"
	"meme/cmd/verify"
	"meme/internal/corsMiddle"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()
	router.Use(corsMiddle.CORSMiddleware())
	router.Use(static.Serve("/", static.LocalFile("../../../Frontend/public", true)))
	router.POST("/register", register.RegisterTheUser)
	router.POST("/login", login.LoginFunction)
	router.GET("/verify", verify.VerifyUserByEmail)
	router.POST("/forgottenpass", forgottenPass.ForgottenPass)
	router.POST("/meme", create.CreateMeme)
	router.GET("/feed", feed.GetAllPublicMemes)
	router.PUT("/switchfeedactivity", switchFeedactivity.SwitchFeedActivity)
	router.GET("/myfeed", myfeed.GetOwnMemes)
	router.GET("/meme", meme.GetMeme)
	router.POST("/modifyReactions", modifyReactions.ModifyReactions)
	router.POST("/comment", comment.CreateComment)
	log.Fatal(router.Run(":8080"))
}
