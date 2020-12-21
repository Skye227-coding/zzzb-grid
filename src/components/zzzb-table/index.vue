<template>
  <div>
    <table v-if="direction=='horiziontal'" border="0" cellspacing="0" class="pricing-table">
    <!-- 这里是表头在第一列的表-->
      <tr v-for="(rowHeader, id) in viewOptionRowHeaders" :key="id + '_row'">
        <td class="pricing-row-header">
          <div v-if="rowHeader.Sortable!=true&&rowHeader.FilterAddon!=true" style="float:left;">
            {{ rowHeader.Name }}
          </div>
          <div v-if="rowHeader.Sortable==true" @click="sortColumnData(rowHeader.Prop,optionData)" style="float:left; margin:0px;">
            {{ rowHeader.Name }}
            <font-awesome-icon v-show="sortShow=='asce'" :icon="['fas','sort-amount-up']"/>
            <font-awesome-icon v-show="sortShow=='desc'" :icon="['fas','sort-amount-down']"/>
          </div>
          <div class="filterIcon" style="pointer-events: auto;" v-if="rowHeader.FilterAddon==true" @click="findDistinctProp(optionData,rowHeader.Prop)">
            {{ rowHeader.Name }}
            <font-awesome-icon :icon="['fas', 'filter']"/>
            <!--显示table：  -->
            <div>
              <table v-if="filterShow['a']==true" class="filterTable" key="filter-table">
                <tr>
                  <!-- <td>
                    <input type="checkbox" id="checkbox1"  v-model="selectAll" @change="changeAllChecked(rowHeader.Prop)">
                    <label for="checkbox1">Select All</label>
                  </td> -->
                  <td>
                    <input type="checkbox" id="checkbox2"  v-model="cancleAll" @change="cancleAllChecked(rowHeader.Prop)">
                    <label for="checkbox2">Clear</label>
                  </td>
                </tr>
                <tr v-for="(item,index) of distinctProp[rowHeader.Prop]" :key="index+'_i'">
                  <td id=index>
                    <input type="checkbox" :id=index :value=item v-model="checkedValue">
                    <label for="index">{{item}}</label>
                  </td>
                </tr>
                <tr>
                  <td><button @click="filterProp(rowHeader.Prop)">OK</button></td>
                  <td><button @click="cancleQuit()">Cancle</button></td>
                </tr>
              </table>
            </div>
          </div>
        <!--  -->
          <el-select v-if="rowHeader.HeaderOptions !== undefined" size="mini" style="width: 60px" v-model="rowHeader.HeaderProp" popper-class="pricing-popper">
            <el-option v-for="item in rowHeader.HeaderOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </td>  
        <td class="pricing-row-data" v-for="(data, id) in viewOptions" :key="id + '_col'" style="width: 50px">
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
    <!-- 这里是表头在行的展示方式 -->
    <table v-else border="0" cellspacing="0" class="pricing-table">
      <tr class="pricing-row-header">
        <td class="inline-row" v-for="(rowHeader, id) in viewOptionRowHeaders" :key="id + '_column'">
          <div v-if="rowHeader.Sortable!=true&&rowHeader.FilterAddon!=true">
            {{ rowHeader.Name }}
          </div>
          <el-select v-if="rowHeader.HeaderOptions !== undefined" size="mini" style="width: 60px" v-model="rowHeader.HeaderProp" popper-class="pricing-popper">
            <el-option v-for="item in rowHeader.HeaderOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <!-- 这里从optionData父源数据改成了viewOptions -->
          <div class="sortIcon" v-if="rowHeader.Sortable==true" @click="sortColumnData(rowHeader.Prop,optionData)">
            {{ rowHeader.Name }}
            <font-awesome-icon v-show="sortShow=='asce'" :icon="['fas','sort-amount-up']"/>
            <font-awesome-icon v-show="sortShow=='desc'" :icon="['fas','sort-amount-down']"/>
          </div>
          <!-- 过滤 -->
          <div class="filterIcon" style="pointer-events: auto;" v-if="rowHeader.FilterAddon==true" >
            {{ rowHeader.Name }}
            <font-awesome-icon :icon="['fas', 'filter']" @click="findDistinctProp(optionData,rowHeader.Prop)"/>
            <!--显示table：  -->
            <div>
              <table v-if="filterShow['a']==true" class="filterTable" key="filter-table">
                <tr>
                  <td>
                    <input type="checkbox" id="checkbox1"  v-model="selectAll" @change="changeAllChecked(rowHeader.Prop)">
                    <label for="checkbox1">Select All</label>
                  </td>
                  <td>
                    <input type="checkbox" id="checkbox2"  v-model="cancleAll" @change="cancleAllChecked(rowHeader.Prop)">
                    <label for="checkbox2">Clear</label>
                  </td>
                </tr>
                <tr v-for="(item,index) of distinctProp[rowHeader.Prop]" :key="index+'_i'">
                  <td id=index>
                    <input type="checkbox" :id=index :value=item v-model="checkedValue">
                    <label for="index">{{item}}</label>
                  </td>
                </tr>
                <tr>
                  <td><button @click="filterProp(rowHeader.Prop)">OK</button></td>
                  <td><button @click="cancleQuit()">Cancle</button></td>
                </tr>
              </table>
            </div>
          </div>
        </td>
      </tr>
      <tr v-for="(data, id) in viewOptions" :key="id+'_row'">
        <td class="pricing-row-data" v-for="(rowHeader, id) in viewOptionRowHeaders" :key="id + '_col'" style="width: 50px">
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
  props: ['config', 'optionData', 'direction'],
  data() {
    return {
      key: 1,
      // 期权的属性
      sortKey: '',
      sortType: 'asce',
      sortShow: '',
      filterShow:{'a':false},
      viewOptionRowHeaderMap: {},
      viewOptionRowHeaders: [],
      viewOptions: [],
      checkedValue:[],
      distinctProp:{},
      selectAll:false,
      cancleAll:false,
      distinctNum:0
    }
  },
  mounted() {
    this.refresh()
  },
  watch: {
    config(newValue) {
      this.config = newValue;
    },
    optionData(newValue) {
      this.optionData = newValue;
    },
    checkedValue:function(){
      if(this.checkedValue.size==this.distinctNum){
        this.selectAll=true;
        
      }else if(this.checkedValue.size!=0&&this.checkedValue.size!=this.distinctNum){
        console.log("checkedValue watch!");
        this.selectAll=false;
        this.cancleAll=false;

      }
    },
    filterShow:function(newValue){
      this.filterShow=newValue;

    },
    
  },
  methods: {
    // 从外部注入的数据绑定到table里面
    refresh() {
      // 期权的属性
      this.viewOptionRowHeaderMap = {}
      this.viewOptionRowHeaders = []
      this.viewOptions = []
      console.log("refresh:", this.optionData);
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
            Sortable:this.config[key]['Sortable'],
            FilterAddon:this.config[key]['FilterAddon']
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
    sortColumnData(sortKey, options) {
      var sortType = this.sortType
      var newType;
      console.log('sortType out:', this.sortType)
      var sortedColumn = Object.values(options).sort(function (a, b) {
        // 升序
        if(sortType=='asce'){
          newType='desc'
          return a[sortKey]-b[sortKey]
        }else if(sortType=='desc'){
        // 降序
          newType='original'
          return b[sortKey]-a[sortKey]
        }else{
          newType='asce'
          return a['TradeID']-b['TradeID']
        }
      })
      this.sortType = newType
      this.sortShow = sortType
      console.log("sortShow:", this.sortShow)
      this.viewOptions=[];
      // 这里从改动prop的方式改为用本地新数组来渲染
      for (var optionKey in sortedColumn){
        var option=sortedColumn[optionKey];
        this.viewOptions.push({ key: optionKey, option: option })
      }
      // this.optionData = sortedColumn;
      // this.refresh();
      
    },
    //这里传入optionData和要筛选的prop,得到不重复的prop集合挡在distinct数组里面
    findDistinctProp(options,propName){
      var x=new Set();
      var items=Object.values(options);
      for( let item of items){
         x.add(item[propName]);
      }
      // this.distinctProp[propName]=x;
      this.$set(this.distinctProp,propName,x)
      console.log("distinct Property:",this.distinctProp[propName]);
      this.filterShow['a']=true;
      this.distinctNum=this.distinctProp[propName].size;
      console.log("distinct num:",this.distinctNum);
    },
    //过滤器
    filterProp(prop){
      console.log("filter is here!");
      console.log("checked values :",this.checkedValue);
      console.log("select All ?",this.selectAll);
      console.log("cancle all",this.cancleAll);
      if(this.cancleAll!=true&&this.selectAll!=true&&this.checkedValue.length!=0){
        var values=Object.values(this.optionData);
        console.log(values);
        var filterData=values.filter((currentValue)=>
          this.checkedValue.includes(currentValue[prop])
       )
        this.viewOptions=[];
        for (var optionKey in filterData){
          var option=filterData[optionKey];
          this.viewOptions.push({ key: optionKey, option: option })
        }
      }else{
        if(this.cancleAll==true){
          this.cancleAll=false;
        }
        this.viewOptions=[];
        for (var Key in this.optionData){
          var op=this.optionData[Key];
          this.viewOptions.push({ key: optionKey, option: op })
        }

      }

    },
    // 取消全选
    cancleQuit(){
      this.checkedValue=[];
      this.filterShow['a']=false;
      this.selectAll=false;
      this.cancleAll=false;
      this.$set(this.filterShow,'a',false);
      this.$forceUpdate();
      console.log("cancel Quit:",this.filterShow);

    },
    // 这个要配合watch来兼听监听checkbox内选中的值的变化
    changeAllChecked(prop){
    if(this.selectAll==true){
      this.checkedValue=this.distinctProp[prop];
      console.log("checkedValue:",this.checkedValue)
      } 
    },
    cancleAllChecked(){
      if(this.cancleAll==true){
        this.checkedValue=[];
      }
    }

  },
}
</script>

<style lang="scss">
@import "@/assets/style/ag-dark-style.scss";

</style>