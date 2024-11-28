import React, { useState } from "react";
import Styles from "../styles/styles";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Register = () => {

    const navigate = useNavigate();
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[rfc, setRfc] = useState('');
    const[password, setPassword] = useState('');
    const[reppassword, setReppassword] = useState('');
    const[procesando, setProcesando] = useState(false);
    const[nameError, setNameError] = useState('');
    const[emailError, setEmailError] = useState('');
    const[rfcError, setRfcError] = useState('');
    const[passwordError, setPasswordError] = useState('');
    const[reppasswordError, setReppasswordError] = useState('');
    const[cookies, setCookie, removeCookie] = useCookies([]);
    const[errorMessage, setErrorMessage] = useState(''); 

    const register = (event) => {
        event.preventDefault();
        if(!name) { 
            setNameError('Este campo es requerido');
            return false;
        }else if(!email) { 
            setEmailError('Este campo es requerido');
            return false;
        } else if(!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Ingresa un correo válido');
            return false;
        } else if(!rfc) {
            setRfcError('Este campo es requerido');
            return false;
        } else if(rfc.length < 13) {
            setRfcError('El RFC consta de 13 caracteres');
            return false;
        } else if(!password) {
            setPasswordError('Este campo es requerido');
            return false;
        } else if(password.length < 8) {
            setPasswordError('La contraseña debe de tener al menos 8 caracteres');
            return false;
        } else if(!reppassword) {
            setReppasswordError('Este campo es requerido');
            return false;
        } else if(reppassword.length < 8) {
            setReppasswordError('La contraseña debe de tener al menos 8 caracteres');
            return false;
        } else if(reppassword !== password){
            setReppasswordError('La contraseña no coincide');
            return false;
        }
        
        setProcesando(true);
        
        fetch('http://localhost:4000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                rfc: rfc,
                password: reppassword,
            })
        })
        .then(response => response.json())
        .then(json => {
            setProcesando(false)
            if(json[0].create){
                setCookie('session', email, { path: '/', maxAge: 3600 });
                navigate('/home');
            } else if (json[0].existing){
                setErrorMessage("El correo y/o RFC son existentes, introduca uno diferente");
            }
        })
        .catch(error => {
            console.error("Error en registro:", error)
        });

        return true;
    }

    return (
        <>
        <div style={Styles.container}>
            <br />
            <h1 style={Styles.title}>Registro</h1>
            <form style={Styles.form} onSubmit={register}>
                {
                errorMessage && (
                <div style={Styles.errorContainer}>
                    {errorMessage}
                </div>
                )
                }
                <div style={Styles.inputContainer}>
                    <label htmlFor="Nombre" style={Styles.label}>Nombre Completo:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nombre"
                        style={Styles.input}
                        onChange={(ev) => {
                            setName(ev.target.value); 
                            setNameError('');
                        }}
                        className={`form-control ${nameError ? 'is-invalid' : ''}`}
                    />
                    {
                    nameError && (
                    <div className="invalid-feedback">
                        {nameError}
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
                        onChange={(ev) => {
                            setEmail(ev.target.value);
                            setEmailError('');
                        }}
                        className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    />
                    {
                    emailError && (
                    <div className="invalid-feedback">
                        {emailError}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer}>
                    <label htmlFor="RFC" style={Styles.label}>RFC:</label>
                    <input
                        type="text"
                        id="rfc"
                        placeholder="XXXXXXXXXXXXX"
                        style={Styles.input}
                        onChange={(ev) => {
                            setRfc(ev.target.value);
                            setRfcError('');
                        }}
                        className={`form-control ${rfcError ? 'is-invalid' : ''}`}
                    />
                    {
                    rfcError && (
                    <div className="invalid-feedback">
                        {rfcError}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer} className="form-group">
                    <label htmlFor="password" style={Styles.label}>Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="********"
                        style={Styles.input}
                        onChange={(ev) => {
                            setPassword(ev.target.value);
                            setPasswordError('');
                        }}
                        className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    />
                    {
                    passwordError && (
                    <div className="invalid-feedback">
                        {passwordError}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.inputContainer} className="form-group">
                    <label htmlFor="password" style={Styles.label}>Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="reppassword"
                        placeholder="********"
                        style={Styles.input}
                        onChange={(ev) => {
                            setReppassword(ev.target.value);
                            setReppasswordError('');
                        }}
                        className={`form-control ${reppasswordError ? 'is-invalid' : ''}`}
                    />
                    {
                    reppasswordError && (
                    <div className="invalid-feedback">
                        {reppasswordError}
                    </div>
                    )
                    }
                </div>
                <div style={Styles.buttonContainer}>
                    <button type="submit" style={Styles.button}>Registrarme</button>
                </div>
            </form>
        </div><br />
        {
        procesando && (
            <div style={Styles.progresoContainer}>
                <div style={Styles.progreso}>
                    <Spinner animation="border" role="status"/>
                    <p>Registrando Usuario</p>
                </div>
            </div>
        )
        }
        </>
    );
};

export default Register;