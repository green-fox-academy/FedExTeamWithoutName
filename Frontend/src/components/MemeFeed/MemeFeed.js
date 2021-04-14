import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Meme from '../Meme/Meme';
import '../../styles/memeFeed.css';
import { sampleMemeData } from './sampleFetchMemeFeed';
import { loadMemeFeedAction } from '../../actions/memeActions';

const MemeFeed = () => {
  const { memeFeed } = useSelector(state => state.memeData);
  const dispatch = useDispatch();

  useEffect(() => {
    getMemeFeed();
    // eslint-disable-next-line
  }, [])

  const getMemeFeed = async () => {
    // ezt majd fetchelésel kapjuk meg a szervertől
    const fetchRespone = sampleMemeData;
    // ezt majd fetchelésel kapjuk meg a szervertől
    
    dispatch(loadMemeFeedAction(fetchRespone));
  };

  return (
    <div id="memeFeed">
      {memeFeed.map(memeData => 
        <Meme 
          comments={memeData.comments}/* ezt a commentset majd ki kell törölni ha kész a commentsfetch a meme componensben*/ 
          key={memeData.memeId} 
          memeId={memeData.memeId}
          owner={memeData.owner} 
          memeUrl={memeData.memeUrl} 
          reactions={memeData.reactions} 
          numOfComments={memeData.numOfComments} />
      )}
    </div>
  );
};

export default MemeFeed;