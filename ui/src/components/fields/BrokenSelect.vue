<template>
  <q-select
    v-model="model"
    :options="options"
  />
</template>

<style lang="stylus">
</style>

<script>
import { QSelect } from 'quasar'

export default {
  components: { QSelect },
  name: 'BrokenSelect',
  data () {
    return {
      model: '',
      options: [
        {label: 'one', value: 1}
      ],
    }
  },
  methods: {},
}
</script>
