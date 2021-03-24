import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comment from '../component/Comment';


export default class PostDetail extends Component {
    constructor() {
        super();

        this.state = {
            post: {},
            comments: []
        }
    }
    async componentDidMount() {
        const res_post = await fetch(`http://127.0.0.1:5000/posts/all/${this.props.match.params.id}`)
        const post = await res_post.json()
        await this.getComments()

        this.setState({
            post:post
            // comments: comments
        })
        // this.setState({comments:comments})\
    }
    async getComments() {
        const res_comment = await fetch(`http://127.0.0.1:5000/posts/comments/${this.props.match.params.id}`)
        const comments = await res_comment.json()
        console.log(comments)

        this.setState({
            comments: comments
        })
        // this.setState({comments:comments})\
    }
    
    

    render() {
        const p=this.state.post;
        const c=this.state.comments;
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
                {this.state.comments.reverse().map(c => ( <Comment key={p.id} comment={c} /> ))}
            </div>
        )
    }
}
