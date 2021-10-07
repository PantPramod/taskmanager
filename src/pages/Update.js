import React, { useState, useEffect, useRef } from 'react'

const Update = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [flag, setFlag] = useState(false);
    const [displayList, setDisplayList] = useState(true)
    const messageRef = useRef('');
    const duedateRef = useRef('');
    const duetimeRef = useRef('');
    const priorityRef = useRef('');
    const userRef = useRef('');
    const [taskId, setTaskId] = useState('');
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://devza.com/tests/tasks/listusers", requestOptions)
            .then(response => response.json())
            .then(result => { console.log(result); setAllUser(result.users) })
            .catch(error => console.log('error', error));
    }, [])

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
    const edit = (message, priority, user, id) => {
        messageRef.current.value = message;
        priorityRef.current.value = priority;
        userRef.current.value = user;
        duedateRef.current.value = "";
        duetimeRef.current.value = "";

        setTaskId(id);
        setDisplayList(false);
    }
    const update = (i) => {
        i.preventDefault();
        const message = messageRef.current.value;
        const priority = priorityRef.current.value;
        const user = userRef.current.value;
        const duedate = duedateRef.current.value;
        const duetime = duetimeRef.current.value;
        var myHeaders = new Headers();
        myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

        var formdata = new FormData();
        formdata.append("message", message);
        formdata.append("due_date", `${duedate} ${duetime}:00`);
        formdata.append("priority", priority);
        formdata.append("assigned_to", user);
        formdata.append("taskid", taskId);

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
                    <button className="edit" onClick={() => edit(task.message, task.priority, task.assigned_name, task.id)}>Edit</button></div>)}
            </div>
            <form className="create_form" style={displayList ? { display: "none" } : { display: "block" }} onSubmit={update}>
                <div className="input">
                    <label>Message</label>
                    <textarea ref={messageRef} placeholder="Enter Your Message"></textarea>
                </div>
                <div className="input">
                    <label>Due Date</label>
                    <input ref={duedateRef} type="date" placeholder="duedate" />
                </div>
                <div className="input">
                    <label>Due Time</label>
                    <input ref={duetimeRef} type="time" placeholder="duetime" />
                </div>
                <div className="input">
                    <label>Priority</label>
                    <input ref={priorityRef} type="number" placeholder="Priority" />
                </div>
                <div className="input">
                    <label>User</label>
                    <select ref={userRef}>
                        {
                            allUser.map((user, id) => <option key={user.id} value={user.id}>{user.name}</option>)
                        }
                    </select>
                </div>
                <button type="submit" className="create">Update</button>

            </form>

        </div>
    )
}

export default Update;
