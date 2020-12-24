<template>
  <div>
    <p>Custom tabel</p>
    <div >
      <table class="zzzb-table config-table">
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
        </tr>
      </table>
    </div>
    <div>
     <button @click="ClickDD">转置</button>
    </div>
    <div class="table-comp">
      <zzzb-grid :colHeaders='zzzbTableConfig' :data='customData' :direction='tableDirection'></zzzb-grid>
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
        { Prop: 'TradeID', Name: '交易编号', Type: 'Input', ReadOnly: true, GroupOrder: 1, FieldOrder: 22 ,Sortable:false},
        { Prop: 'LegID', Name: '腿编号', Type: 'Input', ReadOnly: true, GroupOrder: 1, FieldOrder: 2 ,Sortable:false},
        { Prop: 'Side', Name: '期初开仓方向', Type: 'Select', ReadOnly: true, GroupOrder: 1, FieldOrder: 11, Options: [{ label: '客户买入', value: 'Short' }, { label: '客户卖出', value: 'Long' }] ,Sortable:false},
        { Prop: 'CallPut', Name: '期权类型', Type: 'Select', ReadOnly: true, GroupOrder: 1, FieldOrder: 12, Options: [{ label: 'Call', value: 'Call' }, { label: 'Put', value: 'Put' }] ,Sortable:false},

        { Prop: 'CloseOrExpiry', Name: '平仓/到期', Type: 'Select', ReadOnly: false, GroupOrder: 2, FieldOrder: 1, Options: [{ label: 'Close', value: 'Close' }, { label: 'Expiry', value: 'Expiry' }] ,Sortable:false},
        { Prop: 'FinalUnderlying', Name: '出场价格', Type: 'Input', ReadOnly: false, GroupOrder: 2, FieldOrder: 2, FilterAddon: true ,Sortable:false},
        { Prop: 'ClosePrice', Name: '平仓/到期单价', Type: 'ThousandthInput', Fixed: 4, Symbol: '￥', SymbolUnit: '元', ReadOnly: false, GroupOrder: 2, FieldOrder: 3 ,Sortable:false},
        { Prop: 'PremiumType', Name: '期权费类型', Type: 'Input', ReadOnly: true, GroupOrder: 2, FieldOrder: 4 ,Sortable:false},
        { Prop: 'HedgeVol', Name: '对冲波动率', Type: 'PercentageInput', Fixed: 4, ReadOnly: false, GroupOrder: 5, FieldOrder: 1, Sortable: true }
      ],
      tableDirection: '1'
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
    }
  },
  
}
</script>