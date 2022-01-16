import React from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo.js";
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import "./App.css";
import { call, signout } from "./service/api-Service";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render() {
    let loginStatus = localStorage.getItem("ACCESS_TOKEN").includes(null, "")
      ? "로그인"
      : "로그아웃";
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                {loginStatus}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    //로딩중이 아닐때 랜더링
    var todoListPage = (
      <div>
        {navigationBar} {/* 네비게이션 바 랜더링*/}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    let loadingPage = <h1>로딩중....</h1>;
    let content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }
    // 3. props로 넘겨주기
    return <div className="App">{content}</div>;
  }
}

export default App;
