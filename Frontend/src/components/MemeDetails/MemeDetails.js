import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unloadActualMemeAction } from '../../actions/memeActions';
import { reactionIconDatabase } from '../../services'
import '../../styles/memeDetails.css';

const MemeDetails = () => {
  const [comment, setComment] = useState('');
  const { showMemeDetails, owner, memeUrl, reactions, numberOfComments, comments, isPublic } = useSelector(state => state.memeData.actualMeme);
  const dispatch = useDispatch();
  const location = useLocation();

  const memeDetailsRef = useRef();

  const handleClick = event => {
    if (memeDetailsRef.current === event.target) {
      dispatch(unloadActualMemeAction());
    }
  };

  const handleSubmitOnPostComment = submitEvent => {
    submitEvent.preventDefault();
  };

  const handleClickOnPostOnFeed = () => {
  };

  const handleClickOnRemoveFromFeed = () => {
  };

  const handleClickOnDeleteMeme = () => {
  };

  const handleClickOnReaction = () => {
  };

  const keyPress = useCallback(
    keyPressEvent => {
      if (keyPressEvent.key === 'Escape' && showMemeDetails) {
        dispatch(unloadActualMemeAction());
      }
    },
    // eslint-disable-next-line
    [showMemeDetails]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showMemeDetails ? (
        <div id="memeDetails-background" onClick={handleClick} ref={memeDetailsRef}>
          <div id="memeDetails">
            <div id="memeDetails-left-side">
              <div id="owner-text">{owner ? owner : isPublic ? 'Status: Public' : 'Status: Private'}</div>
              <div id="memeDetails-img-box">
                <img src={memeUrl} alt="meme"/>
              </div>
              <div id="reaction-box">
                {reactions.map(({ reactionId, reactionCount }) => (
                  <div className="reaction-text" key={reactionId}>
                    <img className="memeDetails-reaction-icon" src={reactionIconDatabase[reactionId]['white']} alt={reactionId} onClick={handleClickOnReaction}/>
                    <div>{reactionCount}</div> 
                  </div>
                ))}
              </div>
            </div>
            <div id="memeDetails-right-side">
              <div id="number-of-comments">{numberOfComments} Comments</div>
              <div id="comments-box">
                <div>Comments:</div>
                <br/>
                {comments.map((comment, index) => (
                  <div key={index}>
                    <div>{comment.userName}</div>
                    <div id="comment-text">{comment.text}</div>
                    <br/>
                  </div>
                ))}
              </div>
              { location.pathname === '/main/memefeed' 
                ?
                <form id="comment-form" onSubmit={handleSubmitOnPostComment}>
                  <textarea
                    id="commentinput"
                    type="textbox"
                    placeholder="Write a comment...(max 140 characters long)"
                    maxLength="140"
                    value={comment}
                    onChange={changeEvent => {
                      setComment(changeEvent.target.value);
                    }}
                  />
                  <button type="submit">COMMENT</button> 
                </form>
                :
                <div id="myMemeDetails-button-box">
                  { isPublic 
                    ? 
                      <button type="button" onClick={handleClickOnRemoveFromFeed}>REMOVE MEME FROM FEED</button>
                    :
                      <button type="button" onClick={handleClickOnPostOnFeed}>POST MEME ON FEED</button>
                  }
                  <button type="button" onClick={handleClickOnDeleteMeme}>DELETE MEME</button>
                </div>
              }
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MemeDetails;