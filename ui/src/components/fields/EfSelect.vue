<template>
  <q-select
    :class="[
      'ef-select', {
      '-big': big,
    }]"
    v-model="cValue"
    v-bind="quasarProps"
  />
</template>

<style lang="stylus">
// $
@import '../../index.styl'

.ef-select
  width 100%
  .q-field__control
    border-radius md !important
  .q-field__control:before
    border 3px $primary solid !important
  .q-field__suffix
    color $text--dark
  .q-field__native
    color $text--dark
    text-align right
    > span
      width 100%
  &.-big
    font-size 25px
    .q-field__control
      py .4em !important
    .q-field__control:before
      border 6px $primary solid !important
    .q-field__native
      line-height 1.2 !important
    .q-select__dropdown-icon
      transform scale(1.5)
  &.q-field--disabled
    .q-field__control
      background $gray-bg
      > div
        opacity 1 !important
    .q-field__control:before
      border none !important
  &.q-field--readonly
    .q-field__control:before
      border 1px $gray-bg--dark solid !important
    .q-field__control > div
      opacity 1 !important

</style>

<script>
import { isFunction, isString, isPlainObject } from 'is-what'
import copy from 'copy-anything'
import merge from 'merge-anything'
import { QSelect } from 'quasar'
import { big } from './sharedProps.js'

export default {
  components: { QSelect },
  name: 'EfSelect',
  props: {
    // prop categories: behaviour content general model state style
    value: [String, Object, Number, Array],
    // EF props:
    big,
    // Quasar props with modified defaults:
    outlined: { quasarProp: true, type: Boolean, default: true },
    mapOptions: { quasarProp: true, type: Boolean, default: true },
    autogrow: { quasarProp: true, type: Boolean, default: true },
    // Quasar props with modified behaviour:
    label: {
      quasarProp: true,
      type: String,
      description: 'Hidden when a value is selected, shows the placeholder when nothing is selected.',
    },
    options: {
      quasarProp: true,
      type: [Array, Function],
      default: () => [],
    },
    hideDropdownIcon: {
      quasarProp: true,
      type: Boolean,
      description: 'Defaults to `true` when `readonly: true`',
    },
    useChips: {
      quasarProp: true,
      type: Boolean,
      description: 'Defaults to `true` when `multiple: true`',
    },
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        outlined: this.outlined,
        mapOptions: this.mapOptions,
        autogrow: this.autogrow,
        // Quasar props with modified behaviour:
        label: this.cLabel,
        options: this.cOptions,
        hideDropdownIcon: this.cHideDropdownIcon,
        useChips: this.cUseChips,
      })
    },
    cValue: {
      get () {
        const { value, $attrs } = this
        return ($attrs.multiple)
          ? Object.keys(value).filter(key => value[key])
          : value
      },
      set (val) {
        const { value, $attrs } = this
        if (!$attrs.multiple) {
          const cleanVal = (isPlainObject(val) && ('value' in val))
            ? val.value
            : val
          this.$emit('input', cleanVal)
          return
        }
        const valueCopy = copy(value)
        const valueReset = Object.keys(value)
          .reduce((carry, key) => ({[key]: null, ...carry}), {})
        const cleanVal = val.reduce((carry, option) => {
          if (isString(option)) {
            carry[option] = valueCopy[option]
          } else {
            carry[option.value] = option.label
          }
          return carry
        }, valueReset)
        this.$emit('input', cleanVal)
      },
    },
    cLabel () {
      // hidden when a value is selected
      return this.cValue ? undefined : this.$attrs.placeholder
    },
    cOptions () {
      const { options } = this
      if (isFunction(options)) return options(this.$store)
      if (options.some(o => isString(o))) {
        return options.map(o => ({label: o, value: o}))
      }
      return options.filter(o => !o.disabled)
    },
    cHideDropdownIcon () {
      const { $attrs, hideDropdownIcon } = this
      return $attrs.readonly || hideDropdownIcon
    },
    cUseChips () {
      const { $attrs, useChips } = this
      return $attrs.multiple || useChips
    },
  },
  methods: {},
}
</script>
