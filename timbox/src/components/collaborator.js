import React, { useEffect, useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import Styles from "../styles/styles";
import UserForm from "./userForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Collaborator = () => {

    const[colaboradores, setColaboradores] = useState([]);
    const[procesando, setProcesando] = useState(false);
    const[message, setMessage] = useState('');
    const[modalShow, setModalShow] = useState(false);
    const[colaborador, setColaborador] = useState([]);

    const getColaboradores = () => {

        setColaboradores([]);
        setMessage('');
        setProcesando(true);

        fetch('http://localhost:4000/api/getcolaboradores', {
        })
        .then(response => response.json())
        .then(json => {
            setProcesando(false)
            if(json.length >= 0){
                setColaboradores(json);
            } else {
                setMessage("Error al cargar información");
            }
        })
        .catch(error => {
            console.error("Error al consultar el servicio:", error)
        });
    }

    const deleteColaborador = (id) => {

        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar?");

        if(confirmacion) {
            setProcesando(true);
            fetch('http://localhost:4000/api/deletecolaborador', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    colaboradorID: id,
                })
            })
            .then(response => response.json())
            .then(json => {
                setProcesando(false)
                if(json[0].delete){
                    getColaboradores();
                    alert("Colaborador eliminado");
                } else{
                    alert("Error al eliminar");
                }
            })
            .catch(error => {
                console.error("Error al consultar el servicio:", error)
            });
        } else {
            alert("Acción cancelada");
        }
    }

    useEffect(() => {
        getColaboradores();
    }, []);

    return(
        <>
        <div className='row'>
            <div className='col-lg-6' style={{textAlign: 'left'}}></div>
            <div className='col-lg-6' style={{textAlign: 'right'}}>
                <Button variant="dark" onClick={() => { 
                    setModalShow(true);
                    setColaborador([]);
                }
                }>Agregar</Button>
                <UserForm 
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    data={colaborador}
                    onSave={getColaboradores}
                />
            </div>
        </div><br />
        <div style={Styles.tableResponsive} className="table-responsive">
        <Table responsive="sm" striped bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>RFC</th>
                    <th>Domicilio Fiscal</th>
                    <th>CURP</th>
                    <th>Número de Seguridad Social</th>
                    <th>Fecha Inicio Laboral</th>
                    <th>Tipo de Contrato</th>
                    <th>Departamento</th>
                    <th>Puesto</th>
                    <th>Salario Diario</th>
                    <th>Salario</th>
                    <th>Clave Entidad</th>
                    <th>Estado</th>
                    <th colSpan={2}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                colaboradores.map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.colaboradorID}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rfc}</td>
                    <td>{usuario.domicilioFiscal}</td>
                    <td>{usuario.curp}</td>
                    <td>{usuario.noSeguro}</td>
                    <td>{new Date(usuario.fechaInicio).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}</td>
                    <td>{usuario.tipoContrato}</td>
                    <td>{usuario.departamento}</td>
                    <td>{usuario.puesto}</td>
                    <td>{usuario.salarioDiario}</td>
                    <td>{usuario.salario}</td>
                    <td>{usuario.claveEntidad}</td>
                    <td>{usuario.estado}</td>
                    <td>
                        <Button variant="light" onClick={() => {
                            setModalShow(true);
                            setColaborador([]);
                            setColaborador(usuario);
                            }}>
                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                        </Button>
                    </td>
                    <td>
                        <Button variant="light" onClick={() => {
                            deleteColaborador(usuario.colaboradorID);
                        }}>
                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                        </Button>
                    </td>
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
                    <p>Guardando Información</p>
                </div>
            </div>
        )
        }
        </div>
        </>
    );
};

export default Collaborator;