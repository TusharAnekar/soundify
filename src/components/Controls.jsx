import { useCallback, useEffect, useRef } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

import { songsConstants } from "../constants/songsConstants";
import { useSongContext } from "../contexts/SongContext";
const { SET_IS_PLAYING, SET_TRACK_INDEX, SET_CURRENT_TRACK } = songsConstants;

export const Controls = ({ audioRef, progressBarRef }) => {
  const {
    songs: { isPlaying, trackIndex, allSongs },
    setSongs,
  } = useSongContext();

  const playAnimationRef = useRef();

  function togglePlayPause() {
    setSongs({ type: SET_IS_PLAYING, payload: !isPlaying });
  }

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    progressBarRef.current.value = currentTime;
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  function handleNextTrack() {
    if (trackIndex >= allSongs.length - 1) {
      setSongs({ type: SET_TRACK_INDEX, payload: 0 });
      setSongs({ type: SET_CURRENT_TRACK, payload: allSongs[0] });
    } else {
      setSongs({ type: SET_TRACK_INDEX, payload: trackIndex + 1 });
      setSongs({ type: SET_CURRENT_TRACK, payload: allSongs[trackIndex + 1] });
    }
  }

  function handlePreviousTrack() {
    if (trackIndex === 0) {
      let lastTrackIndex = allSongs.length - 1;
      setSongs({ type: SET_TRACK_INDEX, payload: lastTrackIndex });
      setSongs({ type: SET_CURRENT_TRACK, payload: allSongs[lastTrackIndex] });
    } else {
      setSongs({ type: SET_TRACK_INDEX, payload: trackIndex - 1 });
      setSongs({ type: SET_CURRENT_TRACK, payload: allSongs[trackIndex - 1] });
    }
  }

  return (
    <div>
      <div>
        <button>
          <MoreHorizIcon />
        </button>
        <button>
          <ArrowLeftIcon onClick={handlePreviousTrack} />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />}
        </button>
        <button onClick={handleNextTrack}>
          <ArrowRightIcon />
        </button>
        <button>
          <VolumeUpIcon />
        </button>
      </div>
    </div>
  );
};
