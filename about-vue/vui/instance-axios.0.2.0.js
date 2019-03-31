
function axiosRequest(config) {
    // axios-> ajax 请求封装文件
    // 默认配置
    var defaultConfig = {
        url: '',
        type: 'get',
        token: '',
        contentType: 'json',
        params: {}
    };
    config = Object.assign(defaultConfig, config);
    var url = config.url;
    var params = config.params;
    var instance = axios.create();
    // 响应拦截器
    var instanceToken = config.token ? config.token : '';

    if (config.contentType && config.contentType == 'form'){
        instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }else {
        instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    }

    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if (instanceToken){
            config.headers.Authorization = instanceToken;
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    instance.interceptors.response.use(function (res) {
        // 请求成功
        if (res.status === 200) {
            return Promise.resolve(res.data);
        } else {
            return Promise.reject(res.data);
        }
    }, function (error) {
        // 请求失败
        var response = error.response;
        return Promise.reject(response);
    });
    var instanceAxios = {
        get: function () {
            return instance.get(url, {
                params: params
            });
        },
        // Qs-> 字段序列化库 /js/qs.js
        post: function () {
            if (config.contentType && config.contentType == 'form'){
                return instance.post(url, Qs.stringify(params));
            }else {
                return instance.post(url, params);
            }
        },
        all: function () {
            return axios.all(config.arr);
        }

    };
    if (config.type == 'post'){
        return instanceAxios.post();
    }else if(config.type == 'get'){
        return instanceAxios.get();
    }else if(config.type == 'all'){
        return instanceAxios.all(config.all);
    }
}









