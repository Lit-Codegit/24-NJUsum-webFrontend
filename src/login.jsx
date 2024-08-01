import { useState } from 'react'
import './App.css'
import * as axios from 'axios'



function Login() {
    const [passwd, setPasswd] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState('');
    // 创建个对象
    const client = axios.default;
    const base = "http://127.0.0.1:7002/login"

    const handleSubmit = async (e) => {
        console.log('in handle')
        e.preventDefault();

        client.post(base, {
            username: username,
            passwd: passwd
        })
            .then((response) => {
                response.data;
                console.log(response.data);
                
                if (response.data.success) {
                    const token = true;
                    // 存储token，通常可以存储在localStorage或sessionStorage中
                    localStorage.setItem('authToken', token);
                    history.push('/mainview');
                } else {
                    alert('登录失败!')
                }
            })
            .catch((error) => {
                console.log(error)
            });
        
        // TODO: 在原界面上浮显示异常
}

    // console.log('ready')
    return (
        <div>
            <div>
                <img src="/site_welcome.png" className="logo" alt="logo" />
            </div>
                
            <div>
                <span className='idol-message'>これからも、アイドルへ{' '}
                    <span style={{ color: '#f34e6c' }}>!</span>
                    <span style={{ color: '#2582c8' }}>!</span>
                    <span style={{ color: '#fec20a' }}>!</span>
                    <span style={{ color: '#8dbafe' }}>!</span>
                    <span style={{ color: '#13be94' }}>!</span>
                </span>
                <br />
                <hr />
                <hr />
                <hr />
                <br />
            </div>

            <form onSubmit={handleSubmit
                // 提交到后端,默认会直接写一个query不安全
            }>
                <label className='font-light'>账号:{' '}</label>
                <input type='username' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                <label className='font-light'>密码:{' '}</label>
                <input type='password' placeholder='Password' autoComplete="off" value={passwd} onChange={e => setPasswd(e.target.value)} />
                
                <br />
                <br />

                <div>
                    <button type='submit'>登录</button>
                </div>
            </form>
        </div>
    )
    
}



export default Login