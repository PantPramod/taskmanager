import React, { useState, useEffect } from 'react'

const View = () => {
    const [allTasks, setAllTasks] = useState([]);
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://devza.com/tests/tasks/list", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setAllTasks(result.tasks)
            })
            .catch(error => console.log('error', error));
    }, [])
    const sortedTask = allTasks.sort(function (a, b) {

        if (parseInt(a.priority) == parseInt(b.priority)) {
            return (b.due_date) - (a.due_date);
        }
        return parseInt(a.priority) > parseInt(b.priority) ? -1 : 1;

    })
    console.log(sortedTask)
    return (
        <div className="alltasks">
            {sortedTask.map((task, id) => <div className="task" key={task.id}>
                <p className="message">message:{task.message}</p>
                <p className="user">assigned_name:{task.assigned_name}</p>
                <p className="duedate">due_date:{task.due_date}</p>
                <p className="priority">priority:{task.priority}</p>
            </div>)}
        </div>
    )
}

export default View
