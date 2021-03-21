import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class MyInfo extends Component {
    constructor(){
        super();
        this.state={
        }
    }

    // Grabs current_user info from login page mounts component and displays json data in here


    render() {
        return (
            <div className="col-sm-6 offset-sm-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">My info:</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Username: </li>
                    <li className="list-group-item">E-mail: </li>
                </ul>
                <div className="card-body">
                    <Link to="/myposts"><button className="btn btn-sm btn-outline-info d-inline m-1">My Posts</button></Link>
                    <Link to="/"><button className="btn btn-sm btn-info d-inline m-1">All Posts</button></Link>
                </div>
            </div>
            </div>
        )
    }
}
