import React, { Component } from 'react'
import Post from '../component/Post';

export default class Newest extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        }
    }
    async componentDidMount() {
        const res = await fetch('http://localhost:5000/posts/newest')
        const posts = await res.json()
        this.setState({posts:posts})
    }
    render() {
        return (
            <div className="justify-content-center">
                {/* <Link to="/createpost"><button className="btn btn-secondary">Create a Post</button></Link> */}
                {this.state.posts.reverse().map(p => ( <Post getToken={this.props.getToken} key={p.id} post={p} /> ))}
            </div>
        )
    }
}
