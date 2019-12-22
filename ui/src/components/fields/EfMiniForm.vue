<template>
  <div class="ef-form">
    <div class="ef-form__row" :style="`grid-template-columns:${' 1fr'.repeat(columnCountSubForm)}`">
      <EasyField
        v-for="(subfield, fieldIndex) in schemaLabels"
        :key="fieldIndex"
        class="ef-form__sub-field"
        v-bind="subfield"
        :style="
          subfield.span === true
            ? 'grid-column: 1 / -1'
            : subfield.span
            ? `grid-column: span ${subfield.span}`
            : ''
        "
      />
    </div>
    <div
      class="ef-form__row"
      v-for="(row, rowIndex) in cValue"
      :style="`grid-template-columns:${' 1fr'.repeat(columnCountSubForm)}`"
      :key="rowIndex"
    >
      <EasyField
        v-for="(subfield, fieldIndex) in cSchema"
        :key="fieldIndex"
        class="ef-form__sub-field"
        v-bind="subfield"
        :style="
          subfield.span === true
            ? 'grid-column: 1 / -1'
            : subfield.span
            ? `grid-column: span ${subfield.span}`
            : ''
        "
        :value="cValue[rowIndex][subfield.id]"
        @input="val => setSubFieldValue(val, rowIndex, subfield.id)"
        @keyup.native.delete="onDeleteKey(rowIndex, subfield.id)"
      />
    </div>
  </div>
</template>

<style lang="sass">
// $
@import '../../index.sass'

.ef-form
  >.ef-form__row
    display: grid
    justify-items: stretch
    align-items: flex-end
    grid-gap: $sm
    margin-bottom: $sm
</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isNumber } from 'is-what'
import { getUsageDocs } from './sharedProps.js'

export default {
  name: 'EfMiniForm',
  inheritAttrs: false,
  desc: `${getUsageDocs('EfMiniForm')}

### description

With EfMiniForm you can pass a "schema" just like an EasyForm. The difference is that EfMiniForm is more like a (as the name says) "mini" form. 😃

The "schema" you specify is shown as a single row. New rows are added automatically on user input.`,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: Array,
      default: () => [],
    },
    // EF props:
    schema: {
      category: 'content',
      type: Array,
      desc:
        'This is the information on the columns you want to be shown. An array of objects just like an EasyForm.',
      default: () => [{ component: 'QInput' }],
      examples: [
        "[{label: 'Amount', id: 'amount', component: 'QInput', type: 'number'}, {label: 'Currency', id: 'curr', component: 'QSelect', options: [{label: 'USD', value: 'usd'}]}]",
      ],
    },
    attrsToPass: {
      category: 'content',
      type: Array,
      desc: `A list of prop (attribute) names to be passed on to each single EasyField generated in the mini form.

This is useful when you want to use Evaluated Props in the schema of the mine form but need information from the top level EasyForm.`,
      default: () => [
        'formData',
        'formDataFlat',
        'formId',
        'mode',
        'fieldInput',
        'lang',
        'events',
        'required',
        'rules',
      ],
      examples: [`['formData', 'formId', 'mode', 'fieldInput']`],
    },
    maxRows: {
      category: 'content',
      type: Number,
      desc: 'Allows to limit the max amount of rows.',
    },
    // props of which to inherit "description" etc. from EasyField:
    disable: { type: Boolean },
    readonly: { type: Boolean },
  },
  computed: {
    cValue: {
      get () {
        const { value, schema, disable, readonly, maxRows } = this
        const emptyRow = schema.reduce((carry, { id }) => ({ ...carry, [id]: undefined }), {})
        if (!disable && !readonly && (!isNumber(maxRows) || maxRows < value.length)) {
          return value.concat([emptyRow])
        }
        return value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
    miniFormAttrsToPass () {
      const { attrsToPass, $attrs } = this
      return attrsToPass.reduce((carry, attrKey) => {
        carry[attrKey] = $attrs[attrKey]
        return carry
      }, {})
    },
    cSchema () {
      const { schema, disable, readonly, miniFormAttrsToPass } = this
      return schema.map(subfield => {
        return merge(miniFormAttrsToPass, { disable, readonly }, subfield, {
          label: '',
          subLabel: '',
        })
      })
    },
    schemaLabels () {
      const { schema, miniFormAttrsToPass } = this
      return schema.map(subfield => {
        return merge(miniFormAttrsToPass, subfield, { component: undefined })
      })
    },
    columnCountSubForm () {
      const { schema } = this
      if (!schema) return 0
      return schema.reduce((total, field) => {
        const add = field.span || 1
        return total + add
      }, 0)
    },
  },
  methods: {
    deleteRow (rowIndex) {
      const { value } = this
      const allRows = copy(value)
      if (allRows[rowIndex] === undefined) return
      allRows.splice(rowIndex, 1)
      this.$emit('input', allRows)
    },
    setSubFieldValue (newValue, rowIndex, fieldId) {
      const { value } = this
      const allRows = copy(value)
      if (allRows[rowIndex] === undefined) this.$set(allRows, rowIndex, {})
      allRows[rowIndex][fieldId] = newValue
      this.$emit('input', allRows)
    },
    onDeleteKey (rowIndex, fieldId) {
      const { value, deleteRow } = this
      const allRows = value
      const row = allRows[rowIndex]
      if (!row) return
      if (Object.keys(row).every(key => row[key] === '' || row[key] === 0)) {
        deleteRow(rowIndex)
      }
    },
  },
}
</script>
