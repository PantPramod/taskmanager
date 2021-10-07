import React from 'react'
import './TaskManager.css'
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Create from './pages/Create';
import View from './pages/View';
import Update from './pages/Update';
import Delete from './pages/Delete';
import Assign from './pages/Assign';
import Change from './pages/Change';

const TaskManager = () => {

    return (
        <div className="taskmanager">
            <div className="taskmanager__header">
                Task Manager
            </div>
            <div className="container">
                <div className="leftsidebar">
                    <ul>
                        <li><NavLink activeClassName="active" to="/create">Create Task</NavLink></li>
                        <li><NavLink to="/assign"> Assign Task</NavLink></li>
                        <li><NavLink to="/update">Update Task</NavLink></li>
                        <li><NavLink to="/delete">Delete Task</NavLink></li>
                        <li><NavLink to="/view">View Task</NavLink></li>
                        <li><NavLink to="/change">Change Priority</NavLink></li>
                    </ul>
                </div>
                <div className="content">

                    <Switch>
                        <Route path="/" exact><Redirect to="/view" /> </Route>
                        <Route path="/create" exact><Create /></Route>
                        <Route path="/assign"><Assign /></Route>
                        <Route path="/update"><Update /></Route>
                        <Route path="/delete"> <Delete /></Route>
                        <Route path="/view"><View /></Route>
                        <Route path="/change"><Change /></Route>
                        <Route path="/*"><Redirect to="/view" /></Route>
                    </Switch>

                </div>
            </div>

        </div>
    )
}

export default TaskManager
