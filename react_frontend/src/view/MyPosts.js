import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Post from '../component/Post';


export default class MyPosts extends Component {
    constructor(){
        super();
        this.state={
            posts:[]
        }
    }

    async componentDidMount() {
        const res = await fetch(`http://localhost:5000/posts/myposts/${this.props.id}`)
        const posts = await res.json()
        this.setState({posts:posts})
    }

    render() {
        return (
            <div className="justify-content-center">
                {/* <Link to="/createpost"><button className="btn btn-secondary">Create a Post</button></Link> */}
                {this.state.posts.map(p => ( <Post getToken={this.props.getToken} key={p.id} post={p} /> ))}
                <Link to="/myposts/update/<int:user_id>"><button>Update</button></Link> 
            </div>
        )
    }
}
