import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import CustomerDelete from './components/CustomerDelete';
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
    // marginTop: theme.spacing(3),
    // overflowX: "auto"
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  // table: {
  //   minWidth: 1080
  // },
  paper: {
    marginLeft: 18,
    marginRIght: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
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

constructor(props){
  super(props);
  this.state = {
    customers: '',
    completed: 0
  }
}

stateRefresh = () => {
  this.setState({
    customer: '',
    completed: 0
  });
  this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
} 

// state = {
//   customers: "",
//   completed: 0
// }

componentDidMount(){
  this.timer = setInterval(this.progress, 20);
  this.callApi()
  .then(res => this.setState({customers: res}))
  .catch(err => console.log(err));
}

callApi = async() => {
  const response = await fetch('/api/customers');
  const body = await response.json();
  return body;
}

progress = () => {
  const { completed } = this.state;
  this.setState({ completed: completed >= 100 ? 0 : completed + 1});
}

  render(){
    const { classes } = this.props;
    const cellList = ["번호","프로필 이미지","이름","생년월일","성별","설정"];
    return (
      // <div>
      <div className={classes.root}>
        {/* <Paper className={classes.root}> */}
        <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {/* Material-UI */}
            고객 관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              // placeholder="Search…"
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
        {/* <Paper> */}
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
                {/* <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
            {
            this.state.customers ? this.state.customers.map(c => {
              return (
                <Customer
                  stateRefresh={this.stateRefresh}
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
                );
              }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress classname={classes.progress} variant="determinate" value={this.state.completed}/>                
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
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
