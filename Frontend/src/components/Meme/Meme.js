import React from 'react';
import { useDispatch } from 'react-redux';
import { loadActualMemeAction } from '../../actions/memeActions';
import '../../styles/meme.css';

const Meme = ({ 
    comments, /* ezt a commentset majd ki kell törölni ha kész a commentsfetch a meme componensben*/
    memeId, 
    owner, 
    memeUrl, 
    reactions, 
    numOfComments 
  }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    // ide kell egy fetch ami lekéri ennek a memeID-nak a commentjeit
    const responseFetchCommentsByMemeId = comments;
    // ide kell egy fetch ami lekéri ennek a memeID-nak a commentjeit
    dispatch(loadActualMemeAction(
      {
        showMemeDetails: true,
        memeId: memeId,
        owner: owner,
        memeUrl: memeUrl,
        reactions: reactions,
        numOfComments: numOfComments,
        comments: responseFetchCommentsByMemeId,
      }
    ));
  };

  return (
    <div className="meme" onClick={handleClick}>
      <div id="meme-img-box">
        <img src={memeUrl} alt="meme"/>
      </div>
      <div id="meme-text-box">
        <div id="meme-reactions">
          {Object.keys(reactions).map(key => (
            <div key={key}>{key}: {reactions[key]}</div>
          ))}
        </div>
        <div id="meme-comments">
          {numOfComments} Comments
        </div>
      </div>
    </div>
  );
};

export default Meme;
