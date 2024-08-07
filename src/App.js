import "./App.css";

import { useSongContext } from "./contexts/SongContext";
import { Header } from "./components/Header";
import { Player } from "./components/Player";
import { Sidebar } from "./components/Sidebar";

import { songsConstants } from "./constants/songsConstants";

const { TOOGLE_IS_SHOW_SIDEBAR } = songsConstants;

function App() {
  const {
    songs: { isShowSidebar },
    setSongs,
  } = useSongContext();

  const handleShowSidebar = () => {
    setSongs({ type: TOOGLE_IS_SHOW_SIDEBAR });
  };

  return (
    <div
      className={`relative box-border min-h-dvh bg-gradient-to-r from-black to-gray-600 p-4 text-white sm:grid sm:grid-cols-[200px_1fr_1fr] lg:mx-auto`}
    >
      <Header />
      <Sidebar />
      <Player />

      <button
        className="fixed bottom-1 left-0 w-full overflow-clip rounded-lg bg-green-600 py-2 text-white sm:hidden"
        onClick={handleShowSidebar}
      >
        {isShowSidebar ? "Player" : "All Songs"}
      </button>
    </div>
  );
}

export default App;
