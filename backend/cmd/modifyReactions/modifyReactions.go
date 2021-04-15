package modifyReactions

import (
	"meme/cmd/dbConn"
	"meme/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type requestBody struct {
	ReactionID uint64 `json:"reactionId"`
	MemeId     uint64 `json:"memeID"`
}

func ModifyReactions(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
	}

	var requestBody requestBody

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
		return
	}

	if requestBody.ReactionID < 1 || requestBody.ReactionID > 4 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not authorized reaction value."})
		return
	}

	var duplicationExists uint8
	var memeExists uint8

	db := dbConn.DbConn()
	if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM reactions WHERE user_id=(?) AND meme_id=(?) AND reaction_id=(?));", payload.User_id, requestBody.MemeId, requestBody.ReactionID).Scan(&duplicationExists); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"database duplication check error": err})
		return
	}

	if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM memes WHERE id = (?));", requestBody.MemeId).Scan(&memeExists); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"database - meme does not exist - check": err})
		return
	}

	if duplicationExists == 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You already have had this reaction on this meme."})
		return
	}
	if memeExists == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Non-existing meme."})
		return
	}
	if duplicationExists == 0 && memeExists == 1 {
		insData, err := db.Prepare("INSERT INTO reactions (user_id, meme_id, reaction_id) VALUES (?,?,?);")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "database insert error", "error": err})
			return
		}

		insData.Exec(payload.User_id, requestBody.MemeId, requestBody.ReactionID)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
		return

	}
}
