import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        const c = this.props.comment
        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">{c.content}</p>
                        <h6 className="card-title">by: {c.user}</h6>
                    </div>
                </div>
            </div>
        )
    }
}
