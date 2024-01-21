"use client";

import React, { useEffect, useState } from "react";
import SearchAnime from "./search";

export default function Search() {
  const [searchTxt, setSearchTxt] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [initData, _] = useState([]);

  useEffect(() => {
    SearchAnime("").then((res) => {
      setSearchRes(res);
    });
  }, [initData]);

  const handleSearch = (query) => {
    setSearchTxt(query);

    SearchAnime(query).then((result) => {
      setSearchRes(result);
    });
  };

  return (
    <div className="search-area">
      <div className="search-bar">
        <input
          type="search"
          onInput={(e) => handleSearch(e.target.value)}
          id="search-box"
          className="search-box"
          value={searchTxt}
          placeholder="start typing...."
        />
        <img className="search-logo" src="/search.svg" />
      </div>
      <div className="search-results">
        {searchRes.map((doc) => {
          return (
            <div key={doc._id} className="search-element">
              {/* <div className="_id">{doc.id}</div> */}
              {doc.title.english && (
                <div id="metadata" className="title english">
                  <h1>{doc.title.english}</h1>
                </div>
              )}
              {!doc.title.english && doc.title.romaji && (
                <div id="metadata" className="title romaji">
                  <h1>{doc.title.romaji}</h1>
                </div>
              )}
              {doc.bannerImage && (
                <div id="metadata" className="coverImage">
                  <img src={doc.bannerImage} />
                </div>
              )}
              {!doc.bannerImage && doc.coverImage.large && (
                <div id="metadata" className="coverImage">
                  <img src={doc.coverImage.large} />
                </div>
              )}
              <div id="metadata" className="episodes">
                <b>Episodes : </b> {doc.episodes}
              </div>
              {/* <div className="tags">{doc.tags}</div> */}
              <div id="metadata" className="desc">
                <b> Description : </b>
                <div dangerouslySetInnerHTML={{ __html: doc.description }} />
                {/* {doc.description} */}
              </div>
              <div id="metadata" className="startDate">
                <b>Start Date : </b>
                {doc.startDate.day}/{doc.startDate.month}/{doc.startDate.year}
              </div>
              <div id="metadata" className="endDate">
                <b> End Date : </b>
                {doc.endDate.day}/{doc.endDate.month}/{doc.endDate.year}
              </div>
              <div id="metadata" className="genre">
                <b>Genres : </b>
                {doc.genres + ""}
              </div>
              <div id="metadata" className="score">
                <b> Mean Score : </b>
                {doc.meanScoreAni + ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
