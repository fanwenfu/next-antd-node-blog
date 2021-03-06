import axios from "axios";
import qs from "qs";
axios.defaults.timeout = 5000; //响应时间
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8"; //配置请求头
axios.defaults.baseURL = ""; //配置接口地址
axios.defaults.withCredentials = true; //必须使用cookie
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    //在发送请求之前做某件事
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    if (!res.data.success) {
      return Promise.resolve(res);
    }
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

//返回一个Promise(发送post请求)
export function fetchPost(url, params,client) {
  const base = client == 2 ? "/navy" : "/api";
  return new Promise((resolve, reject) => {
    axios
      .post(base + url, params)
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param,client) {
  const base = client == 2 ? "/navy" : "/api";
  return new Promise((resolve, reject) => {
    axios
      .get(base + url, { params: param })
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
export default {
  fetchPost,
  fetchGet
};
