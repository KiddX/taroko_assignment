import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PostList from './pages/PostList';
import EditPost from './pages/EditPost';
import Post from './pages/Post';

export default function Roots() {

    const routes = [
        { path: '/', name: 'Home', Component: PostList, exact: true },
        { path: '/post', name: 'Blog', Component: PostList, exact: true },
        { path: '/post/:id', name: 'Post', Component: Post, exact: true },
        { path: '/post/:id/edit', name: 'EditPost', Component: EditPost, exact: true },
    ];

    return (

        <Router>
            <div className="container">
                <Switch>
                    {routes.map(({ path, Component, exact }) => (
                        <Route key={path} path={path} exact={exact}>
                            <Component />
                        </Route>
                    ))}
                </Switch>
            </div>
        </Router>
        
    );
}