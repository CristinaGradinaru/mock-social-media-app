import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            test: 1
        }
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Home</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/newest">Newest</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/popular">Popular</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/mostunpopular">Most Unpopular</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            {this.state.test === 1 ?
                                (
                                    <li className="nav-item dropdown">
                                        <p className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown link
                                        </p>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><Link className="dropdown-item" to="/createpost">Create Post</Link></li>
                                            <li><Link className="dropdown-item" to="/myinfo">My Info</Link></li>
                                            <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                        </ul>
                                    </li>

                                ) : (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Login</Link>
                                    </li>
                                )
                            }
                            
                        </ul>
                        </div>
                    </div>
                    </nav>
            </div>
        )
    }
}
