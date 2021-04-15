import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadActualMemeAction, /*errorOnloadActualMemeAction*/ } from '../../actions/memeActions';
import { reactionIconDatabase } from '../../services'
import '../../styles/meme.css';
/*import { fetchService } from '../../services';*/

const Meme = ({ 
    comments, /* ezt a commentset majd ki kell törölni ha kész a commentsfetch a meme componensben*/
    className,
    memeId, 
    owner, 
    memeUrl, 
    reactions, 
    numberOfComments,
    isPublic
  }) => {
  const [iconColor, setIconColor] = useState('white')
  const dispatch = useDispatch();

  const handleOnMouseEnter = () => {
    setIconColor('black');
  };

  const handleOnMouseLeave = () => {
    setIconColor('white');
  };

  const handleClickOnReaction = () => {
  };

  const handleClick = () => {
    // fetch ami lekéri ennek a memeID-nak a commentjeit
    // try {
    //   const response = await fetchService.fetchData('valamipath', 'GET', null, accessToken);
    //   dispatch(loadActualMemeAction({
    //     showMemeDetails: true,
    //     memeId,
    //     owner,
    //     memeUrl,
    //     reactions,
    //     numberOfComments,
    //     comments: response,
    //     isPublic,
    //   }));
        const responseFetchCommentsByMemeId = comments;
        dispatch(loadActualMemeAction({
          showMemeDetails: true,
          memeId,
          owner,
          memeUrl,
          reactions,
          numberOfComments,
          comments: responseFetchCommentsByMemeId,
          isPublic,
        }));
    // } catch (error) {
    //   console.log(error.message);
    //   dispatch(errorOnloadActualMemeAction(error.message));
    // }
    // fetch ami lekéri ennek a memeID-nak a commentjeit
  };

  return (
    <div className={className} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
      <div id="meme-img-box"  onClick={handleClick}>
        <img src={memeUrl} alt="meme"/>
      </div>
      <div id="meme-text-box">
        <div id="meme-reactions">
          {reactions.map(({ reactionId, reactionCount }) => (
            <div className="meme-reaction-text" key={reactionId}><img className="reaction-icon" src={reactionIconDatabase[reactionId][iconColor]} alt={reactionId} onClick={handleClickOnReaction}/>{reactionCount}</div>
          ))}
        </div>
        <div id="meme-comments">
          {numberOfComments} Comments
        </div>
      </div>
    </div>
  );
};

export default Meme;
