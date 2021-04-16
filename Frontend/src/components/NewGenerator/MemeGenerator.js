import React, { useState, useEffect } from "react";
import { MemeCard } from "./memeCard";

const objectToQueryParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

const MemeGenerator = () => {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);

  if (meme) {
    return (
      <div className="createdmemebox" style={{ textAlign: "center" }}>
        <img style={{ width: 200 }} src={meme} alt="custom meme" />
      <button className="addtomymemes">ADD TO MY MEMES</button>
      </div>
      
    );
  }

  return (
    <div  className="generatorContainer" style={{ textAlign: "center" }}>
      {template && (
        <form className="memeform"
          onSubmit={async e => {
            e.preventDefault();
            const params = {
              template_id: template.id,
              text0: topText,
              text1: bottomText,
              username: "xzk03017",
              password: "xzk03017@cndps.com"
            };
            const response = await fetch(
              `https://api.imgflip.com/caption_image${objectToQueryParam(
                params
              )}`
            );
            const json = await response.json();
            setMeme(json.data.url);
          }}
        >
          <MemeCard template={template} />
          <div className="inputHolder">
          <input
            placeholder="top text"
            value={topText}
            onChange={e => setTopText(e.target.value)}
          />
          <input
            placeholder="bottom text"
            value={bottomText}
            onChange={e => setBottomText(e.target.value)}
          />
          <button className="creatememebutton" type="submit">Create meme</button>
          </div>
        </form>
      )}
      {!template && (
        <>
          <h1>Pick a template</h1>
          <div className="templatescontainer">
          {templates.map(template => {
            return (
              <MemeCard
                template={template}
                onClick={() => {
                  setTemplate(template);
                }}
              />
            );
          })}
          </div>
        </>
      )}
    </div>
  );
}

export default MemeGenerator;