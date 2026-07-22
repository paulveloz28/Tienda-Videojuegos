import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

function FormularioVideojuego({onGuardar}){

    /* Hooks de navegación y recuperación de datos.*/
    const location = useLocation();
    const navigate = useNavigate();

    /*Recupera el videojuego enviado desde la tabla para editarlo.*/
    const videojuegoRecuperado = location.state?.videojuego || null;


    const [titulo, setTitulo] = useState(""); 
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState(0);

    const [fechaLanzamiento, setFechaLanzamiento] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [calificacion, setCalificacion] = useState("");

    const [errores, setErrores] = useState({});

    /*Carga los datos del videojuego cuando se edita un registro.*/
    useEffect(()=> {
      if(videojuegoRecuperado){
        setTitulo(videojuegoRecuperado.titulo);
        setGenero(videojuegoRecuperado.genero);
        setPlataforma(videojuegoRecuperado.plataforma);
        setLanzamiento(videojuegoRecuperado.lanzamiento);
        setPrecio(videojuegoRecuperado.precio);
        setDisponible(videojuegoRecuperado.disponible);
        setProgreso(videojuegoRecuperado.progreso);
        setFechaLanzamiento(videojuegoRecuperado.fechaLanzamiento);
        setDescripcion(videojuegoRecuperado.descripcion);
        setCalificacion(videojuegoRecuperado.calificacion);
      }else{
        setTitulo("");
        setGenero("");
        setPlataforma("");
        setLanzamiento("");
        setPrecio("");
        setDisponible(true);
        setProgreso(0);
        setFechaLanzamiento("");
        setDescripcion("");
        setCalificacion("");
      }
    }, [videojuegoRecuperado]);

    function validarFormulario() {
  const erroresActivos = {};

  // Validar título
  if (titulo.trim() === "") {
    erroresActivos.titulo = "El título es obligatorio.";
  }

  if (fechaLanzamiento === "") {
    erroresActivos.fechaLanzamiento =
      "Debe seleccionar una fecha de lanzamiento.";
  } else {
    const hoy = new Date().toISOString().split("T")[0];

    if (fechaLanzamiento > hoy) {
      erroresActivos.fechaLanzamiento =
        "La fecha no puede ser posterior a la fecha actual.";
    }
  }

  // Validar descripción
  if (descripcion.trim().length < 10) {
    erroresActivos.descripcion =
      "La descripción debe tener al menos 10 caracteres.";
  }

  // Validar calificación
  if (
    calificacion === "" ||
    Number(calificacion) < 1 ||
    Number(calificacion) > 100
  ) {
    erroresActivos.calificacion =
      "La calificación debe estar entre 1 y 100.";
  }

  // Validar precio
  if (precio === "" || Number(precio) <= 0) {
    erroresActivos.precio =
      "Ingrese un precio válido.";
  }

  return erroresActivos;
}
    
    function manejarGuardar(e){

       e.preventDefault();

        const erroresActivos = validarFormulario();

        if (Object.keys(erroresActivos).length > 0) {
          setErrores(erroresActivos);
          return;
        }

        setErrores({});

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
          fechaLanzamiento,
          descripcion,
          calificacion: Number(calificacion),
       };
       
       onGuardar(videojuego);
       navigate("/");
    }

    function manejarCancelar(){
        navigate("/");
    }

    return(
      <div className="formulario-container">
      <form className="formulario-card" onSubmit={manejarGuardar}>

      <h2>{videojuegoRecuperado ? "Editar Videojuego" : "Nuevo Videojuego"}</h2>

        <label>Titulo</label>
        <input
          className="form-control"
          type="text"
          value={titulo}
          onChange={(e)=> setTitulo(e.target.value)}
          placeholder="Ingrese el titulo del videojuego"
        />

        {errores.titulo && (<span className="error-mensaje">{errores.titulo}</span>)}

        <label>
          Genero  
          <select
            className="form-control"
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
            className="form-control"
            value={plataforma} 
            onChange={(e)=>setPlataforma(e.target.value)}
        > 
            <option value="">Seleccione un plataforma</option>
            <option value="PC">PC</option> 
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="PlayStation 5">PlayStation 5</option>  
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="Xbox">Xbox</option>
          </select>  
        </label>

        <label>Fecha de lanzamiento</label>

        <input
          className="form-control"
          type="date"
          value={fechaLanzamiento}
          onChange={(e)=>setFechaLanzamiento(e.target.value)}
        />

        {errores.fechaLanzamiento && (<span className="error-mensaje">{errores.fechaLanzamiento}</span>)}

        <label>Precio</label>
        <input
          className="form-control"
          type="Number"
          value={precio}
          onChange={(e)=> setPrecio(e.target.value)}
          placeholder="Ej: 51.80"
          min="0"
          step="0.01"
        />

        {errores.precio && (<span className="error-mensaje">{errores.precio}</span>)}

        <label>Sinopsis / Descripción</label>

        <textarea
          className="form-control"
          value={descripcion}
          onChange={(e)=>setDescripcion(e.target.value)}
          placeholder="Escribe una breve descripción del videojuego"
          maxLength="250"
        />

        {errores.descripcion && (<span className="error-mensaje">{errores.descripcion}</span>)}

        <p>
          {descripcion.length}/250 caracteres
        </p>

        <label>Calificación de crítica</label>

        <input
          className="form-control"
          type="number"
          value={calificacion}
          onChange={(e)=>setCalificacion(e.target.value)}
          min="1"
          max="100"
          placeholder="Ejemplo: 95"
        />

        {errores.calificacion && (<span className="error-mensaje">{errores.calificacion}</span>)}

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
          className="form-range"
          type="range"
          min="0"
          max="100"
          value={progreso * 100}
          onChange={(e)=> setProgreso(e.target.value / 100)}
        />
        <div className="botones-formulario">
            <button type="submit">Guardar</button>
            <button type="button" onClick={manejarCancelar}>Cancelar</button>
        </div>
        </form>
      </div> 
       
    );
}

export default FormularioVideojuego