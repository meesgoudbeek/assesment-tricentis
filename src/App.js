import { useEffect, useMemo, useState } from "react";

import "./App.css";

function App() {
  const defaultValues = ["A", "B", "C", "D", "E"];

  const [{ albums, displayList }, setAlbumsState] = useState({
    albums: [...defaultValues],
    displayList: [...defaultValues],
    albumIndex: 0,
  });

  useEffect(
    function setupInterval() {
      setInterval(function shiftListElements() {
        setAlbumsState((prevState) => ({
          ...prevState,
          displayList: [
            ...prevState.displayList.slice(1),
            prevState.albums[prevState.albumIndex],
          ],
          albumIndex:
            prevState.albumIndex !== albums.length - 1
              ? prevState.albumIndex + 1
              : 0,
        }));
      }, 1000);
    },
    [albums.length]
  );

  const albumList = useMemo(
    () =>
      displayList.map((elem) => (
        <li className="item" key={elem}>
          {elem}
        </li>
      )),
    [displayList]
  );

  return (
    <main className="App">
      <input placeholder="Search band" className="input" />
      <ul className="list">{albumList}</ul>
    </main>
  );
}

export default App;
