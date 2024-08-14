// 特定帖内页面


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as axios from 'axios';
import './App.css';

const client = axios.default;

function PostPage() {
    const { circle_id, post_id } = useParams();
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState(0);
    const [newComment, setNewComment] = useState('');
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await client.get(`http://localhost:7002/api/circle/${circle_id}/post/${post_id}`);
                setPost(response.data.data);
                setLikes(response.data.data.thumbs); // 点赞数
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [circle_id, post_id, authToken]);

    const handleLike = async () => {
        try {
            var likes_cnt = await client.post(`http://localhost:7002/api/circle/${circle_id}/post/${post_id}/like`, {});
            setLikes(likes_cnt.data.data);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await client.post(`http://localhost:7002/api/circle/${circle_id}/post/${post_id}/comment`, {
                content: newComment
            });
            setNewComment(''); // 清空评论框
            // 重新获取帖子数据以更新评论列表
            const response = await client.get(`http://localhost:7002/api/circle/${circle_id}/post/${post_id}`
            );
            setPost(response.data.data);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold">
                {circle_id} - 兴趣圈
            </h1>
            <br></br>
            <div>
                <div className="post">
                    <h2>帖子详情</h2>
                    <br></br>
                    <div className="text-4xl">{post.title}</div>
                    <p className="font-semibold">{post.content}</p>
                    <p className='font-light'>作者：{post.owner}</p>
                    <button className="like-button" onClick={handleLike}>
                        赞 {likes}
                    </button>
                    <hr></hr>
                    <hr></hr>
                    <br></br>
                    
                    <div className="comments">
                        <h3 className='text-3xl'>评论区</h3>
                        <ul>
                            {post.comments.map((comment, index) => (
                                <li key={index} className="comment-item">
                                    <p>{localStorage.getItem('username')}:{' '}{comment}</p>
                                </li>
                            ))}
                        </ul>
                        <form onSubmit={handleCommentSubmit}>
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="添加评论..."
                            />
                            <button type="submit">提交</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostPage;
