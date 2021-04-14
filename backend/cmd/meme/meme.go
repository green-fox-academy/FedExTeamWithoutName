package meme

import (
	"fmt"
	"meme/cmd/dbConn"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Comment struct {
	Username  string `json:"username"` 
	Text      string `json:"text"`
}

type Reaction struct {
	ReactionID uint64 `json:"reactionId"`
	Username   string `json:"username"`
}

type Meme struct {
    URL        string      `json:"url"`
	Reactions  []Reaction  `json:"reactions"`
	Comments   []Comment   `json:"comments"`
}

func GetMeme(c *gin.Context) {
	id := c.Query("id")
	
	db := dbConn.DbConn()
	
	var meme Meme

	if err := db.QueryRow("SELECT meme_url FROM memes WHERE memes.id=(?);", id).Scan(&meme.URL); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "url not found"})
		return
	}
	
	var comments []Comment
	rows, err := db.Query(`SELECT username, text FROM comments LEFT JOIN users ON comments.user_id=users.id WHERE comments.meme_id=(?);`, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	defer rows.Close()
	for rows.Next() {
        var comment Comment

		err = rows.Scan(&comment.Username, &comment.Text)
		if err != nil {
			panic(err)
		}
		comments = append(comments, comment)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}

	var reactions []Reaction
	rowsReaction, err := db.Query("SELECT reaction_id, username FROM memes JOIN (reactions JOIN users ON reactions.user_id=users.id) ON memes.id=reactions.meme_id WHERE meme_id=(?);", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	defer rowsReaction.Close()
	for rowsReaction.Next() {
		var reaction Reaction

		err := rowsReaction.Scan(&reaction.ReactionID, &reaction.Username)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
        reactions = append(reactions, reaction)
	}
	err = rowsReaction.Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	meme.Comments = comments
	meme.Reactions = reactions
	fmt.Println(meme)

	c.JSON(http.StatusOK, gin.H{"meme": meme})
}
