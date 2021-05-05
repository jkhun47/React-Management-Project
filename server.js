const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

// app.get('/api/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// });

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
         res.send(rows);
    }
  )
    // res.send(
      // [{
      //   'id' : 1,
      //   'image' : 'https://placeimg.com/64/64/1',
      //   'name' : '홍길남',
      //   'birthday' : '961222',
      //   'gender' : '남자',
      //   'job' : '대학생'
      // },
      // {
      //   'id' : 2,
      //   'image' : 'https://placeimg.com/64/64/2',
      //   'name' : '홍길민',
      //   'birthday' : '971202',
      //   'gender' : '남자',
      //   'job' : '알바'
      // },
      // {
      //   'id' : 3,
      //   'image' : 'https://placeimg.com/64/64/3',
      //   'name' : '홍길현',
      //   'birthday' : '941222',
      //   'gender' : '남자',
      //   'job' : '회사원'
      // }]
      // );
});

app.use('/image', express.static('./upload'));

app.post('/api/customers' , upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  console.log(name);
  console.log(image);
  console.log(birthday);
  console.log(gender);
  console.log(job);

  let params = [image,name,birthday,gender,job];
  connection.query(sql, params,(err, rows, fields) => {res.send(rows);  console.log(err); console.log(rows);});
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// app.listen(5000, function(){
//     console.log('listening on 5000')
// });