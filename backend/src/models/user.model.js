const connect   = require('../db/db')
const crypto    = require('crypto')

async function autentication(email, password) {
    const db = await connect()
    const passEncrypted = encriptarMD5(password)

    try {
        const[result] = await db.execute(
            'SELECT nombre, email, rfc  FROM  usuarios WHERE email = ? AND contrasenia LIKE BINARY ?', 
            [email, passEncrypted]
        )
        if(result.length == 1){
            return result
        } else {
            return [{ email: false}]
        }
    } catch (error) {
        console.log('Error de consulta:', error.message)
    } finally {
        db.end()
    }
}

async function register(name, email, rfc, password) {
    const db = await connect()
    const passEncrypted = encriptarMD5(password)

    try {
        const[validEmail]  = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email])
        const[validRFC]    = await db.execute('SELECT * FROM usuarios WHERE rfc = ?', [rfc])

        if(validEmail.length === 0 && validRFC.length === 0) {
            const[result] = await db.execute(
                'INSERT INTO usuarios (nombre, email, rfc, contrasenia) VALUES (?, ?, ?, ?) ', 
                [name, email, rfc, passEncrypted]
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

async function recoverpassword(email, rfc, password) {
    const db = await connect()
    const passEncrypted = encriptarMD5(password)

    try {
        const[result] = await db.execute(
            'UPDATE usuarios SET contrasenia = ? WHERE email = ? AND rfc = ?', 
            [passEncrypted, email, rfc]
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

async function getAllUsers() {
    const db = await connect()
    
    try {
        const [rows] = await db.execute('SELECT id, nombre, email, rfc FROM usuarios');
        return rows
    } catch (error) {
        console.log('Error de consulta:', error)
    } finally {
        db.end()
    }
}

//Encriptar en MD5
function encriptarMD5(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

module.exports = { autentication, register, recoverpassword, getAllUsers }