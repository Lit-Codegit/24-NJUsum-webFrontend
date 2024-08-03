import React, { useState } from 'react';

function PostForm() {
    const [postContent, setPostContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleContentChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: 添加提交表单的逻辑，发送数据到服务器
        console.log('Post submitted:', postContent, selectedImage);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="post-content">发帖内容：</label>
                <textarea
                    id="post-content"
                    value={postContent}
                    onChange={handleContentChange}
                    rows="4"
                    cols="50"
                />
            </div>
            <div>
                <label htmlFor="post-image">上传图片：</label>
                <input
                    type="file"
                    id="post-image"
                    onChange={handleImageChange}
                />
                {selectedImage && <p>已选择图片: {selectedImage.name}</p>}
            </div>
            <div>
                <button type="submit">提交</button>
            </div>
        </form>
    );
}

export default PostForm;