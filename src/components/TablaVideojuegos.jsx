import "./TablaVideojuegos.css";
import { useNavigate } from "react-router-dom";

function TablaVideojuegos({ juegos, onEliminar, onEditar }) {

  const navigate = useNavigate();

  function manejarEditar(juego){
    navigate("/editar", {
      state: {
        videojuego: juego,
      },
    });
  }

  return (
    <div className="videojuegos-container">
      <div className="videojuegos-header">
        <div>
          <h2>🎮 Biblioteca de Videojuegos</h2>
          <p>Administra tu colección de videojuegos.</p>
        </div>
        <span className="juegos-badge">{juegos.length} títulos</span>
      </div>

      <div className="videojuegos-wrapper">
        <table className="tabla-videojuegos">
          <thead>
            <tr>
              <th>Título</th>
              <th>Género</th>
              <th>Plataforma</th>
              <th>Lanzamiento</th>
              <th>Precio</th>
              <th>Disponible</th>
              <th>Progreso</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {juegos.map((juego) => (
              <tr key={juego.id}>
                {/* Agregamos data-label a cada celda */}
                <td data-label="Título" className="titulo-destacado">{juego.titulo}</td>
                <td data-label="Género">
                  <span className="genero-tag">{juego.genero}</span>
                </td>
                <td data-label="Plataforma">{juego.plataforma}</td>
                <td data-label="Lanzamiento">{juego.lanzamiento}</td>
                <td data-label="Precio" className="precio-tag">${juego.precio}</td>
                <td data-label="Disponible">
                  <span className={`disponible-tag ${juego.disponible ? "si" : "no"}`}>
                    {juego.disponible ? "Sí" : "No"}
                  </span>
                </td>
                <td data-label="Progreso">
                  <div className="progreso-container">
                    <progress
                      className="progreso-barra"
                      value={juego.progreso * 100}
                      max="100"
                    ></progress>
                    <span className="progreso-texto">{Math.round(juego.progreso * 100)}%</span>
                  </div>
                </td>
                <td data-label="Acciones">
                  <div className="acciones-container">
                    <button className="btn-editar" onClick={()=> manejarEditar(juego)}>✏️Editar</button>
                    <button className="btn-eliminar" onClick={()=> onEliminar(juego.id)}>🗑️Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaVideojuegos;