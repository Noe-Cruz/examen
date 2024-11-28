const mysql = require('mysql2/promise')

async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'timbox'
        });
        console.log('Conexión a MySQL establecida');
        return connection
    } catch (error) {
        console.log('Error de conexión a MySQL:',error);
    }
}

module.exports = connect