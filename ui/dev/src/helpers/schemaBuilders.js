import { isArray, isUndefined, isFunction } from 'is-what'
import copy from 'copy-anything'
import merge from 'merge-anything'
import EasyForms from 'ui'
import { pascalCase } from 'case-anything'
import { stringToJs } from './conversion'
const { dependencyMap } = EasyForms
const { getPassedProps } = dependencyMap

export function getRawComponent (selectedField) {
  return EasyForms[selectedField] || {}
}

export function getAllComponentProps (selectedField) {
  const component = getRawComponent(selectedField) || {}
  const componentProps = component.props || {}
  const EasyField = EasyForms['EasyField'] || {}
  const EasyFieldProps = EasyField.props || {}
  const inheritedComponentProps = getPassedProps(selectedField) || {}
  const result = copy(merge(inheritedComponentProps, EasyFieldProps, componentProps))
  return result
}

export function propToPropSchema (propKey, propInfo) {
  const { desc, type, inheritedProp, examples, default: df, values, category } = propInfo
  // make the raw prop info from the components into an EasyForm:
  // whatever the prop is, default to an 'input' EasyField
  const events = {}
  let component = 'QInput'
  let subLabel = desc
  let options,
    outlined,
    standout,
    disable,
    parseInput,
    parseValue,
    autogrow,
    debounce,
    span,
    emitValue
  let fieldClasses = []
  // If it has a default, write it in the description
  if (!isUndefined(df)) subLabel += `\n\nDefault: \`${isFunction(df) ? JSON.stringify(df()) : df}\``
  // if the prop is a Boolean, show this as a 'toggle' EasyField
  if (
    type === Boolean ||
    (isArray(type) && [Boolean, Function].every(t => type.includes(t)) && type.length === 2)
  ) {
    component = 'QToggle'
  }
  // if the prop has a fixed set of possible values, show this as an 'option' EasyField
  const propHasValues = isArray(values) && values.length
  if (propHasValues) {
    component = 'QSelect'
    emitValue = true
    options = values.map(v => ({ label: v, value: v }))
  }
  // Create a special input for defining arrays and/or objects
  if (
    type === Array ||
    type === Object ||
    type === Function ||
    (isArray(type) && [Array, Object].some(t => type.includes(t)) && type.length === 2)
  ) {
    // events.blur = (e, val) => console.log(stringToJs(val))
    outlined = false
    standout = true
    debounce = 500
    parseInput = stringToJs
    parseValue = JSON.stringify
    autogrow = true
    if (isArray(examples)) subLabel += `\nExamples: \`${examples.join('` | `')}\``
  }
  // Don't allow editing props that accept functions.
  if (type === Function) disable = true
  // If it's the prop called 'schema', span the entire form, add extra info and don't return any input field
  if (propKey === 'schema') {
    component = ''
    span = true
    subLabel +=
      '\n\n> 👀 Check「Source tab」→「Schema」to see the following code in color and with indentation.'
  }
  // Create the EasyField schema for the prop
  return {
    id: propKey,
    component,
    type: type === Number ? 'number' : undefined,
    // schema,
    label: propKey,
    subLabel,
    placeholder: !isArray(examples) ? '' : examples.join(', '),
    inheritedProp,
    options,
    outlined,
    standout,
    disable,
    parseInput,
    parseValue,
    autogrow,
    category,
    fieldClasses,
    debounce,
    events,
    span,
    emitValue,
    // if the prop is `true` by default, set to true
    default: df === true || undefined,
    // defaults
    hasMarkdown: true,
  }
}

export function getInfoCardPropsSchema (selectedField) {
  const allComponentProps =
    selectedField === 'EasyForm'
      ? copy(EasyForms['EasyForm'].props)
      : getAllComponentProps(selectedField)
  return Object.entries(allComponentProps).reduce((carry, [propKey, propInfo]) => {
    // fields to not include in the InfoCard settings:
    if (propKey === 'component' || propKey === 'value') {
      return carry
    }
    carry[propKey] = propToPropSchema(propKey, propInfo)
    return carry
  }, {})
}
