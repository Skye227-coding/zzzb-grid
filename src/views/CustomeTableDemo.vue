
<template>
  <div>
    <zzzb-table :config='zzzbTableConfig' ref='zzzbTable'></zzzb-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      customData: [],
      zzzbTableConfig: [{
        'TradeID': { Name: '交易编号', Type: 'Input', ReadOnly: true, GroupOrder: 1, Order: 1 },
        'LegID': { Name: '腿编号', Type: 'Input', ReadOnly: true, GroupOrder: 1, Order: 2 },
        'Side': { Name: '期初开仓方向', Type: 'Select', ReadOnly: true, GroupOrder: 1, Order: 11, Options: [{ label: '客户买入', value: 'Short' }, { label: '客户卖出', value: 'Long' }] },
        'CallPut': { Name: '期权类型', Type: 'Select', ReadOnly: true, GroupOrder: 1, Order: 12, Options: [{ label: 'Call', value: 'Call' }, { label: 'Put', value: 'Put' }] },
      }
      ]
    }
  },
  mounted() {
    this.DataBind()
  },
  methods: {
    DataBind() {
      this.$refs['zzzbTable'].data = this.customData  //这里的CustomData是外部输入的数据,类似之前的Option
    }
  },
}
</script>