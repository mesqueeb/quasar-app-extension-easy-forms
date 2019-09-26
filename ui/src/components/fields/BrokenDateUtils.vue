<template>
  <div>
    {{ formatDate(new Date(), 'YYYY/MM/DD') }}
  </div>
</template>

<style lang="stylus">
// $
@import '../../index.styl'
// .ef-input-date

</style>

<script>
import { date } from 'quasar'
const { formatDate } = date

export default {
  name: 'BrokenDateUtils',
  methods: {
    formatDate
  },
}
</script>
