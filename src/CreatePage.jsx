import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import * as axios from 'axios'

function CreatePage() {
    const [circleName, setCirName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const client = axios.default;
    const base = "http://127.0.0.1:7002/createcircle"

    const handleContentChange = (e) => {
        setCirName(e.target.value);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleCreateCircle = async (e) => {
        console.log('creating');
        e.preventDefault();

        if (selectedImage) {
            const formData = new FormData();
            formData.append('file', selectedImage);
            formData.append('circle_name', circleName);

            await client.post(base, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log('Uploaded successfully:', response);
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                })
                
        }
    }
    return (
        <form onSubmit={handleCreateCircle}>
            <div>
                <label htmlFor="name">圈名：</label>
                <textarea
                    id="name"
                    value={circleName}
                    onChange={handleContentChange}
                    rows="1"

                />
            </div>

            <div>
                <label htmlFor="post-image">上传头图：</label>
                <input
                    type="file"
                    id="post-image"
                    onChange={handleImageChange}
                />
                {selectedImage && <p>已选择图片: {selectedImage.name}</p>}
            </div>

            <div>
                <button>提交</button>
            </div>
        </form>
    );
}

export default CreatePage;