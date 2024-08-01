import * as axios from 'axios'

const client = axios.default;

const base = "http://127.0.0.1:7002";

export async function getTitle() {
    // 使用 axios.get 方法发送GET请求时，它会返回一个Promise，该Promise在请求成功时解析为一个响应对象。
    const result = await client.get(base);
    return result.data;
}