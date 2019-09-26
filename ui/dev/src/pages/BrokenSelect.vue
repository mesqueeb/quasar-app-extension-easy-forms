<template>
  <q-page padding>
    click the select and check console for errors.
    <br>
    <BrokenSelect />
    <br>
    <br>
    Even though `QSelect` is imported in the plugin
    it seems that it does not automatically import `Platform`.
  </q-page>
</template>

<style lang="stylus" scoped>
</style>

<script>

export default {
  name: 'PageBrokenSelect',
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
