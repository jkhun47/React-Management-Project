import Customer from './components/Customer';
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

// const customers = [{
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

class App extends Component {
state = {
  customers: ""
}

componentDidMount(){
  this.callApi()
  .then(res => this.setState({customers: res}))
  .catch(err => console.log(err));
}

callApi = async() => {
  const response = await fetch('/api/customers');
  const body = await response.json();
  return body;
}

  render(){
    const { classes } = this.props;
    return (
      // <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
          this.state.customers ? this.state.customers.map(c => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
              );
            })
           : ""}
        </TableBody>
      </Table>
      </Paper>
      // </div>
    // <div>
    //   <Customer
    //   id={customers[0].id}
    //   image={customers[0].image}
    //   name={customers[0].name}
    //   birthday={customers[0].birthday}
    //   gender={customers[0].gender}
    //   job={customers[0].job}
    // />
    //   <Customer
    //   id={customers[1].id}
    //   image={customers[1].image}
    //   name={customers[1].name}
    //   birthday={customers[1].birthday}
    //   gender={customers[1].gender}
    //   job={customers[1].job}
    // />
    //   <Customer
    //   id={customers[2].id}
    //   image={customers[2].image}
    //   name={customers[2].name}
    //   birthday={customers[2].birthday}
    //   gender={customers[2].gender}
    //   job={customers[2].job}
    // /> 
    // </div>

    );
  }
}

// function App() {
//   return (
//     <Customer
//       id={customers[0].id}
//       image={customers[0].image}
//       name={customers[0].name}
//       birthday={customers[0].birthday}
//       gender={customers[0].gender}
//       job={customers[0].job}
//     />
//     <Customer
//       id={customers[1].id}
//       image={customers[1].image}
//       name={customers[1].name}
//       birthday={customers[1].birthday}
//       gender={customers[1].gender}
//       job={customers[1].job}
//     />
//     // <Customer
//     //   id={customers[2].id}
//     //   image={customers[2].image}
//     //   name={customers[2].name}
//     //   birthday={customers[2].birthday}
//     //   gender={customers[2].gender}
//     //   job={customers[2].job}
//     // />
//   );
// }

// export default App;
export default withStyles(styles)(App);
