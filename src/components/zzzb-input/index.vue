<template>
  <div class="zzzb-input">
    <input v-if="readonly" class="zzzb-input__inner" v-bind:value="formatValue" :readonly="readonly" ref="input" v-on:input="updatevalue($event.target.value)" />
    <input v-else class="zzzb-input__inner" v-bind:value="formatValue" :readonly="readonly" ref="input" v-on:input="updatevalue($event.target.value)" @blur="onBlur" @focus="selectAll" />

    <!-- <input class="el-input__inner" v-bind:value="formatValue" :readonly="readonly" ref="input" v-on:input="updatevalue($event.target.value)" v-on:blur="onBlur" v-on:focus="selectAll" /> -->
  </div>
</template>

<script>
export default {
  name: 'zzzb-input-demo',
  props: {
    readonly: {
      type: Boolean,
      default: false,
      desc: '是否只读'
    },
    value: {
      type: [String, Number],
      default: '',
      desc: '数值'
    },
    symbol: {
      type: String,
      default: undefined,
      desc: '货币标识符'
    },
    symbolUnit: {
      type: String,
      default: '',
      desc: '货币单位'
    },
    type: String,
    fixed: {
      type: Number,
      default: undefined,
      desc: '小数位'
    },
    thousand: Boolean
  },
  data() {
    return {
      focused: false
    }
  },
  // created() {
  //   this.viewValue = this.value
  // },
  computed: {
    formatValue() {
      // console.log("value before :",this.value);
      // console.log('formatValue', this.focused);
      if (this.value === '')
       { return this.value }
      // 焦点在这就返回原始值
      if (this.focused) {
        return this.value
      } else {
        // console.log("Here:")
        // 焦点不在这就返回格式化之后的值
        var data = this.value
        if (this.fixed!=undefined) {
          data = this.formatFixed(data, this.fixed)
          // console.log("fixed!")
        }
        if (this.type === 'PercentageInput') {
          data = this.formatPercentage(data, this.fixed)
          // console.log("percentage")
        }
        if (this.type === 'ThousandthInput') {
          data = this.formatThousand(data)
          // console.log("thousands")
        }
        if (this.symbol!=undefined) {
          data = this.symbol + data + this.symbolUnit
          // console.log("symbol")
        }
        // console.log("format value type: ",typeof this.value)
        // console.log("value in else: ",data);
        
        return data
      }
      
    }
  },
  watch:{
    readonly(newValue){
      this.readonly=newValue;
      console.log("我检测到了input组件里的变化",this.readonly);

    }

  },
  methods: {
    unFixed(num) {
      return num.toString().replace(',', '')
    },
    formatFixed(num, fixed) {
      var value = parseFloat(num).toFixed(fixed)
      // console.log('Fiexd: ' + this.realValue, value)
      return value
    },
    formatPercentage(num, fixed) {
      // console.log('Percentage: ' + this.realValue, num)
      var value = (parseFloat(num) * 100).toFixed(fixed - 2) + '%'
      // console.log('Percentage: ' + this.realValue, value)
      return value
    },
    unThousand(num) {
      return num.toString().replace(',', '')
    },
    formatThousand(num) {
      num += ''
      if (!num.includes('.')) num += '.'
      var value = num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) { return $1 + ',' }).replace(/\.$/, '')
      // console.log('Thousand: ' + this.realValue, value)
      return value
    },
    updatevalue(value) {
      console.log("更新了数据！");
      // console.log('Update: ' + value)
      // var formatvalue = this.formatValue(value)
      this.$emit('input', value)
    },
    onBlur() {
      // console.log('On blur')
      this.focused = false
      // this.$emit('blur')
      // this.dispatch('ElFormItem', 'el.form.blur', [this.value])
    },
    selectAll(event) {

      this.focused = true
     
      setTimeout(() => {
        event.target.select()
      }, 10)
    },
    // dispatch(componentName, eventName, params) {
    //   var parent = this.$parent || this.$root
    //   var name = parent.$options.componentName
    //   while (parent && (!name || name !== componentName)) {
    //     parent = parent.$parent
    //     if (parent) {
    //       name = parent.$options.componentName
    //     }
    //   }
    //   if (parent) {
    //     parent.$emit.apply(parent, [eventName].concat(params))
    //   }
    // }
  }
}
</script>




