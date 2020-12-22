<template>
  <div>
    <p>{{direction}}</p>
    <table v-if="direction=='0'" border="0" cellspacing="0" class="zzzb-table" id="hor-table">
      <!-- 这里是表头在第一列的表-->
      <tr v-for="(colHeader, Rid) in optionConfig" :key="Rid + '_row'">
        <td class="zzzb-row-header">
          <div v-if="colHeader.Sortable!=true&&colHeader.FilterAddon!=true" style="float:left;">
            {{ colHeader.Name }}
          </div>
          <div v-if="colHeader.Sortable==true"  style="float:left; margin:0px;" @click="sortColumnData(colHeader.Prop, optionInput)">
            {{ colHeader.Name }}
            <font-awesome-icon v-show="sortShow=='asce'" :icon="['fas','sort-amount-up']" />
            <font-awesome-icon v-show="sortShow=='desc'" :icon="['fas','sort-amount-down']"/>
          </div>
          <div class="filterIcon" style="pointer-events: auto;" v-if="colHeader.FilterAddon==true" @click="findDistinctProp(optionInput, colHeader.Prop)" >
            {{ colHeader.Name }}
            <font-awesome-icon :icon="['fas', 'filter']" />
            <!--显示table：  -->
            <div>
              <table v-if="filterShow['a']==true" class="filterTable" key="filter-table">
                <tr>
                  <td>
                    <input type="checkbox" id="checkbox1"  v-model="selectAll" @change="changeAllChecked(colHeader.Prop)">
                    <label for="checkbox1">Select All</label>
                  </td>
                  <td>
                    <input type="checkbox" id="checkbox2" v-model="cancleAll" @change="cancleAllChecked(colHeader.Prop)">
                    <label for="checkbox2">Clear</label>
                  </td>
                </tr>
                <tr v-for="(item,index) of distinctProp[colHeader.Prop]" :key="index+'_i'">
                  <td id=index>
                    <input type="checkbox" :id=index :value=item v-model="checkedValue">
                    <label for="index">{{item}}</label>
                  </td>
                </tr>
                <tr>
                  <td><button @click="filterProp(colHeader.Prop)">OK</button></td>
                  <td><button @click="cancleQuit()">Cancle</button></td>
                </tr>
              </table>
            </div>
          </div>
          <el-select v-if="colHeader.HeaderOptions !== undefined" size="mini" style="width: 60px" v-model="colHeader.HeaderProp" popper-class="zzzb-popper">
            <el-option v-for="item in colHeader.HeaderOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </td>
        <td class="zzzb-row-data" v-for="(obj, Cid) in viewOptions" :key="Cid + '_col'" @contextmenu.prevent="openMenu(Cid,Rid)">
          <i v-if="obj[colHeader.Prop] === undefined" disabled="true" class="el-icon-remove-outline"></i>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'Input'" v-model="obj[colHeader.Prop]" :readonly="colHeader.ReadOnly" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'NumberInput'" v-model="obj[colHeader.Prop]" :type="colHeader.Type" :fixed="colHeader.Fixed" :symbol="colHeader.Symbol" :symbolUnit="colHeader.SymbolUnit" :readonly="colHeader.ReadOnly" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'ThousandthInput'" v-model="obj[colHeader.Prop]" :type="colHeader.Type" :fixed="colHeader.Fixed" :symbol="colHeader.Symbol" :symbolUnit="colHeader.SymbolUnit" :readonly="colHeader.ReadOnly" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'Underlying'" v-model="obj[colHeader.Prop]" :readonly="colHeader.ReadOnly" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'PercentageValue'" v-model="obj[colHeader.Prop]" :readonly="colHeader.ReadOnly" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'PercentageInput'" :type="colHeader.Type" :fixed="colHeader.Fixed" v-model="obj[colHeader.Prop]" :symbol="colHeader.Symbol" :symbolUnit="colHeader.SymbolUnit" :readonly="colHeader.ReadOnly" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <el-select size="mini" v-else-if="colHeader.Type == 'Select'" v-model="obj[colHeader.Prop]" popper-class="zzzb-popper" :disabled="colHeader.ReadOnly" @keydown.native="changeFocus($event,Rid,Cid)">
            <el-option v-for="item in colHeader.Options" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <el-date-picker size="mini" v-else-if="colHeader.Type == 'Date'" v-model="obj[colHeader.Prop]" popper-class="zzzb-popper" :readonly="colHeader.ReadOnly"></el-date-picker>
          <table v-if="rightMenuShow['row_'+Cid]['col_'+Rid]==true" class="right-menu-table" key="right_menu">
            <tr>
              <td @click="insertEmptProp('0')">向上插入一行</td>
            </tr>
            <tr>
              <td @click="insertEmptProp('1')">向下插入一行</td>
            </tr>
            <tr>
              <td @click="insertEmptData('0')">向左插入一列</td>
            </tr>
            <tr>
              <td @click="insertEmptData('1')">向右插入一列</td>
            </tr>
          </table>
        </td>
        <!-- <td class="pricing-row-data" :key="id + '_col_2'" style="width: 120px">
        <b size="mini">{{sumRow(colHeader)}}</b>
      </td> -->
      </tr>
    </table>
    <!-- 这里是表头在行的展示方式 -->
    <table v-else border="0" cellspacing="0" class="zzzb-table" id="vertical-table">
      <tr class="zzzb-row-header">
        <td class="inline-row" v-for="(colHeader, id) in optionConfig" :key="id + '_column'">
          <div v-if="colHeader.Sortable!=true&&colHeader.FilterAddon!=true">
            {{ colHeader.Name }}
          </div>
          <el-select v-if="colHeader.HeaderOptions !== undefined" size="mini" style="width: 60px" v-model="colHeader.HeaderProp" popper-class="pricing-popper">
            <el-option v-for="item in colHeader.HeaderOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <!-- 这里从optionData父源数据改成了viewOptions -->
          <div class="sortIcon" v-if="colHeader.Sortable==true" @click="sortColumnData(colHeader.Prop,optionInput)">
            {{ colHeader.Name }}
            <font-awesome-icon v-show="sortShow=='asce'" :icon="['fas','sort-amount-up']" />
            <font-awesome-icon v-show="sortShow=='desc'" :icon="['fas','sort-amount-down']" />
          </div>
          <!-- 过滤 -->
          <div class="filterIcon" style="pointer-events: auto;" v-if="colHeader.FilterAddon==true">
            {{ colHeader.Name }}
            <font-awesome-icon :icon="['fas', 'filter']" @click="findDistinctProp(optionInput,colHeader.Prop)" />
            <!--显示table：  -->
            <div>
              <table v-if="filterShow['a']==true" class="filterTable" key="filter-table">
                <tr>
                  <td>
                    <input type="checkbox" id="checkbox1" v-model="selectAll" @change="changeAllChecked(colHeader.Prop)">
                    <label for="checkbox1">Select All</label>
                  </td>
                  <td>
                    <input type="checkbox" id="checkbox2" v-model="cancleAll" @change="cancleAllChecked(colHeader.Prop)">
                    <label for="checkbox2">Clear</label>
                  </td>
                </tr>
                <tr v-for="(item,index) of distinctProp[colHeader.Prop]" :key="index+'_i'">
                  <td id=index>
                    <input type="checkbox" :id=index :value=item v-model="checkedValue">
                    <label for="index">{{item}}</label>
                  </td>
                </tr>
                <tr>
                  <td><button @click="filterProp(colHeader.Prop)">OK</button></td>
                  <td><button @click="cancleQuit()">Cancle</button></td>
                </tr>
              </table>
            </div>
          </div>
        </td>
      </tr>
      <tr v-for="(obj, Rid) in viewOptions" :key="Rid+'_row'">
        <td class="zzzb-row-data" v-for="(colHeader, Cid) in colHeaders" :key="Cid + '_col'" @contextmenu.prevent="openMenu(Rid,Cid)">
          <i v-if="obj[colHeader.Prop] === undefined" disabled="true" class="el-icon-remove-outline"></i>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'Input'" v-model="obj[colHeader.Prop]" :readonly="colHeader.ReadOnly" :ref="'input_'+Rid+'_'+Cid" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'NumberInput'" v-model="obj[colHeader.Prop]" :type="colHeader.Type" :fixed="colHeader.Fixed" :symbol="colHeader.Symbol" :symbolUnit="colHeader.SymbolUnit" :readonly="colHeader.ReadOnly" :ref="'input_'+Rid+'_'+Cid" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'ThousandthInput'" v-model="obj[colHeader.Prop]" :type="colHeader.Type" :fixed="colHeader.Fixed" :symbol="colHeader.Symbol" :symbolUnit="colHeader.SymbolUnit" :readonly="colHeader.ReadOnly" :ref="'input_'+Rid+'_'+Cid" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'Underlying'" v-model="obj[colHeader.Prop]" :readonly="colHeader.ReadOnly" :ref="'input_'+Rid+'_'+Cid" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'PercentageValue'" v-model="obj[colHeader.Prop]" :readonly="colHeader.ReadOnly" :ref="'input_'+Rid+'_'+Cid" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <zzzb-input size="mini" v-else-if="colHeader.Type == 'PercentageInput'" :type="colHeader.Type" :fixed="colHeader.Fixed" v-model="obj[colHeader.Prop]" :symbol="colHeader.Symbol" :symbolUnit="colHeader.SymbolUnit" :readonly="colHeader.ReadOnly" :ref="'input_'+Rid+'_'+Cid" @keydown.native="changeFocus($event,Rid,Cid)"></zzzb-input>
          <el-select size="mini" v-else-if="colHeader.Type == 'Select'" v-model="obj[colHeader.Prop]" popper-class="zzzb-popper" :disabled="colHeader.ReadOnly" :ref="'input_'+Rid+'_'+Cid" @keydown.native="changeFocus($event,Rid,Cid)">
            <el-option v-for="item in colHeader.Options" :key="item.value" :value="item.value"></el-option>
          </el-select>
          <el-date-picker size="mini" v-else-if="colHeader.Type == 'Date'" v-model="obj[colHeader.Prop]" popper-class="zzzb-popper" :readonly="colHeader.ReadOnly"></el-date-picker>
          <table v-if="rightMenuShow['row_'+Rid]['col_'+Cid]==true" class="right-menu-table" key="right_menu">
            <tr>
              <td @click="insertEmptData('0')">上方插入一行</td>
            </tr>
            <tr>
              <td @click="insertEmptData('1')">下方插入一行</td>
            </tr>
            <tr>
              <td @click="insertEmptProp('0')">左侧插入一列</td>
            </tr>
            <tr>
              <td @click="insertEmptProp('1')">右侧插入一列</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>

</template>

<script>
import zzzbInput from '@/components/zzzb-input'
// import { __vlsRenderHelper } from '../../../vue-temp/vue-editor-bridge'
// import { config } from 'vue/types/umd'
export default {
  components: {
    zzzbInput
  },
  props: ['colHeaders', 'data', 'direction'],
  data() {
    return {
      key: 1,
      // 期权的属性
      sortKey: '',
      sortType: 'asce',
      sortShow: '',
      filterShow: { 'a': false },
      // viewOptioncolHeaderMap: {},
      rightMenuShow:{},
      viewOptions:[],
      optionInput:[],
      optionConfig:[],
      checkedValue: [],
      distinctProp: {},
      selectAll: false,
      cancleAll: false,
      distinctNum: 0,
      location:{'row':'','col':''}
    }
  },
  mounted() {
    this.refresh()
  },
  watch: {
    config(newValue) {
      this.config = newValue;
    },
    checkedValue:function(){
      if(this.checkedValue.size==this.distinctNum){
        this.selectAll=true;
        
      }else if(this.checkedValue.size!=0&&this.checkedValue.size!=this.distinctNum){
        // console.log("checkedValue watch!");
        this.selectAll=false;
        this.cancleAll=false;
        // console.log("clear:",this.cancleAll);

      }
    },
    filterShow: function (newValue) {
      this.filterShow = newValue;
    },
  },
  methods: {
    // 从外部注入的数据绑定到table里面
    refresh() {
      console.log('排序', Object.values(this.optionConfig))
      this.optionConfig = Object.values(this.optionConfig).sort(function (a, b) {
        if (a.GroupOrder === b.GroupOrder) {
          return a.FieldOrder - b.FieldOrder
        } else {
          return a.GroupOrder - b.GroupOrder
        }
      })
      this.viewOptions=[];
      this.optionInput=this.data;
      this.optionConfig=this.colHeaders;
      for(var optionKey in this.optionInput){
        var option=this.optionInput[optionKey];
        this.viewOptions.push(option);
      }

      // 为显示右键弹窗的属性赋值
      for(var key in this.optionInput){
        var op=this.optionInput[key];
        console.log("Here!"+key);
        var row='row_'+(key);
        console.log("row:",row);
        this.$set(this.rightMenuShow,row,{});
        for(var i=0;i<Object.keys(op).length;i++){
          
          // this.rightMenuShow['row_'+key-1]['col_'+i]=false;
          this.$set(this.rightMenuShow[row],'col_'+i,false);
          console.log(this.rightMenuShow[row]['col_'+i]);
        }
      }
      
      console.log('排序', this.colHeadersSorted)
    },
    sortColumnData(sortKey, options) {
      var sortType = this.sortType
      var newType;
      // console.log('sortType out:', this.sortType)
      var sortedColumn = options.sort(function (a, b) {
        // 升序
        if (sortType == 'asce') {
          newType = 'desc'
          return a[sortKey] - b[sortKey]
        } else if (sortType == 'desc') {
          // 降序
          newType = 'original'
          return b[sortKey] - a[sortKey]
        } else {
          newType = 'asce'
          return a['TradeID'] - b['TradeID']
        }
      })
      this.sortType = newType
      this.sortShow = sortType
      // console.log("sortShow:", this.sortShow)
      this.viewOptions = [];
      // 这里从改动prop的方式改为用本地新数组来渲染
      for (var optionKey in sortedColumn) {
        var option = sortedColumn[optionKey];
        this.viewOptions.push(option);
      }
    },
    //这里传入optionData和要筛选的prop,得到不重复的prop集合挡在distinct数组里面
    findDistinctProp(options, propName) {
      var x = new Set();
      // var items = Object.values(options);
      for (let item of options) {
        x.add(item[propName]);
      }
      // this.distinctProp[propName]=x;
      this.$set(this.distinctProp, propName, x)
      // console.log("distinct Property:", this.distinctProp[propName]);
      this.filterShow['a'] = true;
      this.distinctNum = this.distinctProp[propName].size;
      // console.log("distinct num:", this.distinctNum);
    },
    //过滤器
    filterProp(prop) {
      // console.log("filter is here!");
      // console.log("checked values :", this.checkedValue);
      // console.log("select All ?", this.selectAll);
      // console.log("cancle all", this.cancleAll);
      if (this.cancleAll != true && this.selectAll != true && this.checkedValue.length != 0) {
        // var values = Object.values(this.optionData);
        // console.log(values);
        var filterData = this.optionInput.filter((currentValue) =>
          this.checkedValue.includes(currentValue[prop])
        )
        this.viewOptions = [];
        for (var optionKey in filterData) {
          var option = filterData[optionKey];
          this.viewOptions.push(option);
        }
      } else {
        if (this.cancleAll == true) {
          this.cancleAll = false;
        }
        this.viewOptions = [];
        for (var Key in this.optionInput) {
          var op = this.optionInput[Key];
          this.viewOptions.push(op);
        }

      }

    },
    // 取消全选
    cancleQuit() {
      this.checkedValue = [];
      this.filterShow['a'] = false;
      this.selectAll = false;
      this.cancleAll = false;
      this.$set(this.filterShow, 'a', false);
      this.$forceUpdate();
      console.log("cancel Quit:", this.filterShow);

    },
    // 这个要配合watch来兼听监听checkbox内选中的值的变化
    changeAllChecked(prop) {
      if (this.selectAll == true) {
        this.checkedValue = this.distinctProp[prop];
        console.log("checkedValue:", this.checkedValue)
      }
    },
    cancleAllChecked() {
      if (this.cancleAll == true) {
        this.checkedValue = [];
      }
      
    },
    openMenu(Rid,Cid){
      this.location['row']=Rid;
      this.location['col']=Cid;
      var rowKey='row_'+this.location['row']
      var colKey='col_'+this.location['col'];
      this.rightMenuShow[rowKey][colKey]=true;
      console.log("Rid:",rowKey,"Cid",colKey);
      console.log("激活了这个右菜单：",this.rightMenuShow[rowKey][colKey]);
    },
    createEmpty(){
      var option={};
      for(let key of this.optionConfig){
        console.log(key.Prop);
        option[key.Prop]='';
      }
      var newOption=option;
      return newOption;
    },
    // createNewProp(propName){
    //   //  { Prop: 'TradeID', Name: '交易编号', Type: 'Input', ReadOnly: true, GroupOrder: 1, FieldOrder: 22 }
    //   var newProp={};
    //   newProp[Prop]=propName;

    // },
    refreshData(){
      this.viewOptions=[];
      for (var Key in this.optionInput){
          var op=this.optionInput[Key];
          this.viewOptions.push(op)
        }
        this.setRightmenu();
    },
    setRightmenu(){
      for(var key in this.optionInput){
        var op=this.optionInput[key];
        console.log("Here!"+key);
        var row='row_'+(key);
        console.log("row:",row);
        this.$set(this.rightMenuShow,row,{});
        for(var i=0;i<Object.keys(op).length;i++){
          this.$set(this.rightMenuShow[row],'col_'+i,false);
          console.log(this.rightMenuShow[row]['col_'+i]);
        }
      }
    },
    //或许应该拆分成insertEmptData/原insertRow
    insertEmptData(choice){
      // 制造一个属性都为空的新对象
      var emptyOption=this.createEmpty();
      console.log("new empty option:",emptyOption)
      var Row;
      console.log("改动前:",this.optionInput);
      if(choice=="0"){
        Row=this.location['row'];
        this.optionInput.splice(Row,0,emptyOption);
        console.log("改动后",this.optionInput);
      }else{
        Row=this.location['row']+1;
        this.optionInput.splice(Row,0,emptyOption);
        console.log("改动后",this.optionInput);
      }
      this.refreshData();
    },
    // insertEmptProp原insertCol
    insertEmptProp(choice){
      var position;
      var group=this.optionConfig[this.location['col']]['GroudOrder'];
      var field=this.optionConfig[this.location['col']]['FieldOrder'];
      if(choice=="0"){
        position=this.location['col'];
         let newProp={Prop:'NewProperty',Name:'新属性',Type:'input',ReadOnly:false,GroudOrder:group,FieldOrder:field-1};
        // 给congif里面插入一个新属性
        this.optionConfig.splice(position,0,newProp);
        for(let key in this.optionInput){
        this.$set(this.optionInput[key],newProp.Prop,0);
        }
        console.log("option data:",this.optionInput);
        console.log("option config:",this.optionConfig);
        this.refreshData();
      }else{
        position=this.location['col']+1;
        let newProp={Prop:'NewProperty',Name:'新属性',Type:'input',ReadOnly:false,GroudOrder:group,FieldOrder:field+1};
        this.optionConfig.splice(position,0,newProp);
        for(let key in this.optionInput){
          this.$set(this.optionInput[key],newProp.Prop,0);
        }
        console.log("option data:",this.optionInput);
        console.log("option config:",this.optionConfig);
        this.refreshData();
      }
      

    },
    changeFocus(ev,row,col){
      var code=ev.keyCode;
      // var oldRef='input_'+row+'_'+col;
      // var newRef;
      // var refs=this.$refs;
      var tableId;
      if(this.direction=='1'){
        tableId='vertical-table'; 
      }else{
        tableId='hor-table';
      }
      var row_len=document.getElementById(tableId).rows.length-1;
      console.log("row len:",row_len);
      var col_len=document.getElementById(tableId).rows[0].cells.length;
      console.log("col len:",col_len);
      var objBefore;
      if(this.direction=='1'){
        objBefore=document.getElementById(tableId).rows[row+1].cells[col];
      }else{
        objBefore=document.getElementById(tableId).rows[row].cells[col+1];
      }
      
      var inputBefore=objBefore.getElementsByClassName("zzzb-input__inner")[0]
      // var objBefore=this.$refs[oldRef];

      console.log("Before:",inputBefore);
      console.log("row:",row,"col:",col);
      var event=new Event('blur',{
        bubbles:true,
        cancelable:true
      });
      inputBefore.dispatchEvent(event);
     
      // console.log("objBefore:",objBefore);
      // console.log(this.$refs);
      // console.log(oldRef,this.$refs[oldRef][0]);
      // this.$refs[oldRef][0].fireEvent('blur');
      // console.log(oldRef,this.$refs[oldRef][0]);
      switch(code){
        // 左
        case 37:
          if(col-1>=0){
            col--;
          }
          break;
        // 向上
        case 38:
          if(row-1>=0){
            row--;
          }
          break;
        // 向右
        case 39:
          if(col+1<col_len){
            col++;
          }
          break;
        // 向下
        case 40:
          if(row+1<row_len){
            row++;
          }
          break;
      }
      // 这里手动触发了新Dom元素的focus事件
      var objAfter;
      if(this.direction=='1'){
        objAfter=document.getElementById(tableId).rows[row+1].cells[col];
      }else{
        objAfter=document.getElementById(tableId).rows[row].cells[col+1];
      }
      var inputAfter=objAfter.getElementsByClassName("zzzb-input__inner")[0];
      console.log("row:",row,"col:",col);
      console.log("After:",inputAfter);
      var event2=new Event('focus',{
        bubbles:true,
        cancelable:true
      });
      inputAfter.dispatchEvent(event2);
      // objAfter.focus();
      // objAfter.fireEvent('focus');
      // newRef='input_'+row+'_'+col;
      // console.log('input_'+row+'_'+col,this.$refs[newRef][0]);
      // this.$refs[newRef][0].fireEvent('focus');
      // console.log('input_'+row+'_'+col,this.$refs[newRef][0]);
      
      // this.$refs.newRef.focus();
      ev.preventDefault();
      
      
    }


  },
}
</script>

<style lang="scss">
@import "@/assets/style/citic-style-grid.scss";
</style>