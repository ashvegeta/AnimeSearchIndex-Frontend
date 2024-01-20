"use client";

import React, { useState } from "react";
import SearchAnime from "./search";

export default function Search() {
  const [searchTxt, setSearchTxt] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  const handleSearch = () => {
    // console.log("searchtxt:", searchTxt);

    const res = SearchAnime(searchTxt);

    res.then((result) => {
      setSearchRes(result);
      //   console.log("result", result);
    });
  };

  return (
    <div className="search-area">
      <div className="search-bar">
        <input
          type="search"
          onInput={(e) => setSearchTxt(e.target.value)}
          id="search-box"
          className="search-box"
          value={searchTxt}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="search-results">
        {searchRes.map((doc) => {
          return (
            <div key={doc._id} className="search-element">
              <div className="_id">{doc.id}</div>
              {doc.title.english && (
                <div className="title english">{doc.title.english}</div>
              )}
              {!doc.title.english && doc.title.romaji && (
                <div className="title romaji">{doc.title.romaji}</div>
              )}
              <div className="episodes">{doc.episodes}</div>
              {/* <div className="tags">{doc.tags}</div> */}
              <div className="desc">{doc.description}</div>
              <div className="startDate">
                {doc.startDate.day} {doc.startDate.month} {doc.startDate.year}
              </div>
              <div className="endDate">
                {doc.endDate.day} {doc.endDate.month} {doc.endDate.year}
              </div>
              <div className="genre">{doc.genres + ""}</div>
              <div className="score">{doc.meanScoreAni + ""}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
