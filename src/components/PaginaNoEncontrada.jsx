import { Link } from "react-router-dom";

function PaginaNoEncontrada(){
  return(
    <div>
      <h1>404</h1>  

      <h2>Pagina no encontrada</h2>

      <p>La pagina que intentas visitar no existe.</p>

      <Link to="/">Volver al inicio</Link>
    </div>
  );  
}

export default PaginaNoEncontrada;