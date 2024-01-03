
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const [user, setUsaer] = useState([]);
    const Navigate = useNavigate();
    useEffect(() => {
        async function fetchUser() {
            const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsaer(data);
        }
        fetchUser();
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="user-list">
                    {
                        user.map((user) => (
                            <div className="user" onClick={() => Navigate(`/${user.id}`)} key={user.id}>
                                <div className="user-card">
                                    <div className="user-card__container">
                                        <h3>{user.name}</h3>
                                        <p><b>Email:</b> {user.email}</p>
                                        <p><b>Phone:</b> {user.phone}</p>
                                        <p>
                                            <b>Website:</b>
                                            {user.website}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
