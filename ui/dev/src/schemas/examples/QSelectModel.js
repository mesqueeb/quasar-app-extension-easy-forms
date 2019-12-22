const formatForMarkdown = code => `\`\`\`js
${JSON.stringify(code, null, 2)}
\`\`\``

const createExample = (config, i) => [
  Object.assign(
    {
      component: 'QSelect',
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
    component: 'QMarkdown',
    noContainers: true,
    noLineNumbers: true,
    src: (val, { formData }) => formatForMarkdown(formData[`example${i}`]),
    evaluatedProps: ['src'],
  },
  {
    id: `example${i}-o`,
    component: 'QMarkdown',
    noContainers: true,
    noLineNumbers: true,
    fieldClass: 'text-break-all',
    src: formatForMarkdown(config),
  },
]

const exampleConfigs = [
  { span: true, label: 'Single select' },
  { component: 'QSelect' },
  { component: 'QSelect', emitValue: true },
  { component: 'QSelect', emitValue: true, mapOptions: true },
  { span: true, subLabel: 'Multiple select' },
  { component: 'QSelect', multiple: true },
  { component: 'QSelect', multiple: true, emitValue: true },
  { component: 'QSelect', multiple: true, emitValue: true, mapOptions: true },
  {
    span: true,
    label: 'Do not do this',
    subLabel: 'Select something and see why 😉',
  },
  { component: 'QSelect', multiple: true, emitValue: true },
]

export default {
  actionButtons: [],
  mode: 'edit',
  columnCount: 3,
  schema: [
    {
      subLabel: 'Select some values for each QSelect field down below, and see what happens.',
    },
    {
      span: 1,
      label: 'Model:',
    },
    {
      span: 1,
      label: 'Options:',
    },
    ...exampleConfigs.reduce((carry, config, i) => {
      if (config.span === true) {
        carry.push(config)
        return carry
      }
      carry.push(...createExample(config, i))
      return carry
    }, []),
  ],
}
