import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FormularioVideojuego({onGuardar}){

    const location = useLocation();
    const navigate = useNavigate();

    const videojuegoRecuperado = location.state?.videojuego || null;


    const [titulo, setTitulo] = useState(""); 
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState(0);

    useEffect(()=> {
      if(videojuegoRecuperado){
        setTitulo(videojuegoRecuperado.titulo);
        setGenero(videojuegoRecuperado.genero);
        setPlataforma(videojuegoRecuperado.plataforma);
        setLanzamiento(videojuegoRecuperado.lanzamiento);
        setPrecio(videojuegoRecuperado.precio);
        setDisponible(videojuegoRecuperado.disponible);
        setProgreso(videojuegoRecuperado.progreso);
      }else{
        setTitulo("");
        setGenero("");
        setPlataforma("");
        setLanzamiento("");
        setPrecio("");
        setDisponible(true);
        setProgreso(0);
      }
    }, [videojuegoRecuperado]);

    function manejarGuardar(){
       const videojuego = {
        id: 
          videojuegoRecuperado !== null && videojuegoRecuperado !== undefined ? videojuegoRecuperado.id : Date.now(),
          titulo,
          genero,
          plataforma,
          lanzamiento: Number(lanzamiento),
          precio: Number(precio),
          disponible,
          progreso: Number(progreso),
       };
       
       onGuardar(videojuego);
       navigate("/");
    }

    function manejarCancelar(){
        navigate("/");
    }

    return(
      <div>
        <label>Titulo</label>
        <input
          type="text"
          value={titulo}
          onChange={(e)=> setTitulo(e.target.value)}
          placeholder="Ingrese el titulo del videojuego"
        />
        <label>
          Genero  
          <select
            value={genero} 
            onChange={(e)=>setGenero(e.target.value)}
        > 
            <option value="">Seleccione un genero</option>
            <option value="Accion">Accion</option> 
            <option value="Aventura">Aventura</option>  
            <option value="RPG">RPG</option> 
            <option value="Shooter">Shooter</option>
            <option value="Terror">Terror</option>
            <option value="Carreras">Carreras</option>
          </select>  
        </label>
        
        <label>
          Plataforma  
          <select
            value={plataforma} 
            onChange={(e)=>setPlataforma(e.target.value)}
        > 
            <option value="">Seleccione un plataforma</option>
            <option value="PC">PC</option> 
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="PlayStation 5">PlayStation 5</option>  
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="Xbox">Carreras</option>
          </select>  
        </label>

        <label>Año de lanzamiento</label>
        <input
          type="Number"
          value={lanzamiento}
          onChange={(e)=> setLanzamiento(e.target.value)}
          placeholder="Ej: 2024"
          min="1970"
          max="2100"
        />

        <label>Precio</label>
        <input
          type="Number"
          value={precio}
          onChange={(e)=> setPrecio(e.target.value)}
          placeholder="Ej: 51.80"
          min="0"
          step="0.01"
        />

        <label>
          Disponible
          <input
            type="checkbox"
            checked={disponible}
            onChange={(e)=> setDisponible(e.target.checked)}
          />
        </label>

        <label>
            Progreso: {Math.round(progreso * 100)}%
        </label>

        <input
          type="range"
          min="0"
          max="100"
          value={progreso * 100}
          onChange={(e)=> setProgreso(e.target.value / 100)}
        />

        <button onClick={manejarGuardar}>Guardar</button>
        <button onClick={manejarCancelar}>Cancelar</button>
      </div>  
    );
}

export default FormularioVideojuego