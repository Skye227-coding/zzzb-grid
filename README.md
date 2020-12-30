# zzzb-grid

## install
```
npm install zzzb-grid --save
```
## features
- 1.vertical view and horizontal view
- 2.format your input cells with customized configuration like:readonly,precentage,thousands, reserve decimal
- 3.sorting function
- 4.filter function
- 5.change the focused cell with up down left down key
- 6.enter edit mode with any key
- 7.save change with enter key
- 8.exit edit mode with esc key
- 9.set threshold to display data with different style
### 功能
- 1.可以设置为表头在第一行的垂直表，也可以设置成表头在第一列的水平表
- 2.可以格式化表格的单元格
- 3.可以点击表头排序(正->逆->原)
- 4.可以过滤筛选数据
- 5.可以使用方向键来移动光标
- 6.点击任意键进入编辑模式
- 7.使用enter键来保存编辑的数据
- 8.使用esc键来退出编辑模式
- 9.使用阈值来设置条件样式

## demo for configuration
You can use a vue file as a data source and a table header setting configuration.
The example is shown below.
你可以使用一个vue文件来作为一个数据源和表头配置文件，示例如下。
```
<template>
  <div class="outer-container">
    <p>Custom table</p>
    <div class="config-table">
      <table class="zzzb-table">
        <tr v-for="(item,index) in zzzbTableConfig" :key="index">
          <td class="zzzb-row-header">
            {{item.Name}}
          </td>
          <td class="zzzb-row-data">
            <span >是否只读：</span>
            <input type="checkbox" v-model="item.ReadOnly" :value="item.ReadOnly" id="readonly">
            <label for="readonly">只读</label>
          </td>
          <td class="zzzb-row-data">
            <span>排序功能：</span>
            <input type="checkbox" v-model="item.Sortable" :value="item.Sortable" id="sortfunc">
            <label for="sortfunc">是</label>
          </td>
          <td class="zzzb-row-data">
            <span>过滤器：</span>
            <input type="checkbox" v-model="item.FilterAddon" :value="item.FilterAddon" id="filterfunc">
            <label for="filterfunc">是</label>
          </td>
          <td class="zzzb-row-data box-inner">
            <span>小组顺序：</span>
            <input class="inputBox" type="number" v-model.number.lazy="item.GroupOrder" :id="index+'group'" >
            <button  @click="updateGrid">OK</button>
          </td>
          <td class="zzzb-row-data box-inner">
            <span>组内顺序：</span>
            <input class="inputBox" type="number" v-model.number.lazy="item.FieldOrder" :id="index+'field'" >
            <button  @click="updateGrid">OK</button>
          </td>
        </tr>
      </table>
    </div>
    <div>
     <button @click="ClickDD">转置</button>
    </div>
    <div>
      <zzzb-grid :colHeaders='zzzbTableConfig' :data='customData' :direction='tableDirection' :reset='reset'></zzzb-grid>
    </div>
  </div>
</template>


<script>
import zzzbGrid from '../components/zzzb-grid'
export default {
  data() {
    return {
      customData: [
        {
          'TradeID': '1',
          'LegID':'1',
          'Side': 'Short',
          'CallPut': 'Call',

          'CloseOrExpiry': 'Close',
          'FinalUnderlying': 200,
          'ClosePrice': 212,
          'PremiumType': 'SnowBall',
          'HedgeVol': 0.0532321
        },
        {
          'TradeID': '2',
          'LegID':'2',
          'Side': 'Short',
          'CallPut': 'Call',

          'CloseOrExpiry': 'Close',
          'FinalUnderlying': 188.25,
          'ClosePrice': 212,
          'PremiumType': 'FowardSwap',
          'HedgeVol': 0.0667345
        },
        {
          'TradeID': '3',
          'LegID':'3',
          'Side': 'Short',
          'CallPut': 'Call',

          'CloseOrExpiry': 'Close',
          'FinalUnderlying': 188.25,
          'ClosePrice': 212,
          'PremiumType': 'FowardSwap',
          'HedgeVol': 0.0122321
        },
        {
          'TradeID': '4',
          'LegID':'4',
          'Side': 'Short',
          'CallPut': 'Call',

          'CloseOrExpiry': 'Close',
          'FinalUnderlying': 189.25,
          'ClosePrice': 212,
          'PremiumType': 'FowardSwap',
          'HedgeVol': 0.0122321
        },
        {
          'TradeID': '5',
          'LegID':'5',
          'Side': 'Short',
          'CallPut': 'Call',

          'CloseOrExpiry': 'Close',
          'FinalUnderlying': 189.25,
          'ClosePrice': 212,
          'PremiumType': 'FowardSwap',
          'HedgeVol': 0.0136757
        },
        {
          'TradeID': '6',
          'LegID':'6',
          'Side': 'Short',
          'CallPut': 'Call',

          'CloseOrExpiry': 'Close',
          'FinalUnderlying': 200.25,
          'ClosePrice': 212,
          'PremiumType': 'FowardSwap',
          'HedgeVol': 0.01452456
        },
        {
          'TradeID': '7',
          'LegID':'7',
          'Side': 'Short',
          'CallPut': 'Call',

          'CloseOrExpiry': 'Close',
          'FinalUnderlying': 189.25,
          'ClosePrice': 212,
          'PremiumType': 'SnowBall',
          'HedgeVol': 0.0214567
        },
        {
          'TradeID': '8',
          'LegID':'8',
          'Side': 'Short',
          'CallPut': 'Call',

          'CloseOrExpiry': 'Close',
          'FinalUnderlying': 200.25,
          'ClosePrice': 212,
          'PremiumType': 'FowardSwap',
          'HedgeVol': 0.043562
        },
        {
          'TradeID': '9',
          'LegID':'9',
          'Side': 'Short',
          'CallPut': 'Call',

          'CloseOrExpiry': 'Close',
          'FinalUnderlying': 189.25,
          'ClosePrice': 212,
          'PremiumType': 'SnowBall',
          'HedgeVol': 0.0523467
        },
        {
          'TradeID': '10',
          'LegID':'10',
          'Side': 'Short',
          'CallPut': 'Call',

          'CloseOrExpiry': 'Close',
          'FinalUnderlying': 200.25,
          'ClosePrice': 212,
          'PremiumType': 'FowardSwap',
          'HedgeVol': 0.0632567
        },

      ]
      ,
      zzzbTableConfig: [
        { Prop: 'TradeID', Name: '交易编号', Type: 'Input', ReadOnly: true, GroupOrder: 1, FieldOrder: 22 ,Sortable:false,FilterAddon:false,
            Threshold:{'=':{data:5,bgcolor:'black',fontcolor:'white'},
                       '>':{data:5,bgcolor:'green',fontcolor:'blue'},
                       '<':{data:5,bgcolor:'red',fontcolor:'yellow'}}},

        { Prop: 'LegID', Name: '腿编号', Type: 'Input', ReadOnly: true, GroupOrder: 1, FieldOrder: 2 ,Sortable:false,FilterAddon:false},
        { Prop: 'Side', Name: '期初开仓方向', Type: 'Select', ReadOnly: true, GroupOrder: 1, FieldOrder: 11, Options: [{ label: '客户买入', value: 'Short' }, { label: '客户卖出', value: 'Long' }] ,Sortable:false,FilterAddon:false},
        { Prop: 'CallPut', Name: '期权类型', Type: 'Select', ReadOnly: true, GroupOrder: 1, FieldOrder: 12, Options: [{ label: 'Call', value: 'Call' }, { label: 'Put', value: 'Put' }] ,Sortable:false,FilterAddon:false},

        { Prop: 'CloseOrExpiry', Name: '平仓/到期', Type: 'Select', ReadOnly: false, GroupOrder: 2, FieldOrder: 1, Options: [{ label: 'Close', value: 'Close' }, { label: 'Expiry', value: 'Expiry' }] ,Sortable:false,FilterAddon:false},
        { Prop: 'FinalUnderlying', Name: '出场价格', Type: 'Input', ReadOnly: false, GroupOrder: 2, FieldOrder: 2, FilterAddon: true ,Sortable:false},
        { Prop: 'ClosePrice', Name: '平仓/到期单价', Type: 'ThousandthInput', Fixed: 4, Symbol: '￥', SymbolUnit: '元', ReadOnly: false, GroupOrder: 2, FieldOrder: 3 ,Sortable:false,FilterAddon:false},
        { Prop: 'PremiumType', Name: '期权费类型', Type: 'Input', ReadOnly: true, GroupOrder: 2, FieldOrder: 4 ,Sortable:false,FilterAddon:false},
        { Prop: 'HedgeVol', Name: '对冲波动率', Type: 'PercentageInput', Fixed: 4, ReadOnly: false, GroupOrder: 5, FieldOrder: 1, Sortable: true ,FilterAddon:false}
      ],
      tableDirection: '1',
      reset:false
    }
  },
  components: {
    zzzbGrid
  },
  methods: {
    ClickDD() {
      if (this.tableDirection == "0") {
        this.tableDirection = "1";
        console.log("direction:",this.tableDirection);
      }
      else {
        this.tableDirection = "0";
        console.log("direction:",this.tableDirection);
      }
    },
    updateGrid(){
      this.reset=true;
    }
  },
  watch:{
    
  }
  
}
</script>
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

