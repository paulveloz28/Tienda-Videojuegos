import { Link } from "react-router-dom";
import "./Navbar.css";


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