import React, { useEffect, useState } from "react";
import Styles from "../styles/styles";

const Estado = (props) => {

  const[estados, setEstados] = useState([]);
  const[error, setError] = useState('');

  const getEstados = () => {
    fetch('http://localhost:4000/api/getestados')
      .then(response => response.json())
      .then(json => {
        if (json.length >= 0) {
          setEstados(json);
        }
      })
      .catch(error => {
        console.error("Error al consultar el servicio:", error);
      });
  };

  useEffect(() => {
    getEstados();
  }, []);

  return (
    <div style={Styles.inputContainer}>
      <label htmlFor="Estado" style={Styles.label}>
        Estado:
      </label>
      <select
        id="Estado"
        value={props.estado}
        style={Styles.input} 
        onChange={(e) => e.target.value === "0" ?
            setError('Seleccione un estado') :
            ( 
            setError(''),
            props.onChange(e.target.value)
            )
        } 
        className={error ? 'is-invalid' : ''}
      >
        <option value="0">
          Selecciona un estado
        </option>
        {estados.map((estado) => (
          <option key={estado.id} value={estado.id}>
            {estado.estado}
          </option>
        ))}
      </select>
      {
      error && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default Estado;
