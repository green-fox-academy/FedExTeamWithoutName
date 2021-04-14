package comment

import (
	"meme/cmd/dbConn"
	"meme/internal/jwt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CommentData struct {
	MemeId      uint64 `json:"memeId"`
	CommentText string `json:"text"`
}

func CreateComment(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
	} else {

		var commentData CommentData

		if err := c.ShouldBindJSON(&commentData); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
			return
		}

		if len(commentData.CommentText) > 140 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Your text is too long. Max: 140 charaters."})
			return
		}

		db := dbConn.DbConn()

		var isMemeExists int
		if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM comments WHERE meme_id = (?));", commentData.MemeId).Scan(&isMemeExists); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error11"})
			return
		}

		if isMemeExists != 1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No meme with id:" + strconv.FormatUint(uint64(commentData.MemeId), 10)})
			return
		}

		insData, err := db.Prepare("INSERT INTO comments (user_id, meme_id, text) VALUES (?,?,?);")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error2"})
			return
		}

		insData.Exec(payload.User_id, commentData.MemeId, commentData.CommentText)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
		return
	}
}
