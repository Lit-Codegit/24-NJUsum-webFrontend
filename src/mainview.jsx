import React from 'react';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
import * as axios from 'axios'
function MainView() {

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Welcome to Main View!
            </h1>
            <button><Link to="/createcircle">新建兴趣圈</Link></button>
            <button><Link to="/login">登录</Link></button>
            
        </>
    );
}

export default MainView;