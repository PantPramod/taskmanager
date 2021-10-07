import React, { useState, useEffect, useRef } from 'react'

const Change = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [flag, setFlag] = useState(false);
    const [displayList, setDisplayList] = useState(true)
    const priorityRef = useRef('');

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
                setAllTasks(result.tasks);

            })
            .catch(error => console.log('error', error));
    }, [flag])
    const edit = (message, priority, user, duedate, id) => {


        localStorage.setItem('id', id);
        localStorage.setItem('message', message);
        localStorage.setItem('priority', priority);
        localStorage.setItem('user', user);
        localStorage.setItem('duedate', duedate);

        setDisplayList(false);
    }
    const update = (i) => {
        i.preventDefault();
        const message = localStorage.getItem('message');
        const priority = localStorage.getItem('priority');
        const user = localStorage.getItem('user');
        const duedate = localStorage.getItem('duedate');
        const id = localStorage.getItem('id');
        var myHeaders = new Headers();
        myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

        var formdata = new FormData();
        formdata.append("message", message);
        formdata.append("due_date", duedate);
        formdata.append("priority", priorityRef.current.value);
        formdata.append("assigned_to", user);
        formdata.append("taskid", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://devza.com/tests/tasks/update", requestOptions)
            .then(response => response.text())
            .then(result => { console.log(result); setFlag(!flag); setDisplayList(true) })
            .catch(error => console.log('error', error));
    }
    const sortedTask = allTasks.sort(function (a, b) {

        if (parseInt(a.priority) == parseInt(b.priority)) {
            return (b.due_date) - (a.due_date);
        }
        return parseInt(a.priority) > parseInt(b.priority) ? -1 : 1;

    })
    return (
        <div>
            <div className="alltasks" style={!displayList ? { display: "none" } : { display: "block" }}>
                {sortedTask.map((task, id) => <div className="task" key={task.id}>
                    <p className="message">{task.message}</p>
                    <p className="user">assigned_name:{task.assigned_name}</p>
                    <p className="duedate">due_date:{task.due_date}</p>
                    <p className="priority">priority:{task.priority}</p>
                    <button className="edit" onClick={() => edit(task.message, task.priority, task.assigned_name, task.due_date, task.id)}>Change Priority</button></div>)}
            </div>
            <form className="create_form" style={displayList ? { display: "none" } : { display: "block" }} onSubmit={update}>

                <div className="input">
                    <label>Priority</label>
                    <input ref={priorityRef} type="number" placeholder="Priority" />
                </div>

                <button type="submit" className="create">Set Priority</button>

            </form>

        </div>
    )
}

export default Change;
