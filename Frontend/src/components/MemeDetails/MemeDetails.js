import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unloadActualMemeAction } from '../../actions/memeActions';
import '../../styles/memeDetails.css';

const MemeDetails = () => {
  const [comment, setComment] = useState('');
  const { showMemeDetails, owner, memeUrl, reactions, numOfComments, comments } = useSelector(state => state.memeData.actualMeme);
  const dispatch = useDispatch();

  const memeDetailsRef = useRef();

  const handleClick = event => {
    if (memeDetailsRef.current === event.target) {
      dispatch(unloadActualMemeAction());
    }
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
              <div id="owner-text">{owner}</div>
              <div id="memeDetails-img-box">
                <img src={memeUrl} alt="meme"/>
              </div>
              <div id="reaction-box">
                {Object.keys(reactions).map(key => (
                  <div className="reaction-text" key={key}>{key}: {reactions[key]}</div>
                ))}
              </div>
            </div>
            <div id="memeDetails-right-side">
              <div id="number-of-comments">{numOfComments} Comments</div>
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
              <form id="comment-form">
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
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MemeDetails;