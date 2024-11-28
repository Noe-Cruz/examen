const app       = require('./app')

//Inicialización del servidor
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('Servidor en puerto: '+port)
})
