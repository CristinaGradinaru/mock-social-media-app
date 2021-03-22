import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

export default class Post extends Component {
    constructor(props) {
        super(props);
    const p = this.props.post
        this.state = {
          upvote_count: p.upvote_count,
          downvote_count: p.downvote_count
        }
      }
    async upvote(id) {
        let res = await fetch('http://localhost:5000/upvote/' + id)
        let data = await res.json();
        this.setState({upvote_count: data.upvote_count })
    }
    async downvote(id) {
        let res = await fetch('http://localhost:5000/downvote/' + id)
        let data = await res.json();
        this.setState({downvote_count: data.downvote_count })
    }

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
                <button onClick={()=>this.upvote(p.id)} className="btn btn-sm btn-outline-success d-inline m-3">Upvote : {p.upvote_count}</button> 
                <button onClick={()=>this.downvote(p.id)} className="btn btn-sm btn-outline-danger d-inline m-3">Downvote : {this.state.downvote_count}</button>
            </div>
            </div>
        )
    }
}
