package jwt

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"os"
	"log"
)

var (
	router = gin.Default()
)

func CreateToken(userId uint64) (string, error) {
	var err error
	envError := godotenv.Load("../../.env")
	if envError != nil {
		log.Fatalf("Error loading .env file")
	}

	tokenSecretKey := os.Getenv("tokenSecretKey")


	atClaims := jwt.MapClaims{}
	//atClaims["authorized"] = true
	atClaims["user_id"] = userId
	//atClaims["exp"] = time.Now().Add(time.Minute * 15).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(tokenSecretKey))
	if err != nil {
		return "", err
	}
	return token, nil
}
