import React, { useState } from "react";
import { useParams } from "react-router-dom";

function EditPost() {

    const params = useParams();
    const [post, setPost] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');

    window.onload = () => {
        fetch("http://localhost/taroko/getPost.php?id=" + params.id, {
            crossDomain: true,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(results => {

                if (results && results.length > 0) {
                    setPost(results[0]);
                    setNewTitle(results[0].title);
                    setNewBody(results[0].body);
                }
            });
    }

    function updateTitle(event) {
        setNewTitle(event.target.value);
    }

    function updateBody(event) {
        setNewBody(event.target.value);
    }

    function savePost(event) {

        event.preventDefault();

        if (!newTitle || newTitle.trim().length === 0) {
            return;
        }

        if (!newBody || newBody.trim().length === 0) {
            return;
        }

        post.title = newTitle;
        post.body = newBody;
        
        setPost(post);

        fetch("http://localhost/taroko/editPost.php", {
            method: 'POST',
            crossDomain: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        })
        .then(response => response.json())
        .then(results => {

            if (results && results.affected_count > 0) {
                alert("Edit successful.");
            }
            else {
                alert("Edit error.");
            }
        })
        .catch(error => {
            alert("Edit error.");
        });
    }

    return (
        <div>
            <div className="form-row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="title" placeholder="Write your blog title here..."
                            defaultValue={post.title} onBlur={ updateTitle } />
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" id="content" rows="8" placeholder="Write whatever you want here..."
                            defaultValue={post.body} onBlur={ updateBody } ></textarea>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <button type="button" className="btn btn-primary" onClick={ savePost }>Save</button>
                </div>
            </div>
        </div>
    );
}

export default EditPost;
