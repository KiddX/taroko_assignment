import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Post() {

    const params = useParams();
    const [post, setPost] = useState([]);

    window.onload = () => {
        fetch("http://localhost/taroko/getPost.php?id=" + params.id, {
            crossDomain: true,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(results => {

                if (results && results.length > 0) {
                    setPost(results[0]);
                }
            });
    }

    return (
        <div>
            <Link to={"/post/" + post.id + "/edit"} className="btn btn-sm btn-success">Edit</Link>
            <div className="h2">{post.title}</div>
            <p>{post.body}</p>
        </div>
    );
}

export default Post;
