import { useRef } from "react";

import { useSongContext } from "../contexts/SongContext";
import { Controls } from "./Controls";
import { DisplayTrack } from "./DisplayTrack";
import { ProgressBar } from "./ProgressBar";

export const Player = () => {
  const {
    songs: { isShowSidebar },
  } = useSongContext();

  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <div
      className={`${!isShowSidebar ? `max-sm:block` : `max-sm:hidden`} grid max-h-dvh items-center p-4`}
    >
      <div>
        <DisplayTrack audioRef={audioRef} />
        <ProgressBar progressBarRef={progressBarRef} audioRef={audioRef} />
        <Controls audioRef={audioRef} progressBarRef={progressBarRef} />
      </div>
    </div>
  );
};
