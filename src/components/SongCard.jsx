import { useEffect, useState } from "react";
import { useSongContext } from "../contexts/SongContext";

import { songsConstants } from "../constants/songsConstants";
const { SET_CURRENT_TRACK, SET_IS_PLAYING } = songsConstants;

export const SongCard = ({ song }) => {
  const { name, artist, cover, url } = song;

  const [duration, setDuration] = useState(null);

  const {
    songs: { isPlaying },
    setSongs,
    getCoverImageForASong,
  } = useSongContext();

  const coverImage = getCoverImageForASong(cover);

  useEffect(() => {
    const audio = new Audio(url);

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, [url]);

  function handlePlaySong() {
    setSongs({ type: SET_CURRENT_TRACK, payload: song });
    setSongs({ type: SET_IS_PLAYING, payload: !isPlaying });
  }

  return (
    <div className="flex gap-4" onClick={handlePlaySong}>
      <img
        src={coverImage}
        alt={`${name} album cover`}
        className="aspect-square w-12 rounded-full"
      />

      <div className="flex w-full justify-between">
        <div>
          <p>{name}</p>
          <p className="text-sm text-gray-500">{artist}</p>
        </div>

        <p className="flex items-center justify-center">
          {Math.floor(duration / 60)}:
          {Math.floor(duration % 60)
            .toString()
            .padStart(2, "0")}{" "}
        </p>
      </div>
    </div>
  );
};
