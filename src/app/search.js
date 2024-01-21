"use server";

import clientPromise from "../../lib/mongodb";

export default async function SearchAnime(searchTxt) {
  try {
    const client = await clientPromise;

    const collection = client.db("animeDB").collection("animeCollection");
    const aggregate = [];
    let anime;

    if (searchTxt === "") {
      anime = await collection
        .find({})
        .sort({ meanScoreAni: -1 })
        .limit(10)
        .toArray();
    } else {
      anime = await collection
        .aggregate([
          {
            $search: {
              index: "animeSearchIndex",
              autocomplete: {
                query: searchTxt,
                path: "synonyms",
              },
            },
          },
          // {
          //   $sort: {
          //     meanScoreAni: -1,
          //   },
          // },
          {
            $limit: 10,
          },
        ])
        .toArray();
    }

    return JSON.parse(JSON.stringify(anime));
  } catch (e) {
    console.error(e);
  }
}
