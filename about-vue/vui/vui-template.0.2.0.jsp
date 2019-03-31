<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>我的门店管理--业务尽调--综合经营情况</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/screen.css" rel="stylesheet">
    <link href="/layer/theme/default/layer.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/viewer.css">
    <!--<link href="//pic.qianxiangbank.com/www/newResource/poshytip/src/tip-yellow/tip-yellow.css" rel="stylesheet">-->
    <link href="/css/baseStyle.css" rel="stylesheet">
    <link rel="stylesheet" href="   /css/investigate-compre.css">
    <!--[if lt IE 9]>
    <script src="/js/html5shiv.min.js"></script>
    <script src="/js/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<section class="height-100">
    <div id="content">
        <div class="bgc-fff clearfix pt-1-5 pb-1-5 pr-2">
            <div class="left page-title">业务尽调</div>
            <div class="left num-str-title">
                &nbsp;<span class="hyphen">—</span>&nbsp;编号：${investigate.lxNumber}
            </div>
        </div>
        <vui-select
                :rules="testRules"
                v-model="testValue"
                :name="name"
                :options="options"
                :nameId="id">
        </vui-select>
    </div>
</section>
<script type="text/template" id="vui-select">
    <div class="vui-form-item " :class="{'is-error': error}">
        <div class="vui-form-item__content">
            <div :class="[
                    {
                        'is-disabled': selectDisabled,
                    }
                ]">
                <select class="vui-select__inner"
                        :value="value"
                        :disabled="disabled">
                    <option v-if="defaultEmpty">请选择</option>
                    <option
                            v-for="(item, index) in options"
                            :value="item[nameId]">
                        {{item[name]}}
                    </option>
                </select>
            </div>
            <div class="vui-form-item__error">{{errorTip}}</div>
        </div>
    </div>
</script>
<script type="text/template">
    <div class="vui-form-item " :class="{'is-error': error}">
        <div class="vui-form-item__content">
            <div :class="[
                type === 'textarea' ? 'vui-textarea' : 'vui-input',
                    {
                        'is-disabled': inputDisabled,
                    }
                ]">
                <input
                        v-if="type !== 'textarea'"
                        class="vui-input__inner"
                        v-bind="$attrs"
                        :type="type"
                        :disabled="inputDisabled"
                        :readonly="readonly"
                        :autocomplete="autoComplete || autocomplete"
                        :value="nativeInputValue"
                        ref="input"
                        @input="handleInput"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @change="handleChange"
                >
                <textarea
                        v-else
                        class="vui-textarea__inner"
                        :value="nativeInputValue"
                        @input="handleInput"
                        ref="textarea"
                        v-bind="$attrs"
                        :disabled="inputDisabled"
                        :readonly="readonly"
                        :autocomplete="autoComplete || autocomplete"
                        :style="textareaStyle"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @change="handleChange"
                >
        </textarea>
            </div>
            <div class="vui-form-item__error">{{errorTip}}</div>
        </div>
    </div>
</script>
<script src="/layer/layer.js"></script>
<script src="/js/jquery.enplaceholder.js"></script>
<script src="/js/jquery.nicescroll.min.js"></script>
<script src="//pic.qianxiangbank.com/www/newResource/poshytip/src/jquery.poshytip.min.js"></script>

<script src="/js/moment.min.js"></script>
<script src="/js/axios.min.js"></script>
<script src="/js/vue.min.js"></script>
<script src="/js/es6-promise.min.js"></script>
<script src="/js/about-vue/vui/instance-axios.0.2.0.js"></script>
<script src="/js/about-vue/vui/vui-all.0.2.0.js"></script>

<script src="/js/My97DatePicker/WdatePicker.js"></script>
<script src="/js/utils/addressUtils.js"></script>
<script src="/js/utils/dataUtils.js"></script>

<script src="/js/app.js"></script>
<script>
    var vm = new Vue({
        el: "#content",
        data: {
            testRules:[
                {required: true}
            ],
            testValue: 1,
            name: 'name',
            nameId: 'id',
            options: [
                {id: 1, name: '11'},
                {id: 2, name: '22'}
            ]
        },
        mounted: function () {
            /*初始化加载*/
            var jdN = document.querySelector("#jdNumber").value;
            var jId = document.querySelector("#jdId").value;

            this.getNothingTest();

        },
        methods: {
            getNothingTest: function(){
                var sendData = {
                    id: ''
                };
                var config = {
                    url: '/fkjdStoreCtrl/getFkjdStoreById',
                    type: 'post',
                    token: '',
                    contentType: 'json',
                    params: sendData
                };
                axiosRequest(config)
                    .then(function (res) {
                        console.log(res);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }
        }
    });
</script>

</body>
</html>