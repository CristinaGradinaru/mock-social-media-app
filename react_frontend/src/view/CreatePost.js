import React, { Component } from 'react'

export default class CreatePost extends Component {
    async createPost(e){
        const token = "MoWkAXkgr/6IdkawwjUdCh0uiLZ41U2P	"
        e.preventDefault();
        console.log('about to create post')
        let res = await fetch('http://localhost:5000/posts/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "title": e.target.title.value,
                "image": e.target.image.value,
                "content": e.target.content.value
            })
        })
        let postDetails = await res.json();
        // this.setState({ redirect: `/posts/${newPost.id}`}) REDIRECT TO MY specific post PAGE
        console.log(postDetails)
    }
    render() {
        return (
            <div>
                <form onSubmit={(e) => this.createPost(e)}>
                    <input type="text" className="form-control" name="title" placeholder="Title" />
                    <input type="text" className="form-control" name="image" placeholder="Image" />
                    <input type="text" className="form-control" name="content" placeholder="Content" />
                    <button type="submit" className="btn btn-outline-info">Submit</button>
                </form>
            </div>
        )
    }
}
