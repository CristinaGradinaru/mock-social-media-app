import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class MyPosts extends Component {
    constructor(){
        super();
        this.state={
            posts:[]
        }
    }

    // async componentDidMount() {
    //     // const res = await fetch('http://localhost:5000/myposts/userid')  this will fetch info from posts filtered by current userID
    //     const posts = await res.json()
    //     this.setState({posts:posts})
    // }

    render() {
        return (
            <div className="justify-content-center">
                {/* <Link to="/createpost"><button className="btn btn-secondary">Create a Post</button></Link>
                {this.state.posts.map(p => ( <Post key={p.id} post={p} /> ))} */}
                <Link to="/myposts/update/<int:post_id>"><button>Update</button></Link> 
            </div>
        )
    }
}
