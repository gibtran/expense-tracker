import axios from 'axios';

// mọi request sẽ tự thêm /api vào đầu
const api = axios.create({
    baseURL: '/api',
})

//  chạy trước mỗi request
api.interceptors.request.use((config) =>{
    // lấy token từ local storage
    const token = localStorage.getItem('token');
    if (token) {
        // gắn vào header
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api
