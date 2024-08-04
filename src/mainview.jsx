import React from 'react';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import { useState,useEffect } from 'react'
import * as axios from 'axios'


function MainView() {
    const authToken = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const [circles, setCircles] = useState([]);
    const client = axios.default;

    useEffect(() => {
    const fetchCircles = async () => {
        // 使用axios发起GET请求获取circle数据
        const response = client.get('http://localhost:7002/api/circles')
            .then((response) => {
            // 更新组件状态以包含新获取的circle数据
                setCircles(response.data);
                console.log(response.data);
            })
            .catch((error) => {

                console.error('Error fetching circles:', error);
        });
        }
        // 在组件挂载时立即执行副作用函数
        fetchCircles();
    }, []); // 空数组--只在组件挂载时执行一次副作用函数
            
        

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Welcome to Main View!
            </h1>
            {
                authToken ? (
                    <div>
                        <p>你好，{username}!</p>
                        <button><Link to="/createcircle">新建兴趣圈</Link></button>
                    </div>
                ) : (
                    <>
                        <p>
                            以游客方式登录
                        </p>
                            <button><Link to="/login">登录</Link></button>
                    </>
                )
            }
            <div>
                <h1>Circles</h1>
                <ul>
                    {circles.map((circle, index) => (
                        <li key={index}>
                            <h2>{circle.circle_name}</h2>
                            <p>Icon Name: {circle.icon_name}</p>
                            <p>Active Users:</p>
                            <ul>
                                {circle.active_users.map((user, idx) => (
                                    <li key={idx}>
                                        <p>Name: {user.name}, Points: {user.point}</p>
                                    </li>
                                ))}
                            </ul>
                            <p>Number of Posts: {circle.posts_cnt}</p>
                        </li>
                    ))}
                </ul>
            </div>
            
            
        </>
    );
}

export default MainView;