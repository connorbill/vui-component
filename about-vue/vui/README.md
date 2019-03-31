### 版本： 0.1.0

### 变更历史

### 用法：
### 1.必须引入文件 ：
- 目前分支：feature_11061524_fengkong_PDF-HTML， 
- 应用于：qianxiang-v1-rms/Webcontent/page/jindiao/fkjdConclusionInfo.jsp
- 源代码和示例在本页最后，目前不做在线的示例，像[https://jsfiddle.net/chrisvfritz/50wL7mdz/](https://jsfiddle.net/chrisvfritz/50wL7mdz/)那样，所以如果要试运行，需要拷贝示例文件到本地运行

```html 
<link rel="stylesheet" href="/js/about-vue/vui/vue-validate.0.1.0.css">
<script src="/js/about-vue/vui/vue-validate.0.1.0.js"></script>

```
- 依赖文件 vue.js, vue-general-function.0.1.0.js

### 2 使用校验函数，总共三种校验方式

- (1)：校验某个表单
- (2)：实时输入检验单个数据
- (3)：自定义校验
- (4)，自定义提示校验：

> 这是最初始的校验写法，少写这种，这是最初的一种方式，不能配置自定义提示语。但是仍然可以用
>* @params=data-vui-require="true" 字符串为 true时，为必输字段，没有这个属性则不校验必输
 * @params=data-vui-type 输入值的类型三种 string float int
 * @params=data-vui-num-max 数字最大值
 * @params=data-vui-num-min 数字最小值
 * @params=data-vui-str-min 字符串最小长度
 * @params=data-vui-str-max 字符串最大长度 


可以同时在一个表单中使用，分别对应如下序号：

### (1)，校验某个表单：
```html
/**
*
* @params=data-vui-require="true" 字符串为 true时，为必输字段，没有这个属性则不校验必输
* @params=data-vui-type 输入值的类型三种 string float int
* @params=data-vui-num-max 数字最大值
* @params=data-vui-num-min 数字最小值
* @params=data-vui-str-min 字符串最小长度
* @params=data-vui-str-max 字符串最大长度
* @params=data-vui-define 自定义校验函数名，如果存在，则只会执行这个校验函数
*
* 还可以扩展其他限制参数
* input 或者 select, textarea 写在 class为"vui-form-item__content"中， 代码格式如下 
    <div class="vui-form-item ">
        <div class="vui-form-item__content">
            <input type="text">
            <div class="vui-form-item__error">错误提示 DOM </div>
        </div>
    </div>
*/
<div id="app">
    <div class="check-form-loan">
        <div class="vui-form-item" >
            <div class="vui-form-item__content">
                <input type="text" 
                       class=" w-12-5 h28 pa vui-input__inner check-obj"
                       v-model="month"
                       @input="$checkForm($event)"
                       data-vui-require="true"
                       data-vui-type="int"
                       data-vui-num-max="100000000000"
                />个月
                <div class="vui-form-item__error">错误提示 DOM </div>
            </div>
        </div>
    </div>
    <div @click="submitSomething()" style="padding: 5px 15px;background-color: #2c78f4;"></div>
</div>


<script >
// Vue 实例
var vm = new Vue({
    el: "#app",
    data: {
        month: ''
	},
	methods: {
        submitSomething: function() {
             /**
             * !this.$checkForm(null, '.check-form-loan')
             * 第一个参数(必传)：null
             * 第二个参数(必传)：选择要校验的 表单所属 id 或 class
             * 第三个参数(非必传)：this，也可以写成vm, 是vue实例
             * $checkForm 校验正确会返回 true， 错误返回 false
             * 
             */
            if (!this.$checkForm(null, '.check-form-loan')){
                this.popMsg('请检查数据格式', 2000);
                return
            }
            instanceAxios.post('/fkjdStoreReviewCtrl/modifyFkjdStoreReview', this.loanPlanData)
                .then(function (res) {
                    if (res.code == '000000'){
                        vm.popMsg('保存成功!', 2000);
                    }else {
                        vm.popMsg('保存失败!', 2000);
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
            }
        }
	}
})
</script>
```
### (2)，实时输入检验单个数据：

```html
             /**
             * @input 是实时输入校验， @change是select元素的改变事件， @blur 是失去焦点时执行 @focus是聚焦时执行
             * @input="$checkForm($event)"
             *
             * 第一个参数(必传)：是页面上的 $event, 可以获取单个输入框的值和自定义 data-* 属性
             * 第二个参数(非必传)：如果要传只能是 null,
             * 第三个参数(非必传)：this，也可以写成vm(是vue实例)
             * $checkForm 校验正确会返回 true， 错误返回 false
             * 
             */
<div id="app">
    <div class="vui-form-item " >
        <div class="vui-form-item__content">
            <input type="text" class=" w-12-5 h28 pa vui-input__inner check-obj"
                   v-model="month"
                   @input="$checkForm($event)"
                   :data-vui-rule="monthCheck"
            />个月
            <div class="vui-form-item__error">错误提示 DOM </div>
        </div>
    </div>
</div>
<div @click=""></div>
<script >
// Vue 实例
var vm = new Vue({
    el: "#app",
    data: {
        month: '',
        monthCheck:JSON.stringify([
            {type: 'number', numMax: 100000000000, numMin:0, tip:'请输入不超过12位数值'},
            {decimal: 2, tip: '请输入两位小数以内的数值'},
            {require: true, tip: '此为必输项'},
            {strMax: 5, strMin: 3, tip: "长度为 3 到 5 个字符"}
        ]),
	},
	methods: {
	}
})
</script>
```

### (3)，自定义校验：
```html
data-vui-define="checkIdCard" 中 checkIdCard 是 Vue实例的自定义方法名

<div id="app">
    <div class="vui-form-item " >
        <div class="vui-form-item__content">
            <input type="text" class=" w-12-5 h28 pa vui-input__inner check-obj"
                   v-model="month"
                   @input="$checkForm($event)"
                   :data-vui-rule="monthCheck"
                   data-vui-define="checkIdCard"
            />个月
            <div class="vui-form-item__error">错误提示 DOM </div>
        </div>
    </div>
</div>
<script >
// Vue 实例
var vm = new Vue({
    el: "#app",
    data: {
        month: '',
        monthCheck:JSON.stringify([
             {require: true, tip: '此为必输项'}
        ]),
	},
	methods: {
        checkIdCard: function(value){
            // (3)，自定义校验： 在input元素上加自定义属性 data-vui-define="checkIdCard", 
            // 不管在输入实时输入校验还是提交时所有校验，对这个输入框则只会执行这个校验函数
            // 格式如下：例如校验身份证号码
            // 如果错误就返回 错误提示，正确返回空
            if (!this.$checkCardID(value)) {
                return '请输入正确的身份证号码';
            }
            return '';
        }
	}
})
</script>
```

### (4)，自定义提示校验：

```html
新增 data-vui-rule 属性， 要求是json字符串值，
可以使用 data-vui-rule='[{"numMax": 100000000000, "numMin": 0, "tip": "请输入不超过12位数值"},{"decimal": 0, "tip": "请输入整数"},{"require": "true", "tip": "此为必输项"}]'
或者 :data-vui-rule="monthCheck"，
都能达到同样的目的

<div id="app">
    <div class="vui-form-item " >
        <div class="vui-form-item__content">
            <input type="text" class=" w-12-5 h28 pa vui-input__inner check-obj"
                   v-model="month"
                   @input="$checkForm($event)"
                   :data-vui-rule="monthCheck"
            />个月
            <div class="vui-form-item__error">错误提示 DOM </div>
        </div>
    </div>
    <div class="vui-form-item " >
        <div class="vui-form-item__content">
            <input type="text" class=" w-12-5 h28 pa vui-input__inner check-obj"
                   v-model="month"
                   @input="$checkForm($event)"
			data-vui-rule='[{"numMax": 100000000000, "numMin": 0, "tip": "请输入不超过12位数值"},{"decimal": 0, "tip": "请输入整数"},{"require": "true", "tip": "此为必输项"}]'
                   
            />个月
            <div class="vui-form-item__error">错误提示 DOM </div>
        </div>
    </div>
</div>
<div @click=""></div>
<script >
// Vue 实例
var vm = new Vue({
    el: "#app",
    data: {
        month: '',
        //      require： true, 表示必输项 tip ： 提示语句
        //     decimal：0表示整数，2代表保留2位以内的小数，以此类推
        //      strMax ：最大字符， strMin： 最小字符长度
        //      numMax： 数值最大， numMin： 最小数值
        // 总共只有四种如下组合
        // 1.{type: 'number', numMax: 100000000000, numMin:0, tip:'请输入不超过12位数值'},
        // 只传 type,就是输入数字类型的值，但是不限定值大小，表示就是数字
        // 只传 numMax,就是只限定最大值，就不用 传 type, 这表明就是就是数字了
        // 只传 numMin,就是只限定最小值，就不用 传 type, 这表明就是就是数字了
        // 2. {decimal: 2, tip: '请输入两位小数以内的数值'}, 保留小数位。如果只有这一个，表示这个值类型就是数字类型，因此不需要传第一种对象了{type: 'number'}，如果值有限制大小，还是得传第一种
        // 3. {require: true, tip: '此为必输项'}, 必输项目
        // 4. {strMax: 5, strMin: 3, tip: "长度为 3 到 5 个字符"}
        // 只要存在 strMax 或者 strMin, 就可以知道是字符串类型了，因此
        monthCheck:JSON.stringify([
            {type: 'number', numMax: 100000000000, numMin:0, tip:'请输入不超过12位数值'},
            {decimal: 2, tip: '请输入两位小数以内的数值'},
            {require: true, tip: '此为必输项'},
            {strMax: 5, strMin: 3, tip: "长度为 3 到 5 个字符"}
        ]),
    },
    methods: {
    }
})
</script>
```

### 示例1（旧方式）

> 使用老方式： 类似data-vui-require="true"方式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--引入vue-component.0.1.0.css-->
    <link rel="stylesheet" href="vui-validate.0.1.0.css">
    <style>
        .mt7{
            margin-top: 70px;
        }
    </style>
</head>
<body>
<div id="app">
    <div>{{message}}</div>
    <div>
        <div class="check-form-loan">
            <div v-for="(item, index) in loanPlanData" :key="index">
                <div class="vui-form-item mt7"  >
                    <div>借款总金额：</div>
                    <div class="vui-form-item__content">
                        <input type="text"
                               class=" w-12-5 h28 pa vui-input__inner check-obj"
                               v-model="item.creditRequirement"
                               @input="$checkForm($event)"
                               data-vui-type="float"
                               data-vui-num-max="100000000000"
                        />元
                        <div class="vui-form-item__error">错误提示 DOM </div>
                    </div>
                </div>
                <div class="vui-form-item mt7" >
                    <div><span style="color: red;">*</span>期限/月：</div>
                    <div class="vui-form-item__content">
                        <input type="text"
                               class=" w-12-5 h28 pa vui-input__inner check-obj"
                               v-model="item.applyForDate"
                               @input="$checkForm($event)"
                               data-vui-require="true"
                               data-vui-type="int"
                               data-vui-num-max="100000000000"
                        />个月
                        <div class="vui-form-item__error">错误提示 DOM </div>
                    </div>
                </div>
                <div class="vui-form-item mt7" >
                    <div><span style="color: red;">*</span>身份证号码：</div>
                    <div class="vui-form-item__content">
                        <input type="text"
                               class=" w-12-5 h28 pa vui-input__inner check-obj"
                               v-model="item.idcard"
                               @input="$checkForm($event)"
                               data-vui-require="true"
                               data-vui-define="checkIdCard"
                        />个月
                        <div class="vui-form-item__error">错误提示 DOM </div>
                    </div>
                </div>
            </div>
        </div>
        <div @click="submitSomething()" style="padding: 5px 15px;background-color: #639af4;width: 100px;height: 30px;line-height: 30px;text-align: center;color:#fff;margin-top: 30px;">校验</div>
    </div>
</div>
<script src="https://unpkg.com/vue"></script>
<!--<script src="vue.min.js"></script>-->
<script src="vue-general-function.0.1.0.js"></script>
<script src="vui-validate.0.1.0.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue.js!',
            month:'',
            loanPlanData: [
                {
                    id: '',
                    jdNumber: '', //尽调编号
                    lxNumber:'',
                    unStoreId: '',
                    unStoreName: '', //资产所在门店
                    unLicenseNumber: '', // 营业执照号码
                    creditRequirement: '', // 借款总金额（万元）
                    applyForDate: '', // 期限/月
                    repaymentType: '', //还本付息方式
                    repaymentName: '', //还本付息方式
                    comboType: '', //借款主体组合方式 name: "公司", value: 1,  name: "自然人", value: 2, name: "门店+自然人", value: 3 name: "门店", value: 4,
                    comboName: '', //借款主体组合方式
                    // 借款主体 担保人
                    idcard: '',
                    fkjdAgencies: [
                        {
                            isShowSearch: false,
                            id: '',
                            name: '',
                            idNumber: '', // 担保人身份证号/营业执照号2
                            mobile: '',
                            workDate: '',
                            flag:0 // 担保人身份证号0 营业执照号1
                        }
                    ],
                }
            ],
        },
        methods: {
            submitSomething: function () {
                if (!this.$checkForm(null, '.check-form-loan', this)){
                    console.log('有错误')
                    return
                }
                console.log('正确')
                console.log(this.loanPlanData)
            },
            checkIdCard: function(value){
                if (!this.$checkCardID(value)) {
                    return '请输入正确的身份证号码';
                }
                return '';
            },
        }
    })

</script>

</body>
</html>


```

### 示例2（新方式）
> 使用自定义校验提示语实例JSON.stringify :data-vui-rule="loanPlanDataCheck[0].idcard"方式
这个方式，就比示例1较清晰些，定义的变量与校验变量一一对应，一目了然，在html中也一一对应，代码较少，可自定义提示语
自定义校验方法仍然一样使用 data-vui-define="checkIdCard"

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--引入vue-component.0.1.0.css-->
    <link rel="stylesheet" href="vue-component.0.1.0.css">
    <style>
        .mt7{
            margin-top: 70px;
        }
    </style>
</head>
<body>
<div id="app">
    <div>{{message}}</div>
    <div>
        <div class="check-form-loan">
            <div v-for="(item, index) in loanPlanData" :key="index">
                <div class="vui-form-item mt7"  >
                    <div>借款总金额：</div>
                    <div class="vui-form-item__content">
                        <input type="text"
                               class=" w-12-5 h28 pa vui-input__inner check-obj"
                               v-model="item.creditRequirement"
                               @input="$checkForm($event)"
                               :data-vui-rule='loanPlanDataCheck[0].creditRequirement'
                        />元
                        <div class="vui-form-item__error">错误提示 DOM </div>
                    </div>
                </div>
                <div class="vui-form-item mt7" >
                    <div><span style="color: red;">*</span>期限/月：</div>
                    <div class="vui-form-item__content">
                        <input type="text"
                               class=" w-12-5 h28 pa vui-input__inner check-obj"
                               v-model="item.applyForDate"
                               @input="$checkForm($event)"
                               data-vui-rule='[{"numMax": 100000000000, "numMin": 0, "tip": "请输入不超过12位数值"},{"decimal": 0, "tip": "请输入整数"},{"require": "true", "tip": "此为必输项"}]'
                        />个月
                        <div class="vui-form-item__error">错误提示 DOM </div>
                    </div>
                </div>
                <div class="vui-form-item mt7" >
                    <div><span style="color: red;">*</span>身份证号码：</div>
                    <div class="vui-form-item__content">
                        <input type="text"
                               class=" w-12-5 h28 pa vui-input__inner check-obj"
                               v-model="item.idcard"
                               @input="$checkForm($event)"
                               :data-vui-rule='loanPlanDataCheck[0].idcard'
                               data-vui-define="checkIdCard"
                        />个月
                        <div class="vui-form-item__error">错误提示 DOM </div>
                    </div>
                </div>
            </div>
        </div>
        <div @click="submitSomething()" style="padding: 5px 15px;background-color: #639af4;width: 100px;height: 30px;line-height: 30px;text-align: center;color:#fff;margin-top: 30px;">校验</div>
    </div>
</div>
<script src="https://unpkg.com/vue"></script>
<!--<script src="vue.min.js"></script>-->
<script src="vue-general-function.0.1.0.js"></script>
<script src="vui-validate.0.1.0.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue.js!',
            month:'',
            loanPlanData: [
                {
                    id: '',
                    creditRequirement: '', // 借款总金额（万元）
                    applyForDate: '', // 期限/月
                    idcard: ''
                }
            ],
            loanPlanDataCheck: [
                {
                    creditRequirement: JSON.stringify([
                        {numMax: 100000000000,  tip:'请输入不超过12位数值'},
                        {decimal: 2, tip: '请输入两位小数以内的数值'}
                    ]),
                    applyForDate: JSON.stringify([
                        {numMax: 100000000000, numMin: 0, tip: '请输入不超过12位数值'},
                        {decimal: 0, tip: '请输入整数'},
                        {require: true, tip: "此为必输项"}
                    ]),
                    idcard: JSON.stringify([
                        {require: true, tip: "此为必输项"}
                    ])
                }
            ],
        },
        methods: {
            submitSomething: function () {
                if (!this.$checkForm(null, '.check-form-loan', this)){
                    console.log('有错误')
                    return
                }
                console.log('正确')
                console.log(this.loanPlanData)
            },
            checkIdCard: function(value){
                if (!this.$checkCardID(value)) {
                    return '请输入正确的身份证号码';
                }
                return '';
            },
        }
    })

</script>

</body>
</html>

```

###  注意事项
- 在指定验证的表单中，表单有 input , 要用 v-if 而不是v-show 渲染，避免对样式设置为 display:none 的未显示的DOM校验


###  最后
- 大家可以多讨论讨论，优化甚至彻底革新这个版本，能够更好地将vue用于我们后台复杂的表单校验。



### vue-validate.0.1.0.css
```css
.vui-form-item__error {
    display: none;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    font-size: 12px;
    color: #b9bdbe;
    white-space: nowrap;
    z-index: 100;
}
.vui-form-item__content{
    position: relative;
}
.vui-input__inner {
    display: inline-block;
    outline: none;
    -webkit-appearance: none;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    border: 1px solid #dee3f0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.vui-form-item.is-error .vui-input__inner{
    border-color: #f56c6c;
}
.vui-form-item.is-error .vui-select__inner{
    border-color: #f56c6c;
}

.is-error .vui-form-item__error{
    display: block;
}

```


### vue-validate.0.1.0.js

- $checkForm 方法是表单校验方法，其他都是值校验

```javascript

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
            var isError = Vue.prototype.$checkObj(value, checkObj, that);
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


Vue.prototype.$checkObj = function (value, obj, vueInstance){
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
            if (rule[i].numMax || rule[i].numMin || rule[i].decimal>=0 || rule[i].type == 'number') {
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
        var res = vueInstance[obj.vuiDefine](value);
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
        if (this.$checkLength(value) > obj.valueStrMax)return '请输入不超过' + obj.valueStrMax + '个字';
        if (obj.valueStrMin && this.$checkLength(value) < obj.valueStrMin  ) return '请输入不小于' + obj.valueStrMin + '个字';
    }
};


```

### vue-general-function.0.1.0.js

```javascript 1.6

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




```


