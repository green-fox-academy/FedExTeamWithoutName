package deleteMeme

import (
	"meme/cmd/dbConn"
	"meme/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DeleteOrder struct {
	MemeId uint64 `json:"memeId"`
}

func DeleteMeme(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
		return
	}

	var order DeleteOrder

	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
		return
	}

	var memeExists uint8
	var dbUser uint

	db := dbConn.DbConn()

	if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM memes WHERE id = (?));", order.MemeId).Scan(&memeExists); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"database - meme does not exist - check": err})
		return
	}

	if memeExists == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Non-existing meme."})
		return
	}

	if err := db.QueryRow("SELECT user_id FROM memes WHERE id = (?);", order.MemeId).Scan(&dbUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"database - meme does not exist - check": err})
		return
	}

	if dbUser != uint(payload.User_id) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "That's not your meme."})
		return
	}

	if memeExists == 1 {
		memeDelData, err := db.Prepare("DELETE FROM memes WHERE id=(?)")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"database delete error1": err})
			return
		}
		memeDelData.Exec(order.MemeId)

		commDelData, err := db.Prepare("DELETE FROM comments WHERE meme_id=(?)")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"database delete error2": err})
			return
		}
		commDelData.Exec(order.MemeId)

		reactDelData, err := db.Prepare("DELETE FROM reactions WHERE meme_id=(?)")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"database delete error3": err})
			return
		}
		reactDelData.Exec(order.MemeId)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
		return
	}
}
