import "./App.css";
import data from "./data/videojuegos";
import TablaVideojuegos from "./components/TablaVideojuegos";


import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FormularioVideojuego from "./components/FormularioVideojuego";
import AlertaNotificacion from "./components/AlertaNotificacion";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";

function App() {
  /*Estado que almacena la lista de videojuegos.*/
  const [videojuegos, setVideojuegos] = useState(() => {
  const datosGuardados = localStorage.getItem("lista_videojuegos");

  return datosGuardados
    ? JSON.parse(datosGuardados)
    : data;
});

 const [mensaje, setMensaje] = useState("");

/*Guarda automáticamente los videojuegos en LocalStorage cada vez que la lista cambia.*/
 useEffect(() => {
  localStorage.setItem(
    "lista_videojuegos",
    JSON.stringify(videojuegos)
  );
  }, [videojuegos]);

  function agregarVideojuego(videojuegoNuevo) {
  setVideojuegos([...videojuegos, videojuegoNuevo]);
  }

  function eliminarVideojuego(id){
    const filtrados = videojuegos.filter((juego) => juego.id !== id);
    setVideojuegos(filtrados);
  }

  function editarVideojuego(videojuegoEditado){
    const actualizados = videojuegos.map((juego)=> {
      if(juego.id === videojuegoEditado.id){
        return videojuegoEditado;
      }else{
        return juego;
      }
    });

    setVideojuegos(actualizados);
  }

  function manejarGuardar(videojuego){

  const existe = videojuegos.find(
    (juego) => juego.id === videojuego.id
  );

  if(existe){
    editarVideojuego(videojuego);
    setMensaje("Videojuego actualizado correctamente.");
  }else{
    agregarVideojuego(videojuego);
    setMensaje("Videojuego agregado correctamente.");
  }
}

  function cerrarMensaje(){
  setMensaje("");
  }

  return (
    <BrowserRouter>
      <Navbar/>

      {mensaje && (
    <AlertaNotificacion
      mensaje={mensaje}
      onCerrar={cerrarMensaje}
    />
    )}
      {/* Definición de las rutas de la aplicación */}
      <Routes>
        <Route
          path="/"
          element={
            <TablaVideojuegos
              juegos={videojuegos}
              onEliminar={eliminarVideojuego}
            />
          }
        />

        <Route
          path="/nuevo"
          element={
            <FormularioVideojuego
              onGuardar={manejarGuardar}
            />
          }
        />

        <Route
          path="/editar"
          element={
            <FormularioVideojuego
              onGuardar={manejarGuardar}
            />
          }
        />

        <Route
          path="*"
          element={<PaginaNoEncontrada/>}
        />

      </Routes>
    </BrowserRouter>
  );

}

export default App;

