<template>
  <div>
    <!-- <zzzb-input size="mini" v-model="value"></zzzb-input> -->
    <zzzb-input size="mini" v-model="value" type='ThousandthInput' fixed=2 symbol="$" symbolUnit="美元" :readonly="false"></zzzb-input>
    <zzzb-input size="mini" v-model="value" type='PercentageInput' fixed=2 :readonly="false"></zzzb-input>
    <zzzb-input size="mini" v-model="value" type='NumberInput' fixed=4 :readonly="false"></zzzb-input>
    <zzzb-input size="mini" v-model="value" type='NumberInput' fixed=4 :readonly="true"></zzzb-input>
  </div>
</template>

<script>
import zzzbInput from '@/components/zzzb-input'
export default {
  components: {
    zzzbInput
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>