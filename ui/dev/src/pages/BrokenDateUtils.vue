<template>
  <q-page padding>
    <div class="text-wrap-all">
      I'm only doing this:
      ```
      import { date } from 'quasar'
      const { formatDate } = date
      formatDate(new Date(), 'YYYY/MM/DD')
      ```
      But it gives an error in the console.
    </div>
    <BrokenDateUtils />
  </q-page>
</template>

<style lang="stylus" scoped>
</style>

<script>

export default {
  name: 'PageBrokenDateUtils',
  data () {
    return {}
  },
  methods: {
    log(...args) {
      console.log(...args)
    },
  },
}
</script>
