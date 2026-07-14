import "./App.css";
import data from "./data/videojuegos";
import TablaVideojuegos from "./components/TablaVideojuegos";
import { useState } from "react";

function App() {
  const [videojuegos, setVideojuegos] = useState(data);
  return (
    <div>
      <h1>Tienda de Videojuegos</h1>
      <TablaVideojuegos juegos={data}/>
    </div>
  );

}

export default App;

