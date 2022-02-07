//在utils工具文件夹下封装axios
import axios from 'axios';

const allaxios = axios.create({
    baseURL: 'http://www.young1024.com:1234/'
})
allaxios.interceptors.response.use((res) => {

    return res.data
})
export default allaxios;