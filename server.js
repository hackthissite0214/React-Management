const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//  https://jsonlint.com/ json 확인
app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '이순신',
            'birthday': '940111',
            'gender': '남자',
            'job': '회사원'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '유관순',
            'birthday': '920331',
            'gender': '여자',
            'job': '학생'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '바이브',
            'birthday': '890123',
            'gender': '남자',
            'job': '가수'
        },
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));