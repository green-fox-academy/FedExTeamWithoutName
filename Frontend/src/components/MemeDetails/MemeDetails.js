import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import setShowMemeDetailsAction from '../../actions/memeDetailsAction';
import imageUrl from '../../assets/images/meme-sample.png';
import '../../styles/memeDetails.css';

const MemeDetails = () => {
  const [comment, setComment] = useState('');
  const { showMemeDetails } = useSelector(state => state.memeDetails);
  const dispatch = useDispatch();

  // meme data sample, will get datas from redux store by clicked memeId
  const sampleMemeData = {
    owner: 'Petike',
    reactions: {
      funny: 30,
      sad: 17,
      scary: 188,
    },
    comments: [
      {
        userName: 'Danika',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat.`
      },
      {
        userName: 'Danika',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat.`
      },
      {
        userName: 'Danika',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat.`
      },
      {
        userName: 'Danika',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat.`
      },
      {
        userName: 'Danika',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat.`
      }
    ]
  }

  const memeDetailsRef = useRef();

  const handleClick = event => {
    if (memeDetailsRef.current === event.target) {
      dispatch(setShowMemeDetailsAction(false));
    }
  };

  const keyPress = useCallback(
    keyPressEvent => {
      if (keyPressEvent.key === 'Escape' && showMemeDetails) {
        dispatch(setShowMemeDetailsAction(false));
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
              <div id="owner-text">{sampleMemeData.owner}</div>
              <div id="memeDetails-img-box">
                <img src={imageUrl} alt="meme"/>
              </div>
              <div id="reaction-box">
                {Object.keys(sampleMemeData.reactions).map(key => (
                  <div className="reaction-text">{key}: {sampleMemeData.reactions[key]}</div>
                ))}
              </div>
            </div>
            <div id="memeDetails-right-side">
              <div id="number-of-comments">{sampleMemeData.comments.length} Comments</div>
              <div id="comments-box">
                <div>Comments:</div>
                <br/>
                {sampleMemeData.comments.map(comment => (
                  <>
                    <div>{comment.userName}</div>
                    <div id="comment-text">{comment.text}</div>
                    <br/>
                  </>
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