import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class PostDetail extends Component {
    constructor() {
        super();

        this.state = {
            post: {},
            comments: []
        }
    }
    async componentDidMount() {
        const res = await fetch(`http://127.0.0.1:5000/posts/all/${this.props.match.params.id}`)
        const post = await res.json()
        this.setState({post:post})
        
    }
    

    render() {
        const p=this.state.post;
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">
                            {p.title}

                        </h3>
                        <img className="card-img-top img-fluid" src={p.image} alt={p.title} />
                        <p className="card-text">{p.content}</p>
                    </div>
                    <div className="card-footer">
                        <Link to="/">
                            <button className="btn btn-secondary float-end">Back to Home</button>
                        </Link>
                    </div>
                </div>
                {/* {this.state.comments.reverse().map(c => ( <Comment key={p.id} comment={c} /> ))} */}
            </div>
        )
    }
}
