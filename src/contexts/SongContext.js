import { createContext, useContext, useEffect, useReducer } from "react";

import { getAllSongs } from "../services/songService";
import { initialSongs, songsReducer } from "../reducers/songsReducer";
import { songsConstants } from "../constants/songsConstants";

const { SET_ALL_SONGS } = songsConstants;

const SongContext = createContext();

const SongProvider = ({ children }) => {
  const [songs, setSongs] = useReducer(songsReducer, initialSongs);
  const { allSongs, songListType, searchInput, allCovers } = songs;

  async function getSongs() {
    try {
      const songsResponse = await getAllSongs();

      if (songsResponse.status === 200) {
        const songsData = await songsResponse.json();
        const { data } = songsData;
        setSongs({ type: SET_ALL_SONGS, payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSongs();
  }, []);

  const getCoverImageForASong = (cover) =>
    allCovers?.find((coverUrl) => coverUrl.includes(cover));

  const selectedSongsList =
    songListType === "for you"
      ? allSongs
      : allSongs?.filter(({ top_track }) => top_track);

  const searchedSongsList = searchInput.length
    ? selectedSongsList?.filter(
        ({ name, artist }) =>
          name.toLowerCase().includes(searchInput) ||
          artist.toLowerCase().includes(searchInput),
      )
    : selectedSongsList;

  return (
    <SongContext.Provider
      value={{ songs, setSongs, searchedSongsList, getCoverImageForASong }}
    >
      {children}
    </SongContext.Provider>
  );
};

const useSongContext = () => useContext(SongContext);

export { SongProvider, useSongContext };
