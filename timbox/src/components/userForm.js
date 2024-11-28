import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import Styles from "../styles/styles";
import Estado from "./estados";

const UserForm = (props) => {

    const[colaborador, setColaborador] = useState({
        colaboradorID: "",
        nombre: "",
        email: "",
        rfc: "",
        domicilioFiscal: "",
        curp: "",
        noSeguro: "",
        fechaInicio: "",
        tipoContrato: "",
        departamento: "",
        puesto: "",
        salarioDiario: "",
        salario: "",
        claveEntidad: "",
        estadoID: "",
    });
    const[errorForm, setErrorForm] = useState({
        nombre: "",
        email: "",
        rfc: "",
        domicilioFiscal: "",
        curp: "",
        noSeguro: "",
        fechaInicio: "",
        tipoContrato: "",
        departamento: "",
        puesto: "",
        salarioDiario: "",
        salario: "",
        claveEntidad: "",
    });
    const[procesando, setProcesando] = useState(false);

    const saveChange = () => {
        if (!colaborador.nombre) { 
            setErrorForm({ ...errorForm, nombre: "Este campo es requerido" });
            return false;
        } else if (!colaborador.email) { 
            setErrorForm({ ...errorForm, email: "Este campo es requerido" });
            return false;
        } else if (!/\S+@\S+\.\S+/.test(colaborador.email)) {
            setErrorForm({ ...errorForm, email: "Ingresa un correo válido" });
            return false;
        } else if (!colaborador.rfc) {
            setErrorForm({ ...errorForm, rfc: "Este campo es requerido" });
            return false;
        } else if (colaborador.rfc.length < 13 || colaborador.rfc.length > 13) {
            setErrorForm({ ...errorForm, rfc: "El RFC consta de 13 caracteres" });
            return false;
        } else if (!colaborador.domicilioFiscal) {
            setErrorForm({ ...errorForm, domicilioFiscal: "Este campo es requerido" });
            return false;
        } else if (!colaborador.curp) {
            setErrorForm({ ...errorForm, curp: "Este campo es requerido" });
            return false;
        } else if (colaborador.curp.length < 18 || colaborador.curp.length > 18) {
            setErrorForm({ ...errorForm, curp: "La CURP consta de 18 caracteres" });
            return false;
        } else if (!colaborador.noSeguro) {
            setErrorForm({ ...errorForm, noSeguro: "Este campo es requerido" });
            return false;
        } else if (isNaN(colaborador.noSeguro)) {
            setErrorForm({ ...errorForm, noSeguro: "El Número de Seguridad Social debe ser numérico" });
            return false;
        } else if (!colaborador.fechaInicio) {
            setErrorForm({ ...errorForm, fechaInicio: "Este campo es requerido" });
            return false;
        } else if (!colaborador.tipoContrato) {
            setErrorForm({ ...errorForm, tipoContrato: "Este campo es requerido" });
            return false;
        } else if (!colaborador.departamento) {
            setErrorForm({ ...errorForm, departamento: "Este campo es requerido" });
            return false;
        } else if (!colaborador.puesto) {
            setErrorForm({ ...errorForm, puesto: "Este campo es requerido" });
            return false;
        } else if (!colaborador.salarioDiario) {
            setErrorForm({ ...errorForm, salarioDiario: "Este campo es requerido" });
            return false;
        } else if (isNaN(colaborador.salarioDiario)) {
            setErrorForm({ ...errorForm, salarioDiario: "El salario debe ser un valor numérico" });
            return false;
        } else if (parseFloat(colaborador.salarioDiario) <= 0) {
            setErrorForm({ ...errorForm, salarioDiario: "El salario diario debe ser mayor a 0" });
            return false;
        } else if (!colaborador.salario) {
            setErrorForm({ ...errorForm, salario: "Este campo es requerido" });
            return false;
        } else if (isNaN(colaborador.salario)) {
            setErrorForm({ ...errorForm, salario: "El salario debe ser un valor numérico" });
            return false;
        } else if (parseFloat(colaborador.salario) <= 0) {
            setErrorForm({ ...errorForm, salario: "El salario debe ser mayor a 0" });
            return false;
        } else if (!colaborador.claveEntidad) {
            setErrorForm({ ...errorForm, claveEntidad: "Este campo es requerido" });
            return false;
        } else if (!colaborador.estadoID) {
            setErrorForm({ ...errorForm, estadoID: "Este campo es requerido" });
            return false;
        } else if (colaborador.estadoID === "0") {
            return false;
        } 

        setProcesando(true);
        
        fetch('http://localhost:4000/api/' + ( colaborador.colaboradorID ? 
                'updatecolaborador' : 
                'insertcolaborador' ), {
            method: colaborador.colaboradorID ? 'PUT' : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(colaborador)
        })
        .then(response => response.json())
        .then(json => {
            setProcesando(false)
            if(json[0].create || json[0].update){
                props.onHide();
                props.onSave();
                alert("Colaborador registrado");
            } else{
                alert("Error al guardar cambios");
            }
        })
        .catch(error => {
            console.error("Error al guardar cambios:", error)
        });

        return true;
    };
    

    useEffect(() => {
        setColaborador(props.data);
        setErrorForm({
            nombre: "",
            email: "",
            rfc: "",
            domicilioFiscal: "",
            curp: "",
            noSeguro: "",
            fechaInicio: "",
            tipoContrato: "",
            departamento: "",
            puesto: "",
            salarioDiario: "",
            salario: "",
            claveEntidad: "",
        });
    },[props.data])

    return(
        <>
        <Modal
            show={props.show} 
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Alta de Colaborador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={Styles.formModal}>
            <div style={Styles.inputContainer}>
                    <label htmlFor="Nombre" style={Styles.label}>Nombre Completo:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nombre"
                        style={Styles.input}
                        value={colaborador.nombre || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, nombre: ev.target.value });
                            setErrorForm({ ...errorForm, nombre: "" });
                        }}
                        className={`form-control ${errorForm.nombre ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.nombre && (
                    <div className="invalid-feedback">
                        {errorForm.nombre}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="email" style={Styles.label}>Correo Electrónico:</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="correo@ejemplo.com"
                        style={Styles.input}
                        value={colaborador.email || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, email: ev.target.value });
                            setErrorForm({ ...errorForm, email: "" });
                        }}
                        className={`form-control ${errorForm.email ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.email && (
                    <div className="invalid-feedback">
                        {errorForm.email}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="RFC" style={Styles.label}>RFC:</label>
                    <input
                        type="text"
                        id="rfc"
                        placeholder="RFC"
                        style={Styles.input}
                        value={colaborador.rfc || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, rfc: ev.target.value });
                            setErrorForm({ ...errorForm, rfc: "" });
                        }}
                        className={`form-control ${errorForm.rfc ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.rfc && (
                    <div className="invalid-feedback">
                        {errorForm.rfc}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="Domicilio Fiscal" style={Styles.label}>Domicilio Fiscal:</label>
                    <input
                        type="text"
                        id="domicilioFiscal"
                        placeholder="Domicilio Fiscal"
                        style={Styles.input}
                        value={colaborador.domicilioFiscal || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, domicilioFiscal: ev.target.value });
                            setErrorForm({ ...errorForm, domicilioFiscal: "" });
                        }}
                        className={`form-control ${errorForm.domicilioFiscal ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.domicilioFiscal && (
                    <div className="invalid-feedback">
                        {errorForm.domicilioFiscal}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="CURP" style={Styles.label}>CURP:</label>
                    <input
                        type="text"
                        id="curp"
                        placeholder="CURP"
                        style={Styles.input}
                        value={colaborador.curp || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, curp: ev.target.value });
                            setErrorForm({ ...errorForm, curp: "" });
                        }}
                        className={`form-control ${errorForm.curp ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.curp && (
                    <div className="invalid-feedback">
                        {errorForm.curp}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="Número de Seguridad Social" style={Styles.label}>Número de Seguridad Social:</label>
                    <input
                        type="text"
                        id="noSeguro"
                        placeholder="Número de Seguridad Social"
                        style={Styles.input}
                        value={colaborador.noSeguro || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, noSeguro: ev.target.value });
                            setErrorForm({ ...errorForm, noSeguro: "" });
                        }}
                        className={`form-control ${errorForm.noSeguro ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.noSeguro && (
                    <div className="invalid-feedback">
                        {errorForm.noSeguro}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="Fecha Inicio Laboral" style={Styles.label}>Fecha Inicio Laboral:</label>
                    <input
                        type="date"
                        id="fechaInicio"
                        placeholder="Fecha Inicio Laboral"
                        style={Styles.input}
                        value={
                            colaborador.fechaInicio
                                ? new Date(colaborador.fechaInicio).toISOString().split('T')[0] 
                                : ""
                        }
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, fechaInicio: ev.target.value });
                            setErrorForm({ ...errorForm, fechaInicio: "" });
                        }}
                        className={`form-control ${errorForm.fechaInicio ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.fechaInicio && (
                    <div className="invalid-feedback">
                        {errorForm.fechaInicio}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="Tipo de Contrato" style={Styles.label}>Tipo de Contrato:</label>
                    <input
                        type="text"
                        id="tipoContrato"
                        placeholder="Tipo de Contrato"
                        style={Styles.input}
                        value={colaborador.tipoContrato || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, tipoContrato: ev.target.value });
                            setErrorForm({ ...errorForm, tipoContrato: "" });
                        }}
                        className={`form-control ${errorForm.tipoContrato ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.tipoContrato && (
                    <div className="invalid-feedback">
                        {errorForm.tipoContrato}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="Departamento" style={Styles.label}>Departamento:</label>
                    <input
                        type="text"
                        id="departamento"
                        placeholder="Departamento"
                        style={Styles.input}
                        value={colaborador.departamento || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, departamento: ev.target.value });
                            setErrorForm({ ...errorForm, departamento: "" });
                        }}
                        className={`form-control ${errorForm.departamento ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.departamento && (
                    <div className="invalid-feedback">
                        {errorForm.departamento}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="Puesto" style={Styles.label}>Puesto:</label>
                    <input
                        type="text"
                        id="puesto"
                        placeholder="Puesto"
                        style={Styles.input}
                        value={colaborador.puesto || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, puesto: ev.target.value });
                            setErrorForm({ ...errorForm, puesto: "" });
                        }}
                        className={`form-control ${errorForm.puesto ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.puesto && (
                    <div className="invalid-feedback">
                        {errorForm.puesto}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="Salario Diario" style={Styles.label}>Salario Diario:</label>
                    <input
                        type="text"
                        id="salarioDiario"
                        placeholder="Salario Diario"
                        style={Styles.input}
                        value={colaborador.salarioDiario || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, salarioDiario: ev.target.value });
                            setErrorForm({ ...errorForm, salarioDiario: "" });
                        }}
                        className={`form-control ${errorForm.salarioDiario ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.salarioDiario && (
                    <div className="invalid-feedback">
                        {errorForm.salarioDiario}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="Salario" style={Styles.label}>Salario:</label>
                    <input
                        type="text"
                        id="salario"
                        placeholder="Salario"
                        style={Styles.input}
                        value={colaborador.salario || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, salario: ev.target.value });
                            setErrorForm({ ...errorForm, salario: "" });
                        }}
                        className={`form-control ${errorForm.salario ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.salario && (
                    <div className="invalid-feedback">
                        {errorForm.salario}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="Clave Entidad" style={Styles.label}>Clave Entidad:</label>
                    <input
                        type="text"
                        id="claveEntidad"
                        placeholder="Clave Entidad"
                        style={Styles.input}
                        value={colaborador.claveEntidad || ""}
                        onChange={(ev) => {
                            setColaborador({ ...colaborador, claveEntidad: ev.target.value });
                            setErrorForm({ ...errorForm, claveEntidad: "" });
                        }}
                        className={`form-control ${errorForm.claveEntidad ? 'is-invalid' : ''}`}
                    />
                    {
                    errorForm.claveEntidad && (
                    <div className="invalid-feedback">
                        {errorForm.claveEntidad}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <Estado 
                     estado={colaborador.estadoID}
                     onChange={(id) => setColaborador({ ...colaborador, estadoID: parseInt(id) })}
                    />
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={saveChange}>Guardar</Button>
                <Button variant="secondary" onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
        {
            procesando && (
                <div style={Styles.progresoContainer}>
                    <div style={Styles.progreso}>
                        <Spinner animation="border" role="status"/>
                        <p>Guardando Cambios</p>
                    </div>
                </div>
            )
        }
        </>
    );
};

export default UserForm;