export const ProgressBar = ({ progressBarRef, audioRef }) => {
  function handleProgressChange() {
    audioRef.current.currentTime = progressBarRef.current.value;
  }

  return (
    <div>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue={0}
        onChange={handleProgressChange}
        className="w-full"
      />
    </div>
  );
};
