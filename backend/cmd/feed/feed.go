package feed

import (
	"fmt"
	"meme/cmd/dbConn"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ReactionData struct {
	MemeId        uint64  `json:"memeId"`
	ReactionId    *uint64 `json:"reactionId"`
	ReactionCount uint64  `json:"reactionCount"`
}

type MemeData struct {
	Id               uint64         `json:"id"`
	Username         string         `json:"username"`
	MemeUrl          string         `json:"memeUrl"`
	NumberOfComments uint64         `json:"numberOfComments"`
	Reactions        []ReactionData `json:"reactions"`
}

func GetAllPublicMemes(c *gin.Context) {
	db := dbConn.DbConn()
 // "SELECT memes.id, memes.user_id, meme_url, COUNT(meme_id) AS 'NumOfComments' FROM memes LEFT JOIN comments ON memes.id=comments.meme_id WHERE is_public=1 GROUP BY memes.id;"
	rowsForMemes, err := db.Query("SELECT memes.id, username, meme_url, COUNT(meme_id) AS 'NumOfComments' FROM users JOIN (memes LEFT JOIN comments ON memes.id=comments.meme_id) ON users.id=memes.user_id WHERE is_public=1 GROUP BY memes.id;")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error1": err})
		return
	}
	defer rowsForMemes.Close()

	rowsForReactions, err := db.Query("SELECT memes.id AS 'memes.id', reaction_id, COUNT(reaction_id) FROM memes LEFT JOIN reactions ON memes.id=reactions.meme_id WHERE is_public=1 GROUP BY reactions.reaction_id, memes.id  ORDER BY memes.id;")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error1": err})
		return
	}
	defer rowsForReactions.Close()

	var reactionDataArray []ReactionData
	for rowsForReactions.Next() {

		var reactionData ReactionData
		err2 := rowsForReactions.Scan(&reactionData.MemeId, &reactionData.ReactionId, &reactionData.ReactionCount)
		if err2 != nil {
			fmt.Println((err2))
			c.JSON(http.StatusInternalServerError, gin.H{"errorScan2": err2})
			return
		}

		reactionDataArray = append(reactionDataArray, reactionData)
		fmt.Println(reactionData)

	}
	err = rowsForReactions.Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error3": err})
		return
	}

	var allMemeData []MemeData
	for rowsForMemes.Next() {

		var memeData MemeData
		err := rowsForMemes.Scan(&memeData.Id, &memeData.Username, &memeData.MemeUrl, &memeData.NumberOfComments)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"errorScan1": err})
			return
		}

		for i := 0; i < len(reactionDataArray); i++ {
			if memeData.Id == reactionDataArray[i].MemeId {
				memeData.Reactions = append(memeData.Reactions, reactionDataArray[i])
			}

		}
		fmt.Println(memeData)

		allMemeData = append(allMemeData, memeData)
	}
	err = rowsForMemes.Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error3": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok", "memeData": allMemeData})
	return
}
