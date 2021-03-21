import React, { Component } from 'react'


export default class MyPosts extends Component {


    // here will map the posts filtered_by current_user.id 

    render() {
        return (
            <div className="justify-content-center">
                {/* <Link to="/createpost"><button className="btn btn-secondary">Create a Post</button></Link>
                {this.state.posts.map(p => ( <Post key={p.id} post={p} /> ))} */}
            </div>
        )
    }
}
