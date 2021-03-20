import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './view/Login';
import Register from './view/Register';


export default class App extends Component {
  constructor() {
    super();

    this.setState = {
      token: '',

    }
  }
  // async componentDidMount() {
  //   const token = await this.getToken();
  //   this.setState({token:token})
  // }
  // getToken = async (e) => {
  //   e.preventDefault();
  //   let res = await fetch('http://localhost:5000/tokens', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': 'Basic ' + btoa(e.target.username.value + ":" + e.target.password.value)
  //     }
  //   })
  //   let token = await res.json();
  //   console.log(token);
  //   this.setState({ redirect: `/auth/myinfo`})
  //   console.log(this.state.redirect)
  //   return token;
  // }

  render (){
    return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/login" render={() => <Login getToken={this.getToken}/>} />
        <Route exact path="/register" render={() => <Register/>} />
      </Switch>
    </div>
    )
  }
}

