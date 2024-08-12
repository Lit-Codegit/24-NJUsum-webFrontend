// 创建帖子的页面


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as axios from 'axios';

function CreatePost() {
    const navigate = useNavigate();
    const { circle_id } = useParams(); // circle_id参数

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesPaths, setImagesPaths] = useState([]);

    const client = axios.default;
    const base = "http://127.0.0.1:7002/createpost";

    useEffect(() => {
        // 确保circle_id存在
        if (!circle_id) {
            alert("无效的兴趣圈ID");
            navigate('/'); // 重定向到首页
        }
    }, [circle_id, navigate]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            setSelectedImages([...e.target.files]);
            // 设置图片路径
            setImagesPaths(e.target.files.map(file => `http://127.0.0.1:7002/circles_pub/${circle_id}/${file.name}`));
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        if (title && content && selectedImages.length > 0) {
            const formData = new FormData();
            formData.append('circle_id', circle_id);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('imagesPaths', JSON.stringify(imagesPaths)); // 发送图片路径数组
            formData.append('owner', localStorage.getItem('username'))

            selectedImages.forEach(image => {
                formData.append('images', image);
            });

            await client.post(base, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log('Post created successfully:', response.data);
                    if (response.data.success) {
                        alert("帖子创建成功!");
                        navigate(`/circle/${circle_id}`); // 重定向到兴趣圈页面
                    } else {
                        alert("创建失败: " + response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error creating post:', error);
                    alert("未知错误");
                });
        } else {
            alert("请填写标题、内容和至少一张图片");
        }
    };

    return (
        <form onSubmit={handleCreatePost}>
            <div>
                <label htmlFor="title">标题：</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>

            <div>
                <label htmlFor="content">内容：</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                    rows="10"
                />
            </div>

            <div>
                <label htmlFor="images">上传图片：</label>
                <input
                    type="file"
                    id="images"
                    multiple
                    onChange={handleImageChange}
                />
                {imagesPaths.map((path, index) => (
                    <div key={index}>
                        <p>已选择图片: {path}</p>
                    </div>
                ))}
            </div>

            <div>
                <button type="submit">提交</button>
            </div>
        </form>
    );
}

export default CreatePost;
