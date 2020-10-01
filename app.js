const express = require('express');
const app = express();

app.get('/', (reque, res) => {
    res.send('Hola mundo')
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
     console.log('si estoy funcionando')
})

