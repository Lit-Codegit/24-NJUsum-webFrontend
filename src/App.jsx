import { useState } from 'react'
import './App.css'
import * as util_request from './request/util.request'

import * as websocket_client from './request/client.websocket'

import Login from './login'
import MainView from './mainview'


import { Routes,Route,Link,Navigate } from 'react-router-dom'
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
        <Link to='/mainview' className=''>游客访问 / 退出登录</Link>
      </div>

      <div>
        <Routes>
          {/* 自动跳转login */}
          <Route path='/' element={<Navigate to='/login' /> } />
          <Route path='/login' element={<Login /> } />
          <Route path='/mainview' element={<MainView /> } />
        </Routes>
      </div>
    </>
    
  )
}

export default App
