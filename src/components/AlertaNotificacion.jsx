import { useEffect } from "react";
import "./AlertaNotificacion.css";

function AlertaNotificacion({ mensaje, onCerrar }) {

  /*Hook que controla el tiempo de visualización de la notificación.*/
  useEffect(() => {

    // Crea un temporizador para cerrar automáticamente la alerta.
    const temporizador = setTimeout(() => {
      onCerrar();
    }, 3000);

    return () => clearTimeout(temporizador);
  }, [onCerrar]);

  return (
    <div className="toast-notificacion">
      ✅ {mensaje}
    </div>
  );
}

export default AlertaNotificacion;