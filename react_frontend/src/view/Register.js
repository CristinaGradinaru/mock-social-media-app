import React, { Component } from 'react'

export default class Register extends Component {
    async registerUser(e){
        e.preventDefault();
        console.log('about to post req')
        let res = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "email": e.target.email.value,
                "password": e.target.password.value,
                "confirm_password": e.target.confirm_password.value
            })
        })
        let userDetails = await res.json();
        // this.setState({ redirect: `/blog/${newPost.id}`}) REDIRECT TO MY INFO PAGE
        console.log(userDetails)
    }




    render() {
        return (
            <div className="col-sm-8 offset-sm-2">
                <h1>Register here:</h1>
                <form onSubmit={(e) => this.registerUser(e)}>
                    <input type="text" className="form-control" name="username" placeholder="Username" />
                    <br/>
                    <input type="text" className="form-control" name="email" placeholder="Email" />
                    <br/>
                    <input type="password" className="form-control" name="password" placeholder="Password" />
                    <br/>
                    <input type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" />
                    <br/>
                    <button type="submit" className="btn btn-outline-info">Submit</button>
                </form>
            </div>
        )
    }
}
