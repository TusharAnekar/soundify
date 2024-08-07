import { useEffect } from "react";
import { useSongContext } from "../contexts/SongContext";
import { SongCard } from "./SongCard";

import SearchIcon from "@mui/icons-material/Search";
import { getCover } from "../services/songService";

import { songsConstants } from "../constants/songsConstants";
import { Loader } from "./Loader";
const { SET_ALL_COVERS, SET_SONG_LIST_TYPE, SET_SEARCH_INPUT, SET_IS_LOADING } =
  songsConstants;

export const Sidebar = () => {
  const {
    songs: { allSongs, isShowSidebar, isLoading, songListType },
    setSongs,
    searchedSongsList,
  } = useSongContext();

  useEffect(() => {
    async function getAllCovers() {
      try {
        setSongs({ type: SET_IS_LOADING, payload: true });
        const allCovers = await Promise.all(
          allSongs?.map(async ({ cover }) => {
            const responseCovers = await getCover(cover);
            return responseCovers.url;
          }),
        );
        setSongs({ type: SET_ALL_COVERS, payload: allCovers });
        setSongs({ type: SET_IS_LOADING, payload: false });
      } catch (error) {
        console.error(error);
      }
    }
    getAllCovers();
  }, [allSongs, setSongs]);

  function handleSearch(e) {
    setSongs({ type: SET_SEARCH_INPUT, payload: e.target.value.toLowerCase() });
  }

  function handleSongListType(songListType) {
    setSongs({ type: SET_SONG_LIST_TYPE, payload: songListType });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${isShowSidebar ? `max-sm:block` : `max-sm:hidden`}`}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <button
                className={`text-lg ${songListType === "for you" && "font-bold"}`}
                onClick={() => handleSongListType("for you")}
              >
                For You
              </button>
              <button
                className={`text-lg ${songListType === "top tracks" && "font-bold"}`}
                onClick={() => handleSongListType("top tracks")}
              >
                Top Tracks
              </button>
            </div>

            <div>
              <input
                type="text"
                placeholder="Search Song, Artist"
                className="w-full rounded-lg bg-gray-500 py-2 pl-2 pr-10"
                onChange={handleSearch}
              />
              <SearchIcon className="-m-8" />
            </div>

            <div className="flex flex-col gap-4">
              {searchedSongsList?.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
