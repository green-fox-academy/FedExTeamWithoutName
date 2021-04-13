package create

import (
	"meme/cmd/dbConn"
	"meme/internal/jwt"
	"meme/internal/urlValidation"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Memeurl struct {
	MemeURL string `json:"memeurl"`
}

func CreateMeme(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
	} else {

		var memeUrl Memeurl

		if err := c.ShouldBindJSON(&memeUrl); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
			return
		}

		// url validation
		if !urlValidation.IsValidUrl(memeUrl.MemeURL) {
			c.JSON(http.StatusInternalServerError, gin.H{"error": memeUrl.MemeURL + "is not a valid URL"})
			return
		}

		db := dbConn.DbConn()

		insData, err := db.Prepare("INSERT INTO memes (meme_url, user_id) VALUES (?,?);")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error2"})
			return
		}

		insData.Exec(memeUrl.MemeURL, payload.User_id)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
		return
	}
}
