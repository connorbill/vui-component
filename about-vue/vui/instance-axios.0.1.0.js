
/*
* version 0.1.0
*注意事项
* 1 必须引入axios.min.js
* 2 兼容ie9 需引入es6-promise.min.js
* 3 此文件接口建立在返回接口是 {code:'',data:{}, message:''} 的条件下统一处理，
*   只有code为 '000000'(也就是在这个code才是返回正确信息)时，才会把返回字段返回.then()方法中， 其余(比如：'000001')都返回到catch() 方法中；
*   then(function(res){}), res参数为{code:'',data:{}, message:''}
* 4 请求方法：
*   get: instanceAxios.get(url,params),
*   post: instanceAxios.post(url,params)
* 5  默认为['Content-Type'] = 'application/json;charset=UTF-8'， 如果传输字段为json，不需要引入qs.js
*   如果['Content-Type'] = 'application/x-www-form-urlencoded'，引入qs.js，表单序列化
*
 */

// axios-> ajax 请求封装文件 /js/axios.min.js
var instance = axios.create();
// 设置post请求头, 不设置默认为 'application/json;charset=UTF-8'
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 响应拦截器
// axios.defaults.headers.common['Authorization'] = token;
var instanceToken = '';

instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (instanceToken){
        config.headers.Authorization = instanceToken;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})
instance.interceptors.response.use(function (res) {
    // 请求成功
    if (res.status === 200) {
        // 0 代表成功
        // if (res.data.code === '000000') {
        //     return Promise.resolve(res.data);
        // } else {
        //     // 引入es6-promise.min.js 中有 Promise的兼容ie9
        //     // return new Promise(function (resolve, reject) {
        //     //     reject(res.data);
        //     // })
        //     return Promise.reject(res.data);
        // }
        return Promise.resolve(res.data);
    } else {
        // return new Promise(function (resolve, reject) {
        //     reject(res.data);
        // })
        return Promise.reject(res.data);
    }
}, function (error) {
    // 请求失败
    var response = error.response;
    // return new Promise(function (resolve, reject) {
    //     reject(response);
    // })
    return Promise.reject(response);
});
var instanceAxios = {
    get: function (url, params) {
        return instance.get(url, {
            params: params
        });
    },
    // Qs-> 字段序列化库 /js/qs.js
    post: function (url, params, other) {
        if (other && other.token){
            instanceToken = other.token;
        }
        if (other && other.paramType == 'form'){
            instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            return instance.post(url, Qs.stringify(params));
        }else {
            instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
        }
        return instance.post(url, params);
    }
};









