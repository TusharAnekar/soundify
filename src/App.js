import "./App.css";
import { useSongContext } from "./contexts/SongContext";

function App() {
  const {
    songs: { allSongs },
  } = useSongContext();

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
