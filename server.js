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

//  파일 처리를 위한 모듈
const multer = require('multer');
const upload = multer({dest: './upload'});


//  https://jsonlint.com/ json 확인
app.get('/api/customers', (req, res) => {
    const sql = "SELECT * FROM CUSTOMER WHERE isDeleted = 0";
    conn.query(sql, (err, rows, fields) => {
        res.send(rows);    
    });
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
    let image = '/image/' + req.file.filename;
    let name = req.body.username;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
})

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    }) 
})

app.listen(port, () => console.log(`Listening on port ${port}`));