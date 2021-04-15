import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Meme from '../Meme/Meme';
import '../../styles/memeFeed.css';
import { sampleMemeData } from './sampleFetchMemeFeed';
import { loadMemeFeedAction,errorOnLoadMemeFeedAction } from '../../actions/memeActions';
import { fetchService } from '../../services';

const MemeFeed = () => {
  const { memeFeed, loadMemeFeedStatus } = useSelector(state => state.memeData);
  const { accessToken } = useSelector(state => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    getMemeFeed();
    // eslint-disable-next-line
  }, [])

  const getMemeFeed = async () => {
    // fetch minden meme-t ami isPublic=true
    try {
      const response = await fetchService.fetchData('feed', 'GET', null, accessToken);
      console.log(response.memeData)
      dispatch(loadMemeFeedAction(response.memeData))
    } catch (error) {
      console.log(error.message);
      dispatch(errorOnLoadMemeFeedAction(error.message));
    }
    // fetch minden meme-t ami isPublic=true
    
  };

  return (
    <>
    <h1 className="memeFeedTitle">MEME FEED</h1>
    <div id="memeFeed">
      { loadMemeFeedStatus === 'ready' && memeFeed.map(({ comments, id: memeId, username: owner, memeUrl, reactions, numberOfComments }) => 
        <Meme 
          //comments={comments}/* ezt a commentset majd ki kell törölni ha kész a commentsfetch a meme componensben*/ 
          key={memeId} 
          className="meme"
          memeId={memeId}
          owner={owner} 
          memeUrl={memeUrl} 
          reactions={reactions} 
          numberOfComments={numberOfComments} />
      )}
    </div>
    </>
  );
};

export default MemeFeed;