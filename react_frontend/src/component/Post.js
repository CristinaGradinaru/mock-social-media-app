import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

export default class Post extends Component {
    render() {
        const p = this.props.post;
        return (
            <div>
                <div className="container w-50 justify-content-center text-center">
                <h3>{p.title}</h3>
                <div className="container justify-content-center position-relative">
                    <Link to={`/post/${p.id}`}>
                        <img className="w-100" src={p.image} alt={p.title}/>
                        <small className="position-absolute text-light bottom-0 end-0 me-3">{moment(p.date_created).fromNow()}</small>
                    </Link>
                    
                </div>
                <h6>{p.content}</h6>
                <button className="btn btn-sm btn-outline-success d-inline m-3">Upvote</button>
                <button className="btn btn-sm btn-outline-danger d-inline m-3">Downvote</button>
            </div>
            </div>
        )
    }
}
