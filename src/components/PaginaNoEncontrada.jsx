import { Link } from "react-router-dom";
import "./PaginaNoEncontrada.css";


function PaginaNoEncontrada(){
  return (
  <div className="pagina404-container">
    <div className="pagina404-card">

      <h1>404</h1>

      <h2>¡Ups! Página no encontrada</h2>

      <p>
        Lo sentimos, la página que intentas visitar no existe
        o fue movida a otra ubicación.
      </p>

      <Link className="btn-volver" to="/">
        Volver al inicio
      </Link>

    </div>
  </div>
);
}

export default PaginaNoEncontrada;