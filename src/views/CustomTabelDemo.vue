<template>
  <div>
    <p>Custom tabel</p>
    <button @click="ClickDD">转置</button>
    <zzzb-grid :colHeaders='zzzbTableConfig' :data='customData' :direction='tableDirection'></zzzb-grid>
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
        { Prop: 'TradeID', Name: '交易编号', Type: 'Input', ReadOnly: true, GroupOrder: 1, FieldOrder: 22 },
        { Prop: 'LegID', Name: '腿编号', Type: 'Input', ReadOnly: true, GroupOrder: 1, FieldOrder: 2 },
        { Prop: 'Side', Name: '期初开仓方向', Type: 'Select', ReadOnly: true, GroupOrder: 1, FieldOrder: 11, Options: [{ label: '客户买入', value: 'Short' }, { label: '客户卖出', value: 'Long' }] },
        { Prop: 'CallPut', Name: '期权类型', Type: 'Select', ReadOnly: true, GroupOrder: 1, FieldOrder: 12, Options: [{ label: 'Call', value: 'Call' }, { label: 'Put', value: 'Put' }] },

        { Prop: 'CloseOrExpiry', Name: '平仓/到期', Type: 'Select', ReadOnly: false, GroupOrder: 2, FieldOrder: 1, Options: [{ label: 'Close', value: 'Close' }, { label: 'Expiry', value: 'Expiry' }] },
        { Prop: 'FinalUnderlying', Name: '出场价格', Type: 'Input', ReadOnly: false, GroupOrder: 2, FieldOrder: 2, FilterAddon: true },
        { Prop: 'ClosePrice', Name: '平仓/到期单价', Type: 'ThousandthInput', Fixed: 4, Symbol: '￥', SymbolUnit: '元', ReadOnly: false, GroupOrder: 2, FieldOrder: 3 },
        { Prop: 'PremiumType', Name: '期权费类型', Type: 'Input', ReadOnly: true, GroupOrder: 2, FieldOrder: 4 },
        { Prop: 'HedgeVol', Name: '对冲波动率', Type: 'PercentageInput', Fixed: 4, ReadOnly: false, GroupOrder: 5, FieldOrder: 1, Sortable: true }
      ],
      tableDirection: '0'
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
  // mounted() {
  //   this.DataBind()
  // },
  // methods: {
  //   DataBind() {
  //     this.$refs['zzzbTable'].optionData = this.customData  //这里的CustomData是外部输入的数据,类似之前的Option
  //     console.log('dataBind',this.$refs['zzzbTable'].optionData)
  //   }
  // },
}
</script>