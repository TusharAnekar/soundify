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
  }, [audioRef, progressBarRef]);

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
    <div className="flex justify-between">
      <button>
        <MoreHorizIcon />
      </button>

      <div>
        <button className="relative" onClick={handlePreviousTrack}>
          <ArrowLeftIcon className="absolute bottom-0 right-1" />
          <ArrowLeftIcon />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />}
        </button>
        <button className="relative" onClick={handleNextTrack}>
          <ArrowRightIcon className="absolute bottom-0 left-1" />
          <ArrowRightIcon />
        </button>
      </div>

      <button>
        <VolumeUpIcon />
      </button>
    </div>
  );
};
