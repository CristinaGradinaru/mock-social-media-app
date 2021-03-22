import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment';

export default class Post extends Component {
    constructor(props) {
        super(props);
    const p = this.props.post
        this.state = {
            redirect: null,
            upvote_count: p.upvote_count,
            downvote_count: p.downvote_count
        }
      }
    async upvote(id) {
        let res = await fetch('http://localhost:5000/posts/upvote/' + id)
        let data = await res.json();
        this.setState({ upvote_count: data })
    }
    async downvote(id) {
        let res = await fetch('http://localhost:5000/posts/downvote/' + id)
        let data = await res.json();
        console.log(data)
        this.setState({ downvote_count: data })
    }
    async comment(e, post_id){
        e.preventDefault();
        let token = await this.props.getToken();
        let res = await fetch('http://localhost:5000/posts/comment/' + post_id, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token['token']
                
            },
            body: JSON.stringify({
                "content": e.target.content.value
            })
        })
        let newComment = await res.json();
        console.log(newComment)
        this.setState({ redirect: `/post/${post_id}`})
        // this.setState({ redirect: `/posts/${newPost.id}`})
        // console.log(this.state.redirect)
    }
    

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
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
                <button onClick={()=>this.upvote(p.id)} className="btn btn-sm btn-outline-success d-inline m-3">Upvote : {this.state.upvote_count}</button> 
                <button onClick={()=>this.downvote(p.id)} className="btn btn-sm btn-outline-danger d-inline m-3">Downvote : {this.state.downvote_count}</button>
                {/* <button className="btn btn-sm btn-outline-info d-inline m-3">Leave a Comment</button> */}



                <div className='faq-dropdown'>
                    <p>
                        <a className="dropdown-qs space-between" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                        <button className="btn btn-sm btn-outline-info d-inline m-3">Leave a Comment</button>
                        </a>
                    </p>
                    <div className="row">
                        <div className="col">
                            <div className="collapse multi-collapse" id="multiCollapseExample1">
                            <form onSubmit={(e) => this.comment(e, p.id)}>
                                
                                <textarea type="text" className="form-control" name="content" placeholder="Leave a comment" />
                                <br/>
                                <button type="submit" className="btn btn-outline-info">Submit Your Comment</button>
                            </form>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div>

                </div>

                </div>
            </div>
            
        )
    }
}
