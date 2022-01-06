import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: "" } }; //사용자 입력 저장 오브젝트
  }

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
          <Grid xs={11} item style={{ padding: 16 }}>
            <TextField placeholder="Add Todo here" fullWidth />
          </Grid>
          <Grid xs={1} md={1} item>
            <Button fullWidth color="secondary" variant="outlined">
              +
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;
