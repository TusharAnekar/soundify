import { songsConstants } from "../constants/songsConstants";

const {
  SET_ALL_SONGS,
  TOOGLE_IS_SHOW_SIDEBAR,
  SET_ALL_COVERS,
  SET_SONG_LIST_TYPE,
  SET_SEARCH_INPUT,
  SET_CURRENT_TRACK,
  SET_IS_PLAYING,
  SET_IS_LOADING,
  SET_TRACK_INDEX,
} = songsConstants;

const initialSongs = {
  allSongs: [],
  isShowSidebar: false,
  allCovers: [],
  songListType: "for you",
  searchInput: "",
  currentTrack: {},
  isPlaying: false,
  isLoading: false,
  trackIndex: 0,
};

const songsReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_ALL_SONGS:
      return {
        ...state,
        allSongs: payload,
        currentTrack: payload[state.trackIndex],
      };
    case TOOGLE_IS_SHOW_SIDEBAR:
      return { ...state, isShowSidebar: !state.isShowSidebar };
    case SET_ALL_COVERS:
      return { ...state, allCovers: payload };
    case SET_SONG_LIST_TYPE:
      return { ...state, songListType: payload };
    case SET_SEARCH_INPUT:
      return { ...state, searchInput: payload };
    case SET_CURRENT_TRACK:
      return { ...state, currentTrack: payload };
    case SET_IS_PLAYING:
      return { ...state, isPlaying: payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: payload };
    case SET_TRACK_INDEX:
      return { ...state, trackIndex: payload };
    default:
      return state;
  }
};

export { initialSongs, songsReducer };
