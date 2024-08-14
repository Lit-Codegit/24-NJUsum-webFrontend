import { useState } from 'react'
import './App.css'
import * as util_request from './request/util.request'

import * as websocket_client from './request/client.websocket'

import Login from './login'
import MainView from './mainview'
import CreatePage from './CreateCircle'
import CirclePage from './CirclePage'
import CreatePost from './CreatePage'
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import PostPage from './PostPage'

// 这里不知为何不能用{Login}

function App() {
  const [title, setTitle] = useState("");

  util_request.getTitle().then(result => {
    console.log(title)
    setTitle(result);
  })

  return (
    <>
      <h1 className="text-3xl italic font-light ">
        Hello Isekai!
      </h1>
      <br />
      <hr />
      <div>
        <Link to='/mainview' className='' onClick={() => {
          localStorage.clear();
          setTitle('');  // 纯纯是为了更新渲染
        }}>游客访问 / 退出登录</Link>

        {/* Tips: 在React使用onClick事件处理器时，需要确保事件处理器是一个函数，而不是直接调用一个函数。 */}
      </div>

      <div>
        <Routes>
          {/* 自动跳转login */}
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mainview' element={<MainView />} />
          <Route path='/createcircle' element={<CreatePage />} />
          <Route path='/circle/:circle_id' element={<CirclePage />} />
          <Route path='/circle/:circle_id/:post_id' element={<PostPage /> } />
          <Route path='/circle/:circle_id/create_post' element={<CreatePost />} />

        </Routes>
      </div>
    </>

  )
}

export default App
