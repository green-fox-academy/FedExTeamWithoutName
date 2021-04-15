import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Meme from '../Meme/Meme';
import '../../styles/myMeme.css';
import { sampleMemeData } from './sampleFetchMyMeme';
import { loadMyMemeAction, errorOnLoadMyMemeAction } from '../../actions/memeActions';
import { fetchService } from '../../services';

const MyMeme = () => {
  const { myMeme } = useSelector(state => state.memeData);
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.userData);

  useEffect(() => {
    getMyMeme();
    // eslint-disable-next-line
  }, [])

  const getMyMeme = async () => {
    // ezt majd fetchelésel kapjuk meg a szervertől
    try {
      const response = await fetchService.fetchData('myfeed', 'GET', null, accessToken);
      console.log(response);
      dispatch(loadMyMemeAction(response.memeData || []))
    } catch (error) {
      console.log(error.message);
      dispatch(errorOnLoadMyMemeAction(error.message));
    }
    
  };

  return (
    <>
    <h1>MY MEME</h1>
    <div id="myMeme">
      {myMeme.map(({ comments, id: memeId, memeUrl, reactions, numberOfComments, isPublic }) => 
        <Meme 
          comments={comments}/* ezt a commentset majd ki kell törölni ha kész a commentsfetch a meme componensben*/ 
          key={memeId} 
          className={'mymeme' + isPublic}
          memeId={memeId}
          memeUrl={memeUrl} 
          reactions={reactions} 
          numberOfComments={numberOfComments}
          isPublic={isPublic} />
      )}
    </div>
    </>
  );
};

export default MyMeme;