import { Link } from "react-router-dom";
import "./Navbar.css";

/*Permite acceder al inicio y al formulario de registro.*/
function Navbar(){
  return(
    <nav>
      <span>🎮 Tienda de Videojuegos</span>  

      <div>
        <Link to="/">Inicio</Link>
        <Link to="/nuevo">Nuevo Juego</Link>
      </div>
    </nav>
  );
}

export default Navbar;