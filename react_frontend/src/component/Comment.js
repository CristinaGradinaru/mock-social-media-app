import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        const c = this.props.comment
        return (
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">User id : {c.user_id}</h5>
                        <p className="card-text">{c.content}</p>
                    </div>
                </div>
            </div>
        )
    }
}
