package switchFeedactivity

import (
	"meme/cmd/dbConn"
	"meme/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FeedActvitySwitch struct {
	MemeId  uint  `json:"memeId"`
	Trigger uint8 `json:"trigger"`
}

func SwitchFeedActivity(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
	} else {

		var trigger FeedActvitySwitch

		if err := c.ShouldBindJSON(&trigger); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
			return
		}

		if trigger.Trigger != 0 && trigger.Trigger != 1 {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Not authorized value in FeedActivity trigger.", "error": err})
			return
		}

		db := dbConn.DbConn()

		updData, err := db.Prepare("UPDATE memes SET is_public=(?)  WHERE id=(?) AND user_id=(?);")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Couldn't modify is_public", "error": err})
			return
		}

		sqlResult, err := updData.Exec(trigger.Trigger, trigger.MemeId, payload.User_id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
		rowsAffected, err := sqlResult.RowsAffected()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		if rowsAffected == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "NOT YOUR MEME! You are not authorized to modify this meme."})
			return
		}
		var message string
		if trigger.Trigger == 0 {
			message = "pivate"
		} else if trigger.Trigger == 1 {
			message = "public"
		}

		c.JSON(http.StatusOK, gin.H{"message": "ok", "memestatus": message})
		return
	}

}
