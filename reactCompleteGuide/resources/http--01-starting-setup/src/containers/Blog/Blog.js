import React, { Component } from 'react';
import axios from "axios";
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        fullPost: null
    };

    componentDidMount() {
        const postsPromise = axios.get("https://jsonplaceholder.typicode.com/posts");

        postsPromise
            .then(response => {
                const postsSlice = response.data.slice(0, 10);
                postsSlice.forEach(post => post.author = "Dan Fitz");

                this.setState({
                    posts: postsSlice
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    fullPostHandler = id => {
        this.setState(prevState => {
            console.log(prevState);
            return {
                fullPost: prevState.posts.find(post => post.id === id)
            };
        });
    };

    render() {
        const postsJSX = this.state.posts.map((post, index) => (
            <Post
                key={post.id}
                title={post.title}
                author={post.author}
                selectPost={() => this.fullPostHandler(post.id)}
            />
        ));

        return (
            <div>
                <section className="Posts">
                    {postsJSX.length ? postsJSX : "No posts..."}
                </section>
                <section>
                    <FullPost
                        fullPost={this.state.fullPost}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;