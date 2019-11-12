import React, { Component } from 'react';
import axios from "axios";

import './FullPost.css';

class FullPost extends Component {
    deletePostHandler = () => {
        axios.delete("https://jsonplaceholder.typicode.com/posts/" + this.props.fullPost.id)
            .then(response => {
                console.log(response);
            });
    };

    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;

        if (this.props.fullPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.props.fullPost.title}</h1>
                    <p>{this.props.fullPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        };
        
        return post;
    }
}

export default FullPost;