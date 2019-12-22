import { isDate, isNumber, isPlainObject, isArray } from 'is-what'
import commafy from 'commafy-anything'
import { dateStamp } from './dateHelpers'

/**
 * takes a value and returns the parsed value based on an EasyField blueprint provided.
 *
 * @export
 * @param {*} value any value. In our example blueprint `1` should be returned as `'one'`
 * @param {Object} blueprint a blueprint like eg.
 *     `{options: [{value: 1, label: 'one'}]}` out of which the "label" will be retrieved.
 *     Besides `options` you can also have `prefix` and `suffix`.
 *     When `valueType: 'date'` it will be printed as short date.
 *     When `valueType: 'number'` it will receive thousand separators.
 * @returns {*} the parsed value
 */
export default function parseFieldValue (value, blueprint) {
  if (!blueprint) return value
  const { valueType, dateFormat, options, multiple, suffix, prefix } = blueprint
  let newValue = value
  if (isArray(options)) {
    if (valueType === 'object' && isPlainObject(value)) {
      newValue = multiple
        ? Object.values(value)
            .filter(v => v)
            .join(', ')
        : value.label
    } else {
      const valueArray = !isArray(value) ? [value] : value
      newValue = valueArray
        .map(selectedValue => {
          if (isPlainObject(selectedValue)) return selectedValue.label
          const option = options.find(o => o.value === selectedValue) || {}
          return option.label || selectedValue
        })
        .join(', ')
    }
  }
  if (valueType === 'date' && isDate(value)) newValue = dateStamp(newValue, dateFormat)
  if (valueType === 'number' && isNumber(value)) newValue = commafy(newValue)
  if (suffix) newValue = `${newValue} ${suffix}`
  if (prefix) newValue = `${prefix} ${newValue}`
  return newValue
}
