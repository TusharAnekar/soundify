import { useSongContext } from "../contexts/SongContext";

export const DisplayTrack = ({ audioRef }) => {
  const {
    songs: { currentTrack },
    getCoverImageForASong,
  } = useSongContext();

  const { name, artist, cover, url } = currentTrack;
  const coverImage = getCoverImageForASong(cover);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm text-gray-500">{artist}</p>
      </div>
      <img
        src={coverImage}
        alt={`${name} cover of album`}
        className="aspect-square w-5/6 rounded-lg"
      />
      <audio src={url} ref={audioRef}></audio>
    </div>
  );
};
