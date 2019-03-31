// vue filter
Vue.filter('numThou', function(num) {
    // 千分位格式化 保留两位小数
    if (num && num != null) {
        num = String(num);
        var left = num.split('.')[0],
            right = num.split('.')[1];
        right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
        return (Number(num) < 0 ? "-" : "") + temp.join(',').split('').reverse().join('') + right;
    } else if (num === 0) {
        return '0.00';
    } else {
        return "";
    }
});
Vue.filter('numTwoDec', function(value) {
    // 保留两位小数
    var num = (Math.round(value * 100) / 100).toFixed(2);
    return num;
});
Vue.filter('timeFormat', function(input, fmtstring) {
    // 时间戳格式化 依赖于 moment.min.js
    return moment(input).format(fmtstring);
});
Vue.filter('numInt', function(value) {
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




Vue.prototype.$numThou = function(num) {
    // 千分位格式化 保留两位小数
    if (num && num != null) {
        num = String(num);
        var left = num.split('.')[0],
            right = num.split('.')[1];
        right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
        return (Number(num) < 0 ? "-" : "") + temp.join(',').split('').reverse().join('') + right;
    } else if (num === 0) {
        return '0.00';
    } else {
        return "";
    }
};
Vue.prototype.$numTwoDec = function(value) {
    if (value === '' || value === null || value === undefined) {
        value = 0;
    }
    // 保留两位小数 四舍五入
    var num = (Math.round(value * 100) / 100).toFixed(2);
    return num;
};
Vue.prototype.timeFormat = function(input, fmtstring) {
    // 时间戳格式化 依赖于 moment.min.js
    return moment(input).format(fmtstring);
};
Vue.prototype.$numInt = function(value) {
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



Vue.prototype.$trimSpace = function(str, is_global) {
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
Vue.prototype.$checkLength = function(str) {
    // 字符串长度计算
    var realLength = 0;
    if (str) {
        var len = this.$trimSpace(str).length;
        realLength = len;
    }
    return realLength;
};
Vue.prototype.$checkDecimalPoint = function(num) {
    // 判断是否是两位小数，是-> 返回true
    if (/^(\-|\+)?\d+(\.\d{1,2})?$/.test(num)) {
        return true;
    } else {
        return false;
    }
};
Vue.prototype.$checkNumber = function(num) {
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
Vue.prototype.$checkInt = function(num) {
    // 判断是否是整数
    if (!/^\d+$/.test(num)) {
        return false;
    } else {
        return true;
    }
};
Vue.prototype.$checkCardID = function(num) {
    // 判断是否是身份证
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(num)) {
        return false;
    } else {
        return true;
    }
};
Vue.prototype.$checkMobile = function(num) {
    // 判断是否是手机号
    var regIdNo = /^[1][2,3,4,5,6,7,8,9,0][0-9]{9}$/;
    if (!regIdNo.test(num)) {
        return false;
    } else {
        return true;
    }
};
Vue.prototype.$checkLicense = function(num) {
    // 判断是否是营业执照号
    var regIdNo = /^[0-9a-zA-Z]{10,18}$/;
    if (!regIdNo.test(num)) {
        return false;
    } else {
        return true;
    }
};
Vue.prototype.$isArray = function(obj) {
    // 判断是否是数组
    return obj && (typeof obj === 'object') && (obj.constructor == Array);
};
Vue.prototype.$isString = function(obj) {
    // 判断是否 字符串
    return (typeof obj == 'string') && obj.constructor == String;
};
Vue.prototype.$isObject = function(obj) {
    // 判断是否 对象
    return (typeof obj == 'object') && obj.constructor == Object;
};
Vue.prototype.$recursion = function(obj, oldValue, newValue) {
    console.log(this.$isArray(obj))
    if (this.$isArray(obj)) {
        for (var j = 0; j < obj.length; j++) {
            console.log(obj[j])
            for (var i in obj) {
                console.log(i, ":", obj[i]);
            }
            // 校验字段
        }
    } else {
        this.eleNum++;
        // this.$traverse(obj);
    }
};
Vue.prototype.$traverse = function(obj) {
    for (var a in obj) {

        if (typeof(obj[a]) == "object") {
            this.$traverse(obj[a]); //递归遍历
        } else {
            console.log(a + "=" + obj[a]); //如果是值就显示
        }
    }
};


Vue.prototype.$innerHtml = function(obj, cls) {
    obj.innerText = cls;
};

Vue.prototype.$parents = function(obj, cls) {

    while (!this.$hasClass(obj, cls)) {
        obj = obj.parentNode;
    }
    return obj;
};
Vue.prototype.$hasClass = function(obj, cls) {
    if (obj.className) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
    return false;
};

Vue.prototype.$addClass = function(obj, cls) {
    if (!this.$hasClass(obj, cls)) obj.className += " " + cls;
};

Vue.prototype.$removeClass = function(obj, cls) {
    if (this.$hasClass(obj, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        obj.className = obj.className.replace(reg, ' ');
    }
};

Vue.prototype.$removeAllClass = function(obj) {
    obj.className = '';
};

Vue.prototype.$deepFreeze = function(o) {
    // return Object.freeze(obj);
    // Object.freeze(obj);
    // Object.keys(obj).forEach(function(key, i){
    //     if(typeof obj[key] === 'object'){
    //         Vue.prototype.$deepFreeze(obj[key])
    //     }
    // });
    // return Object.freeze(obj);
    var prop, propKey;
    Object.freeze(o); //首先冻结第一层对象
    for (propKey in o) {
        prop = o[propKey];
        if (!o.hasOwnProperty(propKey) || !(typeof prop === "object") || Object.isFrozen(prop)) {
            continue;
        }
        this.$deepFreeze(prop); //递归
    }
    return o;
};

Vue.prototype.$judgeValue = function(obj) {
    /**
     *
     * 优点：
     * 1 浏览器删除dom元素 或 修改 dom元素（比如将input 修改成div）,仍然绕不过校验
     * 2 浏览器打开console,修改不了校验规则变量，从而在console上不能绕过校验
     * 3 相对0.1.0版本更简洁
     *
     *
     新参数
     require： true, 表示必输项 tip ： 提示语句
     decimal：0表示整数，2代表保留2位以内的小数，以此类推
     strMax ：最大字符， strMin： 最小字符长度
     numMax： 数值最大， numMin： 最小数值
     define: 自定义校验规则, 可写多个
     总共如下几种情况：
     [
         {require: true, tip: '年龄不能为空'},
         {strMax: 5, strMin: 2, tip:'长度在 2 到 5 个字符'},
         {numMax: 100000000000, numMin: 0, tip: '请输入0到12位数值'},
         {decimal: 0, tip: '请输入整数'},
         {define: '$checkCardID', tip:'请输入正确的身份证号码'},
         {define: '$checkNumber', tip:'请输入正确的数值'}
     ],

     */
    // console.log(obj)
    var value = obj.value;
    var rule = obj.rule;
    // 新增自定义提示语句
    if (rule.length > 0) {
        for (var i = 0; i < rule.length; i++) {
            if (value === '' || value === null || value === undefined) {
                if (rule[i].require) return rule[i].tip;
                continue
            }
            if (rule[i].strMax || rule[i].strMin) {
                if (Vue.prototype.$checkLength(value) > rule[i].strMax || Vue.prototype.$checkLength(value) < rule[i].strMin) return rule[i].tip;
            }
            if (rule[i].numMax || rule[i].numMin || rule[i].decimal >= 0) {
                var decimalLen = '';
                var decimalStr = value.toString().split(".")[1];
                if (decimalStr) decimalLen = value.toString().split(".")[1].length;
                if (!Vue.prototype.$checkNumber(value)) return rule[i].tip;
                if (decimalLen && decimalLen > rule[i].decimal) return rule[i].tip;
                if (value > rule[i].numMax || value < rule[i].numMin) return rule[i].tip;
            }
            if (rule[i].define) {
                var errTip = Vue.prototype[rule[i].define](value);
                if (!errTip) {
                    return rule[i].tip;
                }
            }
        }
    }
};

Vue.prototype.$isRight = function(obj) {
    var valiRes = true;
    var check = obj;
    for (var key in check) {
        var v = check[key];
        // keys.push(key);
        // values.push(obj[key]);//取得value
        if (Array.isArray(this.$refs[v])) {
            // console.log(this.$refs[v]);
            if (this.$refs[v].length > 0) {
                this.$refs[v].forEach(function(el, index) {
                    console.log(el)
                    var vali = el.checkValue();
                    if (vali && !vali.isRight) {
                        valiRes = false;
                    }
                });
            }
        } else {
            if (this.$refs[v]) {
                console.log(this.$refs[v])
                var vali = this.$refs[v].checkValue();
                if (vali && !vali.isRight) {
                    valiRes = false;
                }
            }
        }
    }
    return valiRes;
};


/*
version 0.2.0
力求简单，html与js校验规则配置代码明晰且尽量少，判断值的正确与否简单，
即使市场上有，我们也要自己写。
因为我们必须先自己写，才能把控更多的需求，从而做出我们自己想要用和需要用的组件，不然不能适应我们所需。
 */

// 定义一个名为 vui-form-item 的新组件
Vue.component('vui-form-item', {
    template: '\
        <div class="vui-form-item " :class="{\'is-error\': error}"> \
            <div class="vui-form-item__content"> \
                <slot slot-scope="value"></slot>\
                <div class="vui-form-item__error">{{errorTip}}</div> \
            </div>\
        </div>\
    ',
    provide() {
        return {
            vuiFormItem: this
        };
    },
    props: {
        label: String,
        labelWidth: String,
        prop: String,
        required: {
            type: Boolean,
            default: undefined
        },
        rules: [Object, Array],
        error: String,
        validateStatus: String,
        for: String,
        inlineMessage: {
            type: [String, Boolean],
            default: ''
        },
        showMessage: {
            type: Boolean,
            default: true
        },
        size: String
    },
    watch: {
        error: {
            immediate: true,
            handler(value) {
                this.validateMessage = value;
                this.validateState = value ? 'error' : '';
            }
        },
        validateStatus(value) {
            this.validateState = value;
        }
    },
    data: function() {
        return {
            val: '',
            error: false,
            errorTip: '',
            validateState: '',
            validateMessage: '',
            validateDisabled: false,
            validator: {},
            isNested: false
        }
    },
    methods: {
        checkValue: function() {
            console.log('子');
            console.log(this.val);
            console.log(this.$ref.son.getValue())
        },
    },
    mounted() {
        // this.val = this.value;
    }
});



// 定义一个名为 vui-input 的新组件
Vue.component('vui-input', {
    template: '\
    <div class="vui-form-item " :class="{\'is-error\': error}"> \
        <div class="vui-form-item__content">\
            <div :class="[\
                type === \'textarea\' ? \'vui-textarea\' : \'vui-input\',\
                {\
                  \'is-disabled\': inputDisabled,\
                }\
                ]"\
                >\
                    <input\
                            v-if="type !== \'textarea\'"\
                            class="vui-input__inner"\
                            v-bind="$attrs"\
                            :type="type"\
                            :disabled="inputDisabled"\
                            :readonly="readonly"\
                            :autocomplete="autoComplete || autocomplete"\
                            :value="nativeInputValue"\
                            ref="input"\
                            @input="handleInput"\
                            @focus="handleFocus"\
                            @blur="handleBlur"\
                            @change="handleChange"\
                    >\
                    <textarea\
                            v-else\
                            class="vui-textarea__inner"\
                            :value="nativeInputValue"\
                            @input="handleInput"\
                            ref="textarea"\
                            v-bind="$attrs"\
                            :disabled="inputDisabled"\
                            :readonly="readonly"\
                            :autocomplete="autoComplete || autocomplete"\
                            :style="textareaStyle"\
                            @focus="handleFocus"\
                            @blur="handleBlur"\
                            @change="handleChange"\
                    >\
                    </textarea>\
            </div>\
            <div class="vui-form-item__error">{{errorTip}}</div>\
        </div>\
    </div>\
    ',
    data: function() {
        return {
            focused: false,
            error: false,
            errorTip: '',
        };
    },
    props: {
        rule: [Object],
        value: [String, Number],
        disabled: Boolean,
        readonly: Boolean,
        type: {
            type: String,
            default: 'text'
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        autoComplete: {
            type: String,
        },
        validateEvent: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        inputDisabled() {
            return this.disabled || (this.vuiFormItem || {}).disabled;
        },
        nativeInputValue() {
            var v = this.value === null || this.value === undefined ? '' : this.value;
            return v;
        }
    },
    methods: {
        focus() {
            (this.$refs.input || this.$refs.textarea).focus();
        },
        blur() {
            (this.$refs.input || this.$refs.textarea).blur();
        },
        handleBlur(event) {
            this.focused = false;
            this.$emit('blur', event);
        },
        select() {
            (this.$refs.input || this.$refs.textarea).select();
        },
        handleFocus(event) {
            this.focused = true;
            this.$emit('focus', event);
        },
        handleInput(event) {
            if (event.target.value === this.nativeInputValue) return;

            this.$emit('input', event.target.value);
            this.$nextTick(() => {
                this.$refs.input.value = this.value;
            });
        },
        handleChange(event) {
            this.$emit('change', event.target.value);
        },
        checkValue: function() {
            var obj = {
                value: this.value,
                rule: this.rule
            };
            var tip = this.$judgeValue(obj);
            var res = {
                isRight: true
            };
            if (tip) {
                this.errorTip = tip;
                this.error = true;
                res.isRight = false;
            } else {
                this.error = false;
                res.isRight = true;
            }
            return res;
        },
    },
    mounted() {
        this.$on('inputSelect', this.select);
    },
});

/*
vui-select 组件










*/
Vue.component('vui-select', {
    template: '#vuiselect',
    data: function() {
        return {
            focused: false,
            error: false,
            errorTip: '',
        };
    },
    props: {
        options: [Array],
        value: [String, Number],
        nameId: [String, Number],
        name: [String, Number],
        disabled: Boolean,
        rule: [Object],
        defaultEmpty: {
            type: Boolean,
            default: true
        },
        selectDisabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {

        nativeInputValue() {
            var v = this.value === null || this.value === undefined ? '' : this.value;
            return v;
        }
    },
    methods: {
        handleChange(event) {
            this.$emit('change', event.target.value);
        },
        checkValue: function() {
            var obj = {
                value: this.value,
                rule: this.rule
            };
            var tip = this.$judgeValue(obj);
            var res = {
                isRight: true
            };
            if (tip) {
                this.errorTip = tip;
                this.error = true;
                res.isRight = false;
            } else {
                this.error = false;
                res.isRight = true;
            }
            return res;
        },
    },
});



/*
vui-table 组件










*/
Vue.component('vui-table', {
    template: '#vuitable',
    data: function() {
        return {};
    },
    props: {},
    methods: {},
});

/*
vui-table 组件










*/
Vue.component('vui-table', {
    template: `
    <div>
        
    </div>
    `,
    data: function() {
        return {};
    },
    props: {},
    methods: {},
})