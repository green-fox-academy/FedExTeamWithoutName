import React, { useState }  from 'react';

const Generator = () => {

  const [previewSource , setPreviewSource] = useState();

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  const fetchImageAndDisplay = async () => {
    try {
      const fetchResult = await fetch("https://ronreiter-meme-generator.p.rapidapi.com/meme?meme=Advice-Peeta&bottom=...dudeee&top=Heeey&font_size=45&font=Impact", {
  	    "method": "GET",
  	    "headers": {
  		    "x-rapidapi-key": "6f46f1af29msha8dcf988f7d46fcp15a733jsnf1391498a3b7",
  		    "x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com"
  	      }
        }
      )
      let image = await convertBlobToBase64(await fetchResult.blob());
      setPreviewSource(image);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1 className="">Meme Generator</h1>
      <button type="button" onClick={fetchImageAndDisplay}>
        Generate!
      </button>
      {previewSource && (
        <img src={previewSource} alt="" style={{height: '450px'}} />
      )}
    </div>
  )
}

export default Generator;
