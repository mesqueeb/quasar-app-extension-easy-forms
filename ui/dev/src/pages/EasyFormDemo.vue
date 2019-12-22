<template>
  <q-page padding>
    <EasyForm class="page-form" v-model="pageValue" v-bind="pageForm" />
    <InfoBoxWrapper color="primary" label="v-model" style="flex: 2;">
      <q-markdown class="q-py-md q-px-sm" :src="modelShownAsBadge" />
    </InfoBoxWrapper>
    <InfoCard
      class="q-mt-lg"
      tag-name="EasyForm"
      :title="infoCardTitle"
      :prop-data.sync="exampleForms[pageValue.chosenExample]"
      :static-schema-tab="exampleFormsRaw[pageValue.chosenExample]"
      :props-schema="propsSchema"
      :style-classes="styleClasses"
      :style-classes-data="styleClassesData"
      :props-separate-tab="['schema']"
    >
      <EasyForm
        v-model="exampleForms[pageValue.chosenExample].value"
        v-bind="exampleForms[pageValue.chosenExample]"
        v-on="exampleForms[pageValue.chosenExample].events"
        :key="pageValue.chosenExample"
      />
    </InfoCard>
  </q-page>
</template>

<style lang="sass">

.page-form
  .q-btn-toggle
    border: solid 2px $primary
    border-radius: 6px
    > *
      border-radius: 3px
  // .q-markdown p
  //   margin: 0 !important
  .q-markdown--code
    margin: $sm !important

.q-markdown--code
  word-break: break-word !important
</style>

<script>
import { isString, isArray, isPlainObject } from 'is-what'
import { capitalCase } from 'case-anything'
import merge from 'merge-anything'
import * as demoSchemas from '../schemas/examples/index'
import * as pageForms from '../schemas/pages/index'
import { getInfoCardPropsSchema } from '../helpers/schemaBuilders'

export default {
  name: 'EasyFormDemo',
  props: {
    schemaId: String,
  },
  data () {
    const { schemaId } = this
    const pageForm = pageForms[schemaId]
    const exampleForms = demoSchemas[schemaId].code
    const exampleFormsRaw = demoSchemas[schemaId].string
    const propsSchema = getInfoCardPropsSchema('EasyForm')
    return {
      pageValue: { chosenExample: 0 },
      pageForm,
      exampleForms,
      exampleFormsRaw,
      propsSchema,
    }
  },
  watch: {
    'pageValue.chosenExample' (newValue, oldValue) {
      if (newValue === oldValue) return
      this.$set(this.exampleForms[this.pageValue.chosenExample], 'value', {})
    },
  },
  computed: {
    infoCardTitle () {
      const { pageForm, pageValue, exampleForms, schemaId } = this
      if (exampleForms.length === 1) return capitalCase(schemaId)
      const { label } = pageForm.schema[1].options[pageValue.chosenExample]
      return capitalCase(label)
    },
    modelShownAsBadge () {
      const { model } = this
      const { value } = this.exampleForms[this.pageValue.chosenExample]
      const parsedValue = isString(value)
        ? `"${value}"`
        : isArray(value) || isPlainObject(value)
        ? JSON.stringify(value)
        : value
      return `\`${parsedValue}\``
    },
    styleClasses () {
      return [
        '.easy-form',
        '.easy-form__nav-row',
        '.easy-form__validation-error',
        '.easy-form__form',
        '.easy-field',
        '.easy-field__label',
        '.easy-field__sub-label',
        '.easy-field__field',
      ]
    },
    styleClassesData () {
      return {
        '.easy-form': { padding: '1em' },
        '.easy-field': { padding: '1em' },
      }
    },
  },
  methods: {
    log (...args) {
      console.log(...args)
    },
  },
}
</script>
