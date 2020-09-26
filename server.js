const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');
const config = JSON.parse(data);
const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database    
});
conn.connect();

//  https://jsonlint.com/ json 확인
app.get('/api/customers', (req, res) => {
    const sql = "SELECT * FROM CUSTOMER";
    conn.query(sql, (err, rows, fields) => {
        res.send(rows);    
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));