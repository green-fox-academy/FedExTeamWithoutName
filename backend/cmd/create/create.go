package create

import (
	"net/http"
	"meme/cmd/dbConn"
	"meme/internal/jwt"

	"github.com/gin-gonic/gin"
)

type Memeurl struct {
	MemeURL   string `json:"memeurl"`
}

func CreateMeme(c *gin.Context) {

	// jwt verify
	// get user id from payload
	
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
	} else {

		var url Memeurl

		if err := c.ShouldBindJSON(&url); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
			return
		}

		// url validation

		db := dbConn.DbConn()

		insData, err := db.Prepare("INSERT INTO memes (meme_url, user_id) VALUES (?,?);")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error2"})
			return
		}

		insData.Exec(url.MemeURL, payload.userId)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
	}
}
