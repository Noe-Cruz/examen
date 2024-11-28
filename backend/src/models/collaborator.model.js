const connect   = require('../db/db')

async function insertColaborador(nombre, email, rfc, domicilioFiscal, curp, noSeguro, 
                      fechaInicio, tipoContrato, departamento, puesto, 
                      salarioDiario, salario, claveEntidad, estadoID) {
    const db = await connect()

    try {
        const[validEmail]  = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email])
        const[validRFC]    = await db.execute('SELECT * FROM usuarios WHERE rfc = ?', [rfc])

        if(validEmail.length === 0 && validRFC.length === 0) {
            const[result] = await db.execute(
                'INSERT INTO colaboradores (nombre, email, rfc, domicilioFiscal, curp, noSeguro, fechaInicio,' + 
                'tipoContrato, departamento, puesto, salarioDiario, salario, claveEntidad, id_estado) ' + 
                'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', 
                [nombre, email, rfc, domicilioFiscal, curp, noSeguro, fechaInicio, tipoContrato, departamento, 
                puesto, salarioDiario, salario, claveEntidad, estadoID]
            )
            if(result.affectedRows === 1){
                return [{ create: true }]
            } else {
                return [{ create: false}]
            }
        } else {
            return [{ create: false, existing: true }]
        }

    } catch (error) {
        console.log('Error de consulta:', error.message)
    } finally {
        db.end()
    }
}

async function updateColaborador(colaboradorID, nombre, email, rfc, domicilioFiscal, curp, noSeguro, 
                      fechaInicio, tipoContrato, departamento, puesto, 
                      salarioDiario, salario, claveEntidad, estadoID) {
    const db = await connect()

    try {
        const[result] = await db.execute(
            'UPDATE colaboradores SET nombre = ?, email = ?, rfc = ?, domicilioFiscal = ?, curp = ?, '+
            'noSeguro = ?, fechaInicio = ?, tipoContrato = ?, departamento = ?, puesto = ?, '+
            'salarioDiario = ?, salario = ?, claveEntidad = ?, id_estado = ? '+
            'WHERE id = ? ', 
            [nombre, email, rfc, domicilioFiscal, curp, noSeguro, fechaInicio, tipoContrato, departamento, 
            puesto, salarioDiario, salario, claveEntidad, estadoID, colaboradorID]
        )
        if(result.affectedRows === 1){
            return [{ update: true }]
        } else {
            return [{ update: false}]
        }
    } catch (error) {
        console.log('Error de consulta:', error.message)
    } finally {
        db.end()
    }
}

async function deleteColaborador(colaboradorID) {
    const db = await connect()

    try {
        const[result] = await db.execute('DELETE FROM colaboradores WHERE id = ?', [colaboradorID])
        if(result.affectedRows === 1){
            return [{ delete: true }]
        } else {
            return [{ delete: false}]
        }
    } catch (error) {
        console.log('Error de consulta:', error.message)
    }
}

async function getColaboradores() {
    const db = await connect()
    
    try {
        const [rows] = await db.execute('SELECT colaboradores.id AS colaboradorID, estados.id AS estadoID, '+
            ' nombre, email, rfc, domicilioFiscal, curp, noSeguro, fechaInicio, tipoContrato, departamento, '+
            ' puesto, salarioDiario, salario, claveEntidad, estado FROM colaboradores '+
            'INNER JOIN estados ON estados.id = colaboradores.id_estado');
        return rows
    } catch (error) {
        console.log('Error de consulta:', error)
    } finally {
        db.end()
    }
}

async function getColaborador(colaboradorID) {
    const db = await connect()
    
    try {
        const [rows] = await db.execute('SELECT colaboradores.id AS colaboradorID, estados.id AS estadoID, '+
            ' nombre, email, rfc, domicilioFiscal, curp, noSeguro, fechaInicio, tipoContrato, departamento, '+
            ' puesto, salarioDiario, salario, claveEntidad, estado FROM colaboradores '+
            ' INNER JOIN estados ON estados.id = colaboradores.id_estado WHERE colaboradores.id = ? ', [colaboradorID]);
        return rows
    } catch (error) {
        console.log('Error de consulta:', error)
    } finally {
        db.end()
    }
}

async function getEstados() {
    const db = await connect()
    
    try {
        const [rows] = await db.execute('SELECT * FROM estados');
        return rows
    } catch (error) {
        console.log('Error de consulta:', error)
    } finally {
        db.end()
    }
}


module.exports = { insertColaborador, updateColaborador, deleteColaborador, getColaboradores, getColaborador, getEstados }