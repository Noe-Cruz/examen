import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Offcanvas, Nav, Button, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "../styles/styles";
import Users from "../components/users";
import Files from "../components/files";
import Employee from "../components/employee";
import Collaborator from "../components/collaborator";
import Services from "../components/services";

const Home = () => {
    const navigate = useNavigate();
    const[cookies, setCookie, removeCookie] = useCookies(['session']);
    const[show, setShow] = useState(false);
    const[page, setPage] = useState('user');

    const menuClose = () => setShow(false);
    const menuShow = () => setShow(true);

    const logout = () => {
        removeCookie('session', { path: '/', expires: new Date(0) });
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }

    useEffect(() => {
        // Verificación de sesión activa
        if (!cookies.session) {
            navigate('/');
        }
    }, [cookies, navigate]);

    return (
        <>
        <div>
        <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <Button variant="dark" onClick={menuShow} className="p-0 me-4">
                <FontAwesomeIcon icon="fa-solid fa-bars"/>
                </Button>
                <span className="ms-1">TIMBOX</span>
            </div>
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon="fa-solid fa-user" className="me-2" />
                <NavDropdown title={cookies.session}>
                    <NavDropdown.Item>
                        <button type="button" onClick={logout} style={Styles.buttonLogout}>
                            Cerrar Sesión
                        </button>
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </header>

        <Offcanvas show={show} onHide={menuClose} placement="start">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Nav className="flex-column">
                <NavDropdown.Item className="d-flex align-items-center mb-2" onClick={() => {
                                                                            setPage('files'); 
                                                                            menuClose();
                                                                            }}>
                    <FontAwesomeIcon icon="fa-solid fa-file" />&nbsp;&nbsp;
                    Gestión de Archivos
                </NavDropdown.Item>
                <NavDropdown.Item className="d-flex align-items-center mb-2" onClick={() => {
                                                                            setPage('collaborator');
                                                                            menuClose();
                                                                            }}>
                    <FontAwesomeIcon icon="fa-solid fa-user" />&nbsp;&nbsp;
                    Colaboradores
                </NavDropdown.Item>
                <NavDropdown.Item className="d-flex align-items-center mb-2" onClick={() => {
                                                                            setPage('employee');
                                                                            menuClose();
                                                                            }}>
                    <FontAwesomeIcon icon="fa-solid fa-user" />&nbsp;&nbsp;
                    Empleados
                </NavDropdown.Item>
                <NavDropdown.Item className="d-flex align-items-center mb-2" onClick={() => {
                                                                            setPage('services');
                                                                            menuClose();
                                                                            }}>
                    <FontAwesomeIcon icon="fa-solid fa-newspaper" />&nbsp;&nbsp;
                    Servicios
                </NavDropdown.Item>
            </Nav>
            </Offcanvas.Body>
        </Offcanvas>

        <div className="container">
            <div className="row">
            <div className="col">
                {
                (() => {
                    switch (page) {
                        case "user":
                            return( <><h2 className="mt-5">Lista de Usuarios</h2><br /><Users /></> );
                        case "files":
                            return( <><h2 className="mt-5">Gestión de Archivos</h2><br /><Files /></> );
                        case "employee":
                            return( <><h2 className="mt-5">Empleados</h2><br /><Employee /></> );
                        case "collaborator":
                            return( <><h2 className="mt-5">Colaboradores</h2><br /><Collaborator /></> );
                        case "services":
                            return( <><h2 className="mt-5">Servicios</h2><br /><Services /></> );
                        default:
                            return <h2 className="mt-5">Página no encontrada</h2>;
                    }
                })()
                }
            </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default Home;