import React, { useState } from "react";
import Styles from "../styles/styles";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Login = () => {

    const navigate = useNavigate();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[procesando, setProcesando] = useState(false);
    const[errorMessage, setErrorMessage] = useState(''); 
    const[emailError, setEmailError] = useState('');
    const[passwordError, setPasswordError] = useState('');
    const[cookies, setCookie, removeCookie] = useCookies([]);

    const login = (event) => {
        event.preventDefault();
        if(!email) { 
            setEmailError('Este campo es requerido');
            return false;
        } else if(!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Ingresa un correo válido');
            return false;
        } else if(!password) {
            setPasswordError('Este campo es requerido');
            return false;
        } else if(password.length < 8) {
            setPasswordError('La contraseña debe de tener al menos 8 caracteres');
            return false;
        }

        setProcesando(true);

        fetch('http://localhost:4000/api/authentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then(response => response.json())
        .then(json => {
            setProcesando(false)
            if(json[0].email === email){
                setCookie('session', email, { path: '/', maxAge: 3600 });
                navigate('/home');
            } else {
                setErrorMessage("Usuario o Contraseña no válidos");
            }
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error)
        });

        return true;
    }

    const register = () => {
        navigate('/register');
    }

    return (
        <>
        <div style={Styles.container}>
            <h1 style={Styles.title}>Iniciar Sesión</h1>
            <form style={Styles.form} onSubmit={login}>
                {
                errorMessage && (
                <div style={Styles.errorContainer}>
                    {errorMessage}
                </div>
                )
                }
                <br />
                <div style={Styles.inputContainer}>
                    <label htmlFor="email" style={Styles.label}>Correo Electrónico:</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="correo@ejemplo.com"
                        style={Styles.input}
                        onChange={(ev) => setEmail(ev.target.value)}
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
                <div style={Styles.inputContainer} className="form-group">
                    <label htmlFor="password" style={Styles.label}>Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="********"
                        style={Styles.input}
                        onChange={(ev) => setPassword(ev.target.value)}
                        className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    />
                    {
                    passwordError && (
                    <div className="invalid-feedback">
                        {passwordError}
                    </div>
                    )
                    }
                </div><br />
                <div style={Styles.buttonContainer}>
                    <button type="submit" style={Styles.button}>Iniciar Sesión</button>
                </div><br />
            </form>
            <div style={Styles.form}>
                <div style={Styles.buttonContainer}>
                    <button type="button" style={Styles.button} onClick={register}>Registrate</button>
                </div>
                <div style={Styles.contraseniaContainer}>
                    <a href="/recoverpassword" style={Styles.acontrasenia}>¿Has olvidado tu contraseña?</a>
                </div>
            </div>
        </div>
        {
        procesando && (
            <div style={Styles.progresoContainer}>
                <div style={Styles.progreso}>
                    <Spinner animation="border" role="status"/>
                    <p>Validando Usuario</p>
                </div>
            </div>
        )
        }
        </>
    );
};

export default Login;