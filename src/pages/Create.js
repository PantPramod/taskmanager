import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './Create.css';
const Create = () => {
    const history = useHistory();
    const [allUser, setAllUser] = useState([]);
    const messageRef = useRef('');
    const duedateRef = useRef('');
    const duetimeRef = useRef('');
    const priorityRef = useRef('');
    const userRef = useRef('');

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

    const submitHandler = (e) => {
        e.preventDefault();
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

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://devza.com/tests/tasks/create", requestOptions)
            .then(response => response.json())
            .then(result => { console.log(result); history.push('/view') })
            .catch(error => console.log('error', error));

    }
    const show = () => {

    }
    return (
        <div>
            <form className="create_form" onSubmit={submitHandler}>
                <div className="input">
                    <label>Message</label>
                    <textarea ref={messageRef} placeholder="Enter Your Message"></textarea>
                </div>
                <div className="input">
                    <label>Due Date</label>
                    <input className="date" ref={duedateRef} type="date" placeholder="duedate" />
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
                <button type="submit" className="create">Create</button>

            </form>
        </div>
    )
}

export default Create
