import { createContext, useContext, useEffect, useReducer } from "react";

import { getAllSongs } from "../services/songService";
import { initialSongs, songsReducer } from "../reducers/songsReducer";
import { songsConstants } from "../constants/songsConstants";

const { SET_ALL_SONGS } = songsConstants;

const SongContext = createContext();

const SongProvider = ({ children }) => {
  const [songs, setSongs] = useReducer(songsReducer, initialSongs);

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
  return (
    <SongContext.Provider value={{ songs, setSongs }}>
      {children}
    </SongContext.Provider>
  );
};

const useSongContext = () => useContext(SongContext);

export { SongProvider, useSongContext };
