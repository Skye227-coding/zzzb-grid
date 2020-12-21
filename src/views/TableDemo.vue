<template>
  <div>
    <table v-if="direction=='horizional'" border="0" cellspacing="0" class="pricing-table">
    <!-- 这里是展示框的开始-->
      <tr v-for="(rowHeader, id) in viewOptionRowHeaders" :key="id + '_row'">
        <td class="pricing-row-header">
          {{ rowHeader.Name }}
        <!--  -->
          <el-select v-if="rowHeader.HeaderOptions !== undefined" size="mini" style="width: 60px" v-model="rowHeader.HeaderProp" popper-class="pricing-popper">
            <el-option v-for="item in rowHeader.HeaderOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </td>  
        <td class="pricing-row-header" style="width: 120px">
          <div v-if="rowHeader.Sortable==true" >
           <button  @click="sortColumnData('asce', rowHeader.Prop,optionData)"><font-awesome-icon :icon="['fas','sort-amount-up']"/></button>
           <button @click="sortColumnData('desc',rowHeader.Prop,optionData)"><font-awesome-icon :icon="['fas','sort-amount-down']"/></button>
          </div>
        </td>
        <td class="pricing-row-data" v-for="(data, id) in viewOptions" :key="id + '_col'" style="width: 120px">
          <i v-if="data.option[rowHeader.Prop] === undefined" disabled="true" class="el-icon-remove-outline"></i>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'Input'" v-model="data.option[rowHeader.Prop]" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'NumberInput'" v-model="data.option[rowHeader.Prop]" :type="rowHeader.Type" :fixed="rowHeader.Fixed" :symbol="rowHeader.Symbol" :symbolUnit="rowHeader.SymbolUnit" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'ThousandthInput'" v-model="data.option[rowHeader.Prop]" :type="rowHeader.Type" :fixed="rowHeader.Fixed" :symbol="rowHeader.Symbol" :symbolUnit="rowHeader.SymbolUnit" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'Underlying'" v-model="data.option[rowHeader.Prop]" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'PercentageValue'" v-model="data.option[rowHeader.Prop]" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'PercentageInput'" :type="rowHeader.Type" :fixed="rowHeader.Fixed" v-model="data.option[rowHeader.Prop]" :symbol="rowHeader.Symbol" :symbolUnit="rowHeader.SymbolUnit" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <el-select size="mini" v-else-if="rowHeader.Type == 'Select'" v-model="data.option[rowHeader.Prop]" popper-class="pricing-popper" :disabled="rowHeader.ReadOnly">
            <el-option v-for="item in rowHeader.SelectOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <el-date-picker size="mini" v-else-if="rowHeader.Type == 'Date'" v-model="data.option[rowHeader.Prop]" popper-class="pricing-popper" :readonly="rowHeader.ReadOnly"></el-date-picker>
        </td>
      <!-- <td class="pricing-row-data" :key="id + '_col_2'" style="width: 120px">
        <b size="mini">{{sumRow(rowHeader)}}</b>
      </td> -->
      </tr>
    </table>
    <table v-else border="0" cellspacing="0" class="pricing-table">
    <!-- 这里是展示框的开始-->
      <tr class="pricing-row-header">
        <td v-for="(rowHeader, id) in viewOptionRowHeaders" :key="id + '_column'" style="width: 120px">
          {{ rowHeader.Name }}
          <el-select v-if="rowHeader.HeaderOptions !== undefined" size="mini" style="width: 60px" v-model="rowHeader.HeaderProp" popper-class="pricing-popper">
            <el-option v-for="item in rowHeader.HeaderOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </td>
      </tr>
      <tr class="pricing-row-header">
        <td v-for="(rowHeader, id) in viewOptionRowHeaders" :key="id + '_column'">
          <div v-if="rowHeader.Sortable==true" >
           <button  @click="sortColumnData('asce', rowHeader.Prop,optionData)"><font-awesome-icon :icon="['fas','sort-amount-up']"/></button>
           <button @click="sortColumnData('desc',rowHeader.Prop,optionData)"><font-awesome-icon :icon="['fas','sort-amount-down']"/></button>
          </div>
        </td>
      </tr>
      <tr v-for="(data, id) in viewOptions" :key="id+'_row'">
        <td class="pricing-row-data" v-for="(rowHeader, id) in viewOptionRowHeaders" :key="id + '_col'" style="width:120px">
          <i v-if="data.option[rowHeader.Prop] === undefined" disabled="true" class="el-icon-remove-outline"></i>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'Input'" v-model="data.option[rowHeader.Prop]" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'NumberInput'" v-model="data.option[rowHeader.Prop]" :type="rowHeader.Type" :fixed="rowHeader.Fixed" :symbol="rowHeader.Symbol" :symbolUnit="rowHeader.SymbolUnit" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'ThousandthInput'" v-model="data.option[rowHeader.Prop]" :type="rowHeader.Type" :fixed="rowHeader.Fixed" :symbol="rowHeader.Symbol" :symbolUnit="rowHeader.SymbolUnit" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'Underlying'" v-model="data.option[rowHeader.Prop]" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'PercentageValue'" v-model="data.option[rowHeader.Prop]" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <zzzb-input size="mini" v-else-if="rowHeader.Type == 'PercentageInput'" :type="rowHeader.Type" :fixed="rowHeader.Fixed" v-model="data.option[rowHeader.Prop]" :symbol="rowHeader.Symbol" :symbolUnit="rowHeader.SymbolUnit" :readonly="rowHeader.ReadOnly"></zzzb-input>
          <el-select size="mini" v-else-if="rowHeader.Type == 'Select'" v-model="data.option[rowHeader.Prop]" popper-class="pricing-popper" :disabled="rowHeader.ReadOnly">
            <el-option v-for="item in rowHeader.SelectOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <el-date-picker size="mini" v-else-if="rowHeader.Type == 'Date'" v-model="data.option[rowHeader.Prop]" popper-class="pricing-popper" :readonly="rowHeader.ReadOnly"></el-date-picker>
        </td>
      </tr>
    </table>
  </div>

</template>

<script>
import zzzbInput from '@/components/zzzb-input'
export default {
  components: {
    zzzbInput
  },
  props:['config','optionData','direction'],
  data() {
    return {
      key: 1,
      // 期权的属性
      sortKey:'',
      viewOptionRowHeaderMap: {},
      viewOptionRowHeaders: [],
      viewOptions: [],
    }
  },
  mounted() {
    this.refresh()
  },
  watch:{
    config(newValue){
      this.config=newValue;
    },
    optionData(newValue){
      this.optionData=newValue;
    }
  },
  methods: {
    // 从外部注入的数据绑定到table里面
    refresh() {
      // 期权的属性
      this.viewOptionRowHeaderMap = {}
      this.viewOptionRowHeaders = []
      this.viewOptions = []
      console.log("refresh:",this.optionData);
      for (var optionKey in this.optionData) {
        var option = this.optionData[optionKey]
        this.viewOptionRowHeaderMap = this.MergeOtcOption(this.viewOptionRowHeaderMap, option)
        this.viewOptions.push({ key: optionKey, option: option })
        this.viewOptionRowHeaders = this.SortRowHeader(this.viewOptionRowHeaderMap)
      }
      // console.log(this.viewOptionRowHeaders)
      // console.log(this.viewOptions)
    },
    MergeOtcOption(viewOptionRowHeaderMap, option) {
      for (var key in option) {
        if (!(key in viewOptionRowHeaderMap)) {
          if (!Object.prototype.hasOwnProperty.call(this.config, key)) {
            continue
          }
          console.log(this.config[key]['Name'])
          var optionRowHeader = {
            Name: this.config[key]['Name'],
            HeaderProp: key,
            Prop: key,
            ReadOnly: this.config[key]['ReadOnly'],
            Type: this.config[key]['Type'], // 这边后面改成从字典获取，字典可以通过页面来配置
            Fixed: this.config[key]['Fixed'],
            Symbol: this.config[key]['Symbol'],
            SymbolUnit: this.config[key]['SymbolUnit'],
            HeaderOptions: this.config[key]['HeaderOptions'], // 这个是用来设置行头的Select的Source的
            SelectOptions: this.config[key]['Options'],
            GroupName: '', // 这边后面改成从字典获取，字典可以通过页面来配置
            GroupOrder: this.config[key]['GroupOrder'], // 这边后面改成从字典获取，字典可以通过页面来配置
            FieldOrder: this.config[key]['Order'], // 这边后面改成从字典获取，字典可以通过页面来配置
            Sortable:this.config[key]['Sortable']

          }
          if (optionRowHeader.Type === 'PercentageValue') {
            optionRowHeader.HeaderProp = '%'
            optionRowHeader.HeaderOptions = [
              { label: '%', value: '%' },
              { label: '￥', value: '￥' }
            ]
          }
          viewOptionRowHeaderMap[key] = optionRowHeader
        }
      }
      return viewOptionRowHeaderMap
    },
    SortRowHeader(viewOptionRowHeaderMap) {
      // 分组 组内 排序
      var viewOptionRowHeaders = Object.values(viewOptionRowHeaderMap).sort(function (a, b) {
        if (a.GroupOrder === b.GroupOrder) {
          return a.FieldOrder - b.FieldOrder
        } else {
          return a.GroupOrder - b.GroupOrder
        }
      })
      return viewOptionRowHeaders
    },
    sortColumnData(orderType,sortKey,options){
      var sortedColumn=Object.values(options).sort(function(a,b){
        // 升序
        if(orderType=='asce'){
         return a[sortKey]-b[sortKey]
        }else{
        // 降序
        return b[sortKey]-a[sortKey]
        }
      })
      this.optionData=sortedColumn;
      this.refresh();
      
    }
  }
}
</script>

<style lang="sass" scoped>
$borderColor: rgb(255, 252, 250)
$backGroundColor: rgb(230, 224, 221)
$borderColorReadOnly: rgb(12, 16, 41)
$backGroundColorReadOnly: rgb(20, 24, 53)
$backGroundColorHover: rgb(40, 52, 67)
$fontColor: rgb(255, 114, 37)
$fontColorReadOnly: rgb(75, 73, 73)
$heght: 25px

.pricing-table
  border: 0px solid
  text-align: center
  font-size: 12px
  background-color: $backGroundColor
  height: $heght

  .pricing-row-header
    color: rgb(230, 224, 221)
    background-color: rgb(216, 31, 47)
    font-color: rgb(230, 224, 221) !important
    height: $heght

  .pricing-row-data
    background-color: rgb(230, 224, 221)
    border-bottom: 1px solid $borderColor
    border-right: 1px solid $borderColor
    height: $heght
    font-size: 12px

    .el-input
      width: 100%
      border: solid $borderColor 0px
      height: $heght
      font-size: 12px

  & :read-only
    color: $fontColorReadOnly
    font-size: 12px

    .el-select .el-input
      :read-only
        color: $fontColor
        font-size: 12px

    .el-select .el-input
      :disabled
        color: $fontColorReadOnly
        font-size: 12px

    .el-select .el-input.is-disabled .el-input__suffix :read-only
      color: $fontColorReadOnly !important

  __inner
      color: $fontColor
      background-color: $backGroundColor
      border: solid $borderColor 0px
      text-align: center
      padding: 0px !important
      height: $heght

  -group__append
      color: $fontColor
      background-color: $backGroundColor
      border: solid $borderColor 0px
      text-align: center
      height: $heght
      border: 0px
      padding: 0 10px !important
      margin-bottom: 0px
      margin-top: 0px

.pricing-popper
  background-color: $backGroundColor
  border: solid $borderColor 0px
  margin: 0px !important

  & .el-select-dropdown__list
    padding: 0px

  & .el-select-dropdown__item
    color: $fontColor
    background: $backGroundColor
    border: solid $borderColor 0px
    font-size: 12px
    text-align: center

  & .el-select-dropdown__item.hover,

  & .el-select-dropdown__item:hover
    background: $backGroundColorHover

  & .el-picker-panel__content
    color: $fontColor

  & .popper__arrow
    display: none

  & .popper__arrow::after
    display: none
</style>