import React, { useContext, useState } from 'react';
import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Settings() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false)

    const {user, dispatch} = useContext(Context);

    const handleSubmit =  async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username, 
            email, 
            password,
        };

        try {
            const res = await axios.put('/api/users/'+user._id, updatedUser);
            setSuccess(true);
            dispatch({type:"UPDATE_SUCCESS", payload: res.data })
        } catch (err) {
            console.log(err)
            dispatch({ type: "UPDATE_FAILURE"})
        }
    }

//============================================
    return (
        <div className='settings'>
            <Sidebar /> 
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form action="" className="settingsForm" onSubmit={ handleSubmit }>
                    
                    <label>Username</label>
                    <input type='text' placeholder={user.username} onChange={e=>setUsername(e.target.value)} />

                    <label>Email</label>
                    <input type='email' placeholder={user.email} onChange={e=>setEmail(e.target.value)} />

                    <label>Password</label>
                    <input type='password' onChange={e=>setPassword(e.target.value)} />

                    <button className="settingsSubmit" type='submit'>Update</button>
                    {success && <span className='success'>Profile has been updated!</span>}
                </form>
            </div>
        </div>
    )
}
