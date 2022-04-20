import { useState } from "react";
import { Link } from "react-router-dom";

function PostList() {

    const [posts, setPosts] = useState([]);
    const [sorts, setSorts] = useState([
        { key: "id", val: 0 },
        { key: "title", val: 0 },
        { key: "body", val: 0 },
        { key: "created_at", val: 0 },
        { key: "updated_at", val: 0 }
    ]);

    window.onload = () => {
        fetch("http://localhost/taroko/getPost.php", {
            crossDomain: true,
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(results => {
            setPosts(results);
        });
    }

    function deleteBlog(id) {
        if (window.confirm("Are you sure to delete this post?\nThis action can not be undone.")) {
            setPosts([...posts].filter(post => post.id !== id));
        }
    }

    function sorting(sortBy) {
        const sortedPosts = [...posts];
        const newSorts = [...sorts];
        let descending = 0;

        newSorts.map((sort) => {
            
            if (sort.key === sortBy) {
                if (sort.val === 0) {
                    descending = 1;
                    sort.val = 1;
                }
                else {
                    descending = sort.val * -1;
                    sort.val = sort.val * -1;
                }
            }
            else {
                sort.val = 0;
            }

            return sort;
        });

        setSorts(newSorts);

        if (descending === -1) {

            sortedPosts.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return -1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return 1;
                }
                return 0;
            });
        }
        else {

            sortedPosts.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return -1;
                }
                return 0;
            });
        }

        setPosts(sortedPosts);
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Action</th>
                    <th onClick={() => sorting('title')}>Title</th>
                    <th onClick={() => sorting('body')}>Content</th>
                    <th onClick={() => sorting('created_at')}>Post Date</th>
                    <th onClick={() => sorting('created_at')}>Last Modified Date</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, index) => (
                    <tr key={post.id}>
                        <td>
                            <Link to={"/post/" + post.id} className="btn btn-sm btn-primary mr-2">View</Link>
                            <Link to={"/post/" + post.id + "/edit"} className="btn btn-sm btn-success mr-2">Edit</Link>
                            <button className="btn btn-sm btn-danger mr-2" onClick={() => deleteBlog(post.id)}>Delete</button>
                        </td>
                        <td>
                            <Link to={"/post/" + post.id}>
                                {post.title}
                            </Link>
                        </td>
                        <td>{post.body}</td>
                        <th>{post.created_at}</th>
                        <th>{post.updated_at}</th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PostList;
