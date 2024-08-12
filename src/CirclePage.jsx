import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as axios from 'axios'
import './App.css'

function CirclePage() {
    const { circle_id } = useParams(); // 获取URL参数中的circle_id
    const [posts, setPosts] = useState([]); // 存储帖子列表
    const client = axios.default;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await client.get(`http://localhost:7002/api/circle/${circle_id}`);
                setPosts(response.data); // 获取帖子列表
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [circle_id]); // circle_id变化时重新获取数据

    return (
        <>
            <h1 className="text-2xl font-bold">
                {circle_id} - 兴趣圈
            </h1>
            <div>
                <div className="post-list">
                    <h2>帖子列表</h2>
                    <ul>
                        {posts.map((post, index) => (
                            <li key={index} className="post-item">
                                <div>
                                    <h3>{post.title}</h3>
                                    <p className="post-content">{post.content.substring(0, 10)}...</p> {/* 截断content */}
                                    <p>作者：{post.owner}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default CirclePage;