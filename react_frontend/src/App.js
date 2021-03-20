import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import CreatePost from './view/CreatePost';
import Home from './view/Home';
import Login from './view/Login';
import Newest from './view/Newest';
import Popular from './view/Popular';
import Unpopular from './view/Unpopular';
import Register from './view/Register';
import PostDetail from './view/PostDetail';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      current_user: null,
      username: '',
      password: '',
      data: ''

    }
  }
  async componentDidMount() {
    let data = await this.getCurrentUser();
    this.setState({ data: data })
    console.log(this.state.data)
    // const res = await fetch('http://localhost:5000/auth/login')
  }
  getCurrentUser = async () => {
    let res = await fetch('http://localhost:5000/auth/login', {
      method: 'GET'
      // headers: {
      //   'Authorization': 'Basic ' + btoa(e.target.username.value + ":" + e.target.password.value)
      // }
    })
    let data = await res.json();
    console.log(data);
    this.setState({ data: data })
    return data;
  }

  render (){
    return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/" render={() => <Home getToken={this.getToken }/>} />
        <Route exact path="/newest" render={() => <Newest getToken={this.getToken }/>} />
        <Route exact path="/popular" render={() => <Popular />} />
        <Route exact path="/mostunpopular" render={() => <Unpopular />} />
        <Route exact path="/post/:id" render={({ match }) => <PostDetail match={match} />} />
        <Route exact path="/login" render={() => <Login getToken={this.getToken}/>} />
        <Route exact path="/register" render={() => <Register/>} />
        <Route exact path="/createpost" render={() => <CreatePost />} />
      </Switch>
    </div>
    )
  }
}

