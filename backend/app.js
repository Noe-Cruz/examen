const express      = require('express')
const cors         = require('cors')
const apiRouter   = require('./src/routes/api.routes')

const app = express()

app.use(cors());
app.use(express.json())
app.use('/api',apiRouter)

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app