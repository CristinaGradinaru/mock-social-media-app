import React, { Component } from 'react'
import Post from '../component/Post';

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        }
    }
    async componentDidMount() {
        const res = await fetch('http://localhost:5000/posts/all')
        const posts = await res.json()
        this.setState({posts:posts})
    }
    render() {
        return (
            <div className="justify-content-center">
                {/* <Link to="/createpost"><button className="btn btn-secondary">Create a Post</button></Link> */}
                {this.state.posts.map(p => ( <Post key={p.id} post={p} /> ))}
            </div>
        )
    }
}
