import { songsConstants } from "../constants/songsConstants";

const { SET_ALL_SONGS } = songsConstants;

const initialSongs = {
  allSongs: [],
};

const songsReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_ALL_SONGS:
      return { ...state, allSongs: payload };

    default:
      return state;
  }
};

export { initialSongs, songsReducer };
