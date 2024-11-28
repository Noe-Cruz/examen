const { insertColaborador, updateColaborador, deleteColaborador, getColaboradores, getColaborador, getEstados } = require('../models/collaborator.model')
const { autentication, register, recoverpassword, getAllUsers } = require ('../models/user.model')
const express    = require('express')
const apiRouter = express.Router()

/**Usuarios */
//Autenticación
apiRouter.route('/authentication').post( async (req, res) => {
    const { email, password } = req.body

    try {
        const resp = await autentication(email, password)
        res.status(200).json(resp)
    } catch (error) {
        console.error('authentication', error)
        res.status(500).json({error: 'Error de autenticacion'})
    }
})

//Register
apiRouter.route('/register').post( async (req, res) => {
    const { name, email, rfc, password } = req.body

    try {
        const resp = await register(name, email, rfc, password)
        res.status(200).json(resp)
    } catch (error) {
        console.error('register', error)
        res.status(500).json({error: 'Error de registro'})
    }
})

//Recover Password
apiRouter.route('/recoverpassword').post( async (req, res) => {
    const { email, rfc, password } = req.body

    try {
        const resp = await recoverpassword(email, rfc, password)
        res.status(200).json(resp)
    } catch (error) {
        console.error('recoverpassword', error)
        res.status(500).json({error: 'Error al recuperar contrasenia'})
    }
})

//READ all users
apiRouter.route('/users').get( async (req, res) => {
    try {
        const resp = await getAllUsers()
        res.status(200).json(resp)
    } catch (error) {
        console.error('users', error)
        res.status(500).json({error: 'Error al obtener los usuarios'})
    } 
})

/**Colaboradores */
apiRouter.route('/insertcolaborador').post( async(req, res) => {
    const{nombre, email, rfc, domicilioFiscal, curp, noSeguro, 
        fechaInicio, tipoContrato, departamento, puesto, 
        salarioDiario, salario, claveEntidad, estadoID} = req.body

    try {
        const resp = await insertColaborador(nombre, email, rfc, domicilioFiscal, curp, noSeguro, 
                                             fechaInicio, tipoContrato, departamento, puesto, 
                                             salarioDiario, salario, claveEntidad, estadoID)
        res.status(200).json(resp)
    } catch (error) {
        console.error('insertColaborador', error)
        res.status(500).json({error: 'Error al insertar colaboradores'})
    }
})

apiRouter.route('/updatecolaborador').put( async(req, res) => {
    const{colaboradorID, nombre, email, rfc, domicilioFiscal, curp, noSeguro, 
        fechaInicio, tipoContrato, departamento, puesto, 
        salarioDiario, salario, claveEntidad, estadoID} = req.body

    try {
        const resp = await updateColaborador(colaboradorID, nombre, email, rfc, domicilioFiscal, curp, noSeguro, 
                                             fechaInicio, tipoContrato, departamento, puesto, 
                                             salarioDiario, salario, claveEntidad, estadoID)
        res.status(200).json(resp)
    } catch (error) {
        console.error('updateColaborador', error)
        res.status(500).json({error: 'Error al actualizar colaboradores'})
    }
})

apiRouter.route('/deletecolaborador').delete( async(req, res) => {
    const{ colaboradorID } = req.body

    try {
        const resp = await deleteColaborador(colaboradorID)
        res.status(200).json(resp)
    } catch (error) {
        console.error('deleteColaborador', error)
        res.status(500).json({error: 'Error al eliminar colaboradores'})
    }
})

apiRouter.route('/getcolaboradores').get( async(req, res) => {
    try {
        const resp = await getColaboradores()
        res.status(200).json(resp)
    } catch (error) {
        console.error('getColaboradores', error)
        res.status(500).json({error: 'Error al obtener colaboradores'})
    }
})

apiRouter.route('/getcolaborador').post( async(req, res) => {
    const { colaboradorID } = req.body

    try {
        const resp = await getColaborador(colaboradorID)
        res.status(200).json(resp)
    } catch (error) {
        console.error('getColaborador', error)
        res.status(500).json({error: 'Error al obtener colaborador'})
    }
})

apiRouter.route('/getestados').get( async(req, res) => {
    try {
        const resp = await getEstados()
        res.status(200).json(resp)
    } catch (error) {
        console.error('getEstados', error)
        res.status(500).json({error: 'Error al obtener estados'})
    }
})

module.exports = apiRouter