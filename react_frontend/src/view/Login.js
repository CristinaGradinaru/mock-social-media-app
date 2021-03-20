import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            redirect: null
        }
    }
    // async login(e){
    //     e.preventDefault();
    //     console.log('about to post req login')
    //     let res = await fetch('http://localhost:5000/auth/login', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             "username": e.target.username.value,
    //             "password": e.target.password.value
    //         })
    //     })
    //     let userDetails = await res.json();
    //     // this.setState({ redirect: `/blog/${newPost.id}`}) REDIRECT TO MY INFO PAGE
    //     console.log(userDetails)
    // }


    getToken = async (e) => {
        e.preventDefault();
        let res = await fetch('http://localhost:5000/tokens', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(e.target.username.value + ":" + e.target.password.value)
          }
        })
        let token = await res.json();
        console.log(token);
        this.setState({ redirect: `/`})
        // console.log(this.state.redirect)
        return token;
      }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <form onSubmit={(e) => this.getToken(e)}>
                    <input type="text" className="form-control" name="username" placeholder="Username" />
                    <input type="text" className="form-control" name="password" placeholder="Password" />
                    <button type="submit" className="btn btn-outline-info">Submit</button>
                </form>
            </div>
        )
    }
}
