// vue filter
Vue.filter('numThou', function (num) {
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
});
Vue.filter('numTwoDec', function (value) {
    // 保留两位小数
    var num = (Math.round(value * 100) / 100).toFixed(2);
    return num;
});
Vue.filter('timeFormat', function (input, fmtstring) {
    // 时间戳格式化 依赖于 moment.min.js
    return moment(input).format(fmtstring);
});
Vue.filter('numInt', function (value) {
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
});