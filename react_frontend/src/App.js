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
import MyInfo from './view/MyInfo';
import MyPosts from './view/MyPosts';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      current_user_active: false,
      redirect: null,
      username: '',
      password: '',
      email: '',
      id: ''
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  getToken = async () => {
        let res = await fetch('http://localhost:5000/tokens', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(this.state.username + ":" + this.state.password)
          }
        })
        let token = await res.json();
        console.log(token);
        return token;
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
    return data;
  }

  async login(e){
    e.preventDefault();
    console.log('about to post req login');
    let res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"

        },
        body: JSON.stringify({
            "username": e.target.username.value,
            "password": e.target.password.value,
        })
    })
    let userDetails = await res.json();
    // localStorage.setItem("user-info", JSON.stringify(userDetails))
    
    this.setState({
      redirect: "/myinfo",
      username: e.target.username.value,
      password: e.target.password.value,
      email: userDetails.email,
      id: userDetails.id,
      current_user_active: true
    })
    console.log(userDetails);
  }
  async logout(){
    let res = await fetch('http://localhost:5000/auth/logout')
    console.log(res)
    this.setState({
      username: '',
      password: '',
      email: '',
      id: '',
      redirect: null,
      current_user_active: false
    })
  }
  

  render (){
    return (
    <div className="App">
      <Navbar logout={this.logout} current_user_active={this.state.current_user_active}/>
      <Switch>
        <Route exact path="/" render={() => <Home getToken={this.getToken}/>} />
        <Route exact path="/newest" render={() => <Newest getToken={this.getToken }/>} />
        <Route exact path="/popular" render={() => <Popular getToken={this.getToken} />} />
        <Route exact path="/mostunpopular" render={() => <Unpopular getToken={this.getToken} />} />
        <Route exact path="/post/:id" render={({ match }) => <PostDetail match={match} getToken={this.getToken} />} />
        <Route exact path="/login" render={() => <Login redirect={this.state.redirect} login={this.login} getToken={this.getToken}/>} />
        <Route exact path="/register" render={() => <Register/>} />
        <Route exact path="/createpost" render={() => <CreatePost getToken={this.getToken}/>} />
        <Route exact path="/myinfo" render={() => <MyInfo username={this.state.username} email={this.state.email}/>} />
        <Route exact path="/myposts" render={() => <MyPosts />} />
      </Switch>
    </div>
    )
  }
}

