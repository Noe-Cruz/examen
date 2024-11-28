import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import Styles from "../styles/styles";

const Users = () => {

    const[usuarios, setUsuarios] = useState([]);
    const[procesando, setProcesando] = useState(false);
    const[message, setMessage] = useState('');

    const getUsers = () => {

        setUsuarios([]);
        setMessage('');
        setProcesando(true);

        fetch('http://localhost:4000/api/users')
        .then(response => response.json())
        .then(json => {
            setProcesando(false)
            if(json.length >= 0){
                setUsuarios(json);
            } else {
                setMessage("Error al cargar información");
            }
        })
        .catch(error => {
            console.error("Error al consultar el servicio:", error)
        });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
        <div style={Styles.tableResponsive} className="table-responsive">
        <Table responsive="sm" striped bordered>
            <thead>
                <tr>
                    <th style={{ width: "10%" }}>#</th>
                    <th style={{ width: "30%" }}>Nombre</th>
                    <th style={{ width: "30%" }}>Correo</th>
                    <th style={{ width: "30%" }}>RFC</th>
                </tr>
            </thead>
            <tbody>
                {
                usuarios.map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rfc}</td>
                  </tr>  
                ))
                }
            </tbody>
        </Table>
        {
        message && (
        <h6 style={Styles.titleResult}>{message}</h6>
        )
        }
        {
        procesando && (
            <div style={Styles.progresoContainer}>
                <div style={Styles.progreso}>
                    <Spinner animation="border" role="status"/>
                    <p>Cargando Información</p>
                </div>
            </div>
        )
        }
        </div>
        </>
    );
};

export default Users;
