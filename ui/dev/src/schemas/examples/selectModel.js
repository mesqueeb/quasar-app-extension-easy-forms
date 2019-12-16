const formatForMarkdown = code => `\`\`\`js
${JSON.stringify(code, null, 2)}
\`\`\``

const createExample = (config, i) => [
  Object.assign(
    {
      fieldType: 'select',
      options: [
        { label: 'Self taught', value: 'self' },
        { label: 'By item', value: 'item' },
        { label: 'Mutation', value: 'mutation' },
      ],
      id: `example${i}`,
    },
    config
  ),
  {
    id: `example${i}-m`,
    fieldType: 'markdown',
    src: (val, { formDataNested }) => formatForMarkdown(formDataNested[`example${i}`]),
  },
  {
    id: `example${i}-o`,
    fieldType: 'markdown',
    fieldClass: 'text-break-all',
    src: formatForMarkdown(config),
  },
]

const exampleConfigs = [
  { fieldType: 'title', label: 'Single select' },
  { valueType: 'object' },
  { valueType: 'string', emitValue: true },
  { valueType: 'string', emitValue: true, mapOptions: true },
  { fieldType: 'title', label: 'Multiple select', subLabel: 'Recommended model' },
  { valueType: 'object', multiple: true },
  { fieldType: 'title', subLabel: 'Other models' },
  { valueType: 'array', multiple: true },
  { valueType: 'array', multiple: true, emitValue: true },
  { valueType: 'array', multiple: true, emitValue: true, mapOptions: true },
  { fieldType: 'title', label: 'Do not do this', subLabel: 'Select something and see why 😉' },
  { valueType: 'object', multiple: true, emitValue: true },
]

export default {
  actionButtons: [],
  mode: 'edit',
  columnCount: 3,
  schema: [
    {
      fieldType: 'space',
      subLabel: 'Select some values for each select-field down below, and see what happens.',
    },
    {
      fieldType: 'title',
      span: 1,
      label: 'Model:',
    },
    {
      fieldType: 'title',
      span: 1,
      label: 'Options:',
    },
    ...exampleConfigs.reduce((carry, config, i) => {
      if (config.fieldType === 'title') {
        carry.push(config)
        return carry
      }
      carry.push(...createExample(config, i))
      return carry
    }, []),
  ],
}
