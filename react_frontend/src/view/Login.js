import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    


    // getToken = async (e) => {
    //     e.preventDefault();
    //     let res = await fetch('http://localhost:5000/tokens', {
    //       method: 'POST',
    //       headers: {
    //         'Authorization': 'Basic ' + btoa(e.target.username.value + ":" + e.target.password.value)
    //       }
    //     })
    //     let token = await res.json();
    //     console.log(token);
    //     this.setState({ redirect: `/`})
    //     // console.log(this.state.redirect)
    //     return token;
    //   }

    render() {
        if (this.props.redirect) {
            return <Redirect to={this.props.redirect} />
        }
        return (
            <div className="col-sm-6 offset-sm-3">
                <form onSubmit={(e) => this.props.login(e)}>
                    <h1>Login:</h1>
                    <input type="text" className="form-control" name="username" placeholder="Username" />
                    <br/>
                    <input type="password" className="form-control" name="password" placeholder="Password" />
                    <br/>
                    <button type="submit" className="btn btn-outline-info">Submit</button>
                </form>
            </div>
        )
    }
}
