package verify

import (
	"github.com/gin-gonic/gin"
	"github.com/gbrlsnchs/jwt/v3"
	"net/http"
	"meme/cmd/dbConn"
	"github.com/joho/godotenv"
	"os"
	"log"
)

type CustomPayload struct {

	User_id int  `json:"user_id"`
}

func VerifyUserByEmail(c *gin.Context)  {
	token := c.Query("token")

	envError := godotenv.Load("../../.env")
	if envError != nil {
		log.Fatalf("Error loading .env file")
	}

	var payload CustomPayload
	tokenSecretKey := os.Getenv("tokenSecretKey")

	hs := jwt.NewHS256([]byte(tokenSecretKey))

	_, err := jwt.Verify([]byte(token), hs, &payload)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
	} else {
		db := dbConn.DbConn()

		updData, err := db.Prepare("UPDATE users SET is_verified=1 WHERE id=(?);") 
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}

		updData.Exec(payload.User_id)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
	}

}