const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// });

app.get('/api/customers', (req, res) => {
    res.send([{
        'id' : 1,
        'image' : 'https://placeimg.com/64/64/1',
        'name' : '홍길남',
        'birthday' : '961222',
        'gender' : '남자',
        'job' : '대학생'
      },
      {
        'id' : 2,
        'image' : 'https://placeimg.com/64/64/2',
        'name' : '홍길민',
        'birthday' : '971202',
        'gender' : '남자',
        'job' : '알바'
      },
      {
        'id' : 3,
        'image' : 'https://placeimg.com/64/64/3',
        'name' : '홍길현',
        'birthday' : '941222',
        'gender' : '남자',
        'job' : '회사원'
      }]
      );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// app.listen(5000, function(){
//     console.log('listening on 5000')
// });