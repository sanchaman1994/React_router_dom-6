import React from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function Post() {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState(id);

    async function fetchPosts(userId) {
        setLoading(true);
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`);
        setPost(data);
        setLoading(false)
    }
    function onSearch() {
        fetchPosts(searchId);
        setLoading(false);
    }

    useEffect(() => {
        fetchPosts()
    }, [])
    return (
        <>
            <div className="post__search">
                <Link to="/">
                    <button>← Back</button>
                </Link>

                <div className="post__search--container">
                    <label className="post__search--label">Search by Id</label>
                    <input
                        type="number"
                        value={searchId}
                        onChange={(event) => setSearchId(event.target.value)}
                        onKeyDown={(Event) => Event.key === 'Enter' && onSearch()}
                    />
                    <button onClick={() => onSearch()}>Enter</button>
                </div>
            </div>

            {
                loading ? new Array(10).fill(0).map((_, idx) => (
                    <div className="post" key={`skeleton${idx}`}>
                        <div className="post__title">
                            <div className="post__title--skeleton"></div>
                        </div>
                        <div className="post__body">
                            <p className="post__body--skeleton"></p>
                        </div>
                    </div >
                )


                ) :
                    (post.map((post) => (
                        <div key={post.id} className="post">
                            <div className="post__title">{post.title}</div>
                            <p className="post__body">{post.body}</p>
                        </div>
                    )))
            }

        </>
    )
}
