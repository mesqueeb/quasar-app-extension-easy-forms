<template>
  <q-page padding>
    <EasyForm class="page-form" v-model="pageValue" v-bind="pageForm" />
    <InfoBoxWrapper color="primary" label="v-model" style="flex: 2;">
      <q-markdown class="q-py-md q-px-sm" :src="modelShownAsBadge" />
    </InfoBoxWrapper>
    <InfoCard
      class="q-mt-lg"
      tag-name="EasyField"
      :title="infoCardTitle"
      :prop-data.sync="examples[pageValue.chosenExample]"
      :static-schema-tab="examplesRaw[pageValue.chosenExample]"
      :props-schema="propsSchema"
      :style-classes="styleClasses"
      :style-classes-data="styleClassesData"
      :props-separate-tab="['schema']"
    >
      <EasyField
        v-model="examples[pageValue.chosenExample].value"
        v-bind="examples[pageValue.chosenExample]"
        v-on="examples[pageValue.chosenExample].events"
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
import { getInfoCardPropsSchema, getRawComponent } from '../helpers/schemaBuilders'

export default {
  name: 'EasyFieldDemo',
  props: {
    component: String,
  },
  data () {
    const { component } = this
    const rawComponent = getRawComponent(component)
    const { desc } = rawComponent
    const pageForm = {
      schema: [
        {
          component: 'QMarkdown',
          noContainers: true,
          noLineNumbers: true,
          src: desc,
        },
      ],
    }
    const examples = demoSchemas[component].code
    const examplesRaw = demoSchemas[component].string
    const propsSchema = getInfoCardPropsSchema(component)
    return {
      pageValue: { chosenExample: 0 },
      pageForm,
      examples,
      examplesRaw,
      propsSchema,
    }
  },
  watch: {
    'pageValue.chosenExample' (newValue, oldValue) {
      if (newValue === oldValue) return
      this.$set(this.examples[this.pageValue.chosenExample], 'value', {})
    },
  },
  computed: {
    infoCardTitle () {
      const { pageForm, pageValue, examples, component } = this
      if (examples.length === 1) return capitalCase(component)
      const { label } = pageForm.schema[1].options[pageValue.chosenExample]
      return capitalCase(label)
    },
    modelShownAsBadge () {
      const { model } = this
      const { value } = this.examples[this.pageValue.chosenExample]
      const parsedValue = isString(value)
        ? `"${value}"`
        : isArray(value) || isPlainObject(value)
        ? JSON.stringify(value)
        : value
      return `\`${parsedValue}\``
    },
    styleClasses () {
      return ['.easy-field', '.easy-field__label', '.easy-field__sub-label', '.easy-field__field']
    },
    styleClassesData () {
      return {
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
