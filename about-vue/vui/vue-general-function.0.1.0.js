
Vue.prototype.$numThou = function (num) {
    // 千分位格式化 保留两位小数
    if(num && num!=null){
        num = String(num);
        var left=num.split('.')[0],right=num.split('.')[1];
        right = right ? (right.length>=2 ? '.'+right.substr(0,2) : '.'+right+'0') : '.00';
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
        return (Number(num)<0?"-":"") + temp.join(',').split('').reverse().join('')+right;
    }else if(num===0){
        return '0.00';
    }else{
        return "";
    }
};
Vue.prototype.$numTwoDec = function (value) {
    if (value === '' || value === null || value === undefined) {
        value = 0;
    }
    // 保留两位小数 四舍五入
    var num = (Math.round(value * 100) / 100).toFixed(2);
    return num;
};
Vue.prototype.timeFormat = function (input, fmtstring) {
    // 时间戳格式化 依赖于 moment.min.js
    return moment(input).format(fmtstring);
};
Vue.prototype.$numInt = function (value) {
    if (value === null || value === '' || value === undefined) {
        return '0';
    } else {
        var num = 0;
        if (value > 100000) {
            num = (value / 10000).toFixed(2) + '万';
        } else if (value > 100000000) {
            num = (value / 100000000).toFixed(2) + '亿';
        } else {
            num = value;
        }
        return num;
    }
};



Vue.prototype.$trimSpace = function (str, is_global) {
    // 去掉空格 is_global=='g'，全局空格，不传参数去掉前后空格
    var result = '';
    if (str) {
        result = str.replace(/(^\s+)|(\s+$)/g, "");
    }
    if (is_global) {
        if (is_global.toLowerCase() == "g") {
            result = result.replace(/\s/g, "");
        }
    }
    return result;
};
Vue.prototype.$checkLength = function (str) {
    // 字符串长度计算
    var realLength = 0;
    if (str) {
        var len = this.$trimSpace(str).length;
        realLength = len;
    }
    return realLength;
};
Vue.prototype.$checkDecimalPoint = function (num) {
    // 判断是否是两位小数，是-> 返回true
    if (/^(\-|\+)?\d+(\.\d{1,2})?$/.test(num)) {
        return true;
    } else {
        return false;
    }
};
Vue.prototype.$checkNumber = function (num) {
    // 判断是否是数字
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    var regu = /^(\-|\+)?\d+(\.\d+)?$/;
    if (regu.test(num) || regu.test(num) || regu.test(num)) {
        return true;
    } else {
        return false;
    }
};
Vue.prototype.$checkInt = function (num) {
    // 判断是否是整数
    if (!/^\d+$/.test(num)) {
        return false;
    } else {
        return true;
    }
};
Vue.prototype.$checkCardID = function (num) {
    // 判断是否是身份证
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(num)) {
        return false;
    } else {
        return true;
    }
};
Vue.prototype.$checkMobile = function (num) {
    // 判断是否是手机号
    var regIdNo = /^[1][2,3,4,5,6,7,8,9,0][0-9]{9}$/;
    if (!regIdNo.test(num)) {
        return false;
    } else {
        return true;
    }
};
Vue.prototype.$checkLicense = function (num) {
    // 判断是否是营业执照号
    var regIdNo = /^[0-9a-zA-Z]{10,18}$/;
    if (!regIdNo.test(num)) {
        return false;
    } else {
        return true;
    }
};
Vue.prototype.$isArray  = function (obj) {
    // 判断是否是数组
    return obj && ( typeof obj === 'object') && (obj.constructor == Array);
};
Vue.prototype.$isString  = function (obj) {
    // 判断是否 字符串
    return (typeof obj =='string') && obj.constructor == String;
};
Vue.prototype.$isObject  = function (obj) {
    // 判断是否 对象
    return (typeof obj=='object')&&obj.constructor==Object;
};
Vue.prototype.$recursion  = function (obj, oldValue, newValue) {
    console.log(this.$isArray(obj))
    if (this.$isArray(obj)) {
        for (var j = 0; j < obj.length; j++) {
            console.log(obj[j])
            for(var i in obj) {
                console.log(i,":",obj[i]);
            }
            // 校验字段
        }
    } else {
        this.eleNum++;
        // this.$traverse(obj);
    }
};
Vue.prototype.$traverse  = function (obj) {
    for (var a in obj) {

        if (typeof(obj[a]) == "object") {
            this.$traverse(obj[a]); //递归遍历
        } else {
            console.log(a + "=" + obj[a]); //如果是值就显示
        }
    }
};


Vue.prototype.$innerHtml = function (obj, cls) {
    obj.innerText = cls;
};

Vue.prototype.$parents = function (obj, cls) {

    while(!this.$hasClass(obj, cls)){
        obj = obj.parentNode;
    }
    return obj;
};
Vue.prototype.$hasClass = function (obj, cls) {
    if (obj.className) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
    return false;
};

Vue.prototype.$addClass = function (obj, cls) {
    if (!this.$hasClass(obj, cls)) obj.className += " " + cls;
};

Vue.prototype.$removeClass = function (obj, cls) {
    if (this.$hasClass(obj, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        obj.className = obj.className.replace(reg, ' ');
    }
};

Vue.prototype.$removeAllClass = function (obj) {
    obj.className = '';
};



