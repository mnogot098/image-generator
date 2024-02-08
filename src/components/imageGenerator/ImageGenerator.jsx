import React, { useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";
import img_default from "../../assets/default_img.jpg";
import "./imageGenerator.css";

const ImageGenerator = () => {
  //API_KEY = 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
  const [image_url, setImage_url] = useState("/");
  const inputRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [subject, setSubject] = useState("");

  const imageGenerator = async () => {
    setLoaded(true);
    if (inputRef.current.value === "") {
      alert("required");
      setLoaded(false);
      return 1;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            " Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    const data = await response.json();
    setImage_url(data.data[0].url);
    setLoaded(false);
  };

  const reset = () => {
    setLoaded(false);
    setImage_url("/");
    setSubject("");
    return;
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        <div className="header-details">
          Ai image <span>generator</span>
        </div>

        <div className="img-loading">
          <div className="image">
            {loaded ? (
              <div className="loader">
                <ScaleLoader color="#1a8add" />
                <p>Please wait! your image is being generated</p>
                <button onClick={reset}>Reset</button>
              </div>
            ) : (
              <img src={image_url === "/" ? img_default : image_url} alt="" />
            )}
          </div>
        </div>
        <div className="search-box">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder=">>> Imagine something..."
            required
            name={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <button className="imagine" onClick={imageGenerator}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
