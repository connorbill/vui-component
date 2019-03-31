
Vue.prototype.$checkForm = function(ev, className, vueInstance){
    /**
     *
     * @params=data-vui-require="true" 是否必输， true 为必输， 不写则不校验必输
     * @params=data-vui-type 输入值的类型三种 string float int
     * @params=data-vui-num-max 数字最大值
     * @params=data-vui-num-min 数字最小值
     * @params=data-vui-str-min 字符串最小长度
     * @params=data-vui-str-max 字符串最大长度
     * @params=data-vui-define 其他校验函数，如果存在，则只会执行这个校验函数
     *
     *
     * 还可以扩展其他限制参数
     *
     * 新参数
     * require： true, 表示必输项 tip ： 提示语句
     * decimal：0表示整数，2代表保留2位以内的小数，以此类推
     * strMax ：最大字符， strMin： 最小字符长度
     * numMax： 数值最大， numMin： 最小数值
     * 总共如下四种情况：
     * creditRequirement: JSON.stringify([
     {require: true, tip: '年龄不能为空'},
     {strMax: 5, strMin: 2, tip:'长度在 2 到 5 个字符'},
     {numMax: 100000000000, numMin: 0, tip: '请输入0到12位数值'},
     {decimal: 0, tip: '请输入整数'}
     ]),
     *
     */
    var that = this;
    if (vueInstance){
        that = vueInstance;
    }
    var cls = "";
    var isRight = 0;
    var resArr = [];
    if (ev){
        var path = ev.path;
        var value = ev.target.value;
        var dataset = event.target.dataset;
        var valueType = dataset.vuiType;
        var valueRequire = dataset.vuiRequire;
        var valueNumMax = parseFloat(dataset.vuiNumMax);
        var valueNumMin = parseFloat(dataset.vuiNumMin);
        var valueStrMax = parseFloat(dataset.vuiStrMax);
        var valueStrMin = parseFloat(dataset.vuiStrMin);
        var vuiDefine = dataset.vuiDefine;
        var vuiRule = '';
        if (dataset.vuiRule){
            vuiRule =  JSON.parse(dataset.vuiRule)
        }
        // console.log(JSON.parse(vuiArr).max)

        var checkObj = {
            required: valueRequire,
            valueType: valueType,
            valueNumMax: valueNumMax,
            valueNumMin: valueNumMin,
            valueStrMax: valueStrMax,
            valueStrMin: valueStrMin,
            vuiDefine: vuiDefine,
            vuiRule: vuiRule
        };
        var isError = Vue.prototype.$checkObj(value, checkObj, that);
        if (isError){
            for (var i = 0; i < path.length; i++){
                if (this.$hasClass(path[i], 'vui-form-item')){
                    this.$addClass(path[i], 'is-error');
                    path[i].querySelectorAll('.vui-form-item__error').forEach(function (item) {
                        item.innerText = isError;
                    });
                    return false;
                }
            }
        }else{
            for (var i = 0; i < path.length; i++){
                if (this.$hasClass(path[i], 'vui-form-item')){
                    this.$removeClass(path[i], 'is-error');
                    path[i].querySelectorAll('.vui-form-item__error').forEach(function (item) {
                        item.innerText = '';
                    });
                    return true;
                }
            }

        }
    }
    if (className){
        cls = className;
        document.querySelectorAll(cls+ " input").forEach(function (item) {
            var value = item.value;
            var valueType = item.getAttribute('data-vui-type');
            var valueRequire = item.getAttribute('data-vui-require');
            var valueNumMax = parseFloat(item.getAttribute('data-vui-num-max'));
            var valueNumMin = parseFloat(item.getAttribute('data-vui-num-min'));
            var valueStrMax = parseFloat(item.getAttribute('data-vui-str-max'));
            var valueStrMin = parseFloat(item.getAttribute('data-vui-str-min'));
            var vuiDefine = item.getAttribute('data-vui-define');
            var vuiRule = '';
            if (item.getAttribute('data-vui-rule')){
                vuiRule =  JSON.parse(item.getAttribute('data-vui-rule'))
            }
            var checkObj = {
                required: valueRequire,
                valueType: valueType,
                valueNumMax: valueNumMax,
                valueNumMin: valueNumMin,
                valueStrMax: valueStrMax,
                valueStrMin: valueStrMin,
                vuiDefine: vuiDefine,
                vuiRule: vuiRule
            };
            var isError = Vue.prototype.$checkObj(value, checkObj, that, item);
            if (isError){
                var vuiFormItem = Vue.prototype.$parents(item, 'vui-form-item');
                Vue.prototype.$addClass(vuiFormItem, 'is-error');
                vuiFormItem.querySelectorAll('.vui-form-item__error').forEach(function (item) {
                    item.innerText = isError;
                });
                resArr.push(false);
            }else {
                var vuiFormItem = Vue.prototype.$parents(item, 'vui-form-item');
                Vue.prototype.$removeClass(vuiFormItem, 'is-error');
                vuiFormItem.querySelectorAll('.vui-form-item__error').forEach(function (item) {
                    item.innerText = '';
                });
                resArr.push(true);
            }
        });
        for (var m = 0; m < resArr.length; m++){
            if (!resArr[m]) isRight += 1;
        }
        if (isRight > 0) {
            return false;
        } else {
            return true;
        }
    }
};


Vue.prototype.$checkObj = function (value, obj, vueInstance, item){
    value = Vue.prototype.$trimSpace(value);
    // 新增自定义提示语句
    var rule = obj.vuiRule;
    if (rule.length > 0){
        for (var i = 0; i < rule.length; i++){
            if (value === '' || value === null || value === undefined) {
                if (rule[i].require) return rule[i].tip;
                continue
            }
            if (rule[i].strMax || rule[i].strMin) {
                if (Vue.prototype.$checkLength(value) > rule[i].strMax || Vue.prototype.$checkLength(value) < rule[i].strMin) return rule[i].tip;
            }
            if (rule[i].numMax || rule[i].numMin || rule[i].decimal>=0 ) {
                var decimalLen = '';
                var decimalStr = value.toString().split(".")[1];
                if (decimalStr) decimalLen = value.toString().split(".")[1].length;
                if (!Vue.prototype.$checkNumber(value)) return rule[i].tip;
                if (decimalLen && decimalLen > rule[i].decimal) return rule[i].tip;
                if ( value > rule[i].numMax || value < rule[i].numMin) return rule[i].tip;
            }
        }
    }
    if (obj.vuiDefine){
        var res = vueInstance[obj.vuiDefine](value, item);
        if (res)return res;
    }

    // 老的校验方法
    if (value === '' || value === null || value === undefined) {
        if (obj.required && obj.required == 'true') {
            return '此为必输项';
        }else {
            return '';
        }
    }
    if (obj.valueType === 'float' || obj.valueType === 'int') {
        if (!this.$checkNumber(value)) return '请输入正确的数值';
        if (obj.valueType === 'int'){
            if (!this.$checkInt(value)) return'请输入整数';
        }
        if (obj.valueType === 'float'){
            if (!this.$checkDecimalPoint(value)) return '请输入两位小数以内的数值';
        }
        if (obj.valueNumMax &&  value > obj.valueNumMax) return '请输入不大于' + (obj.valueNumMax.toFixed(0).length - 1) + '位的数';
        if (obj.valueNumMin && value < obj.valueNumMin ) return '输入数值不能小于'+obj.valueNumMin;
    } else if (obj.valueType === 'string'){
        if (this.$checkLength(value) > obj.valueStrMax)return '字符长度在' + obj.valueStrMax + '个以内';
        if (obj.valueStrMin && this.$checkLength(value) < obj.valueStrMin  ) return '请输入不小于' + obj.valueStrMin + '个字';
    }
};