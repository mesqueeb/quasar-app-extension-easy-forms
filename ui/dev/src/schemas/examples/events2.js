export default {
  mode: 'edit',
  actionButtons: [],
  columnCount: 2,
  schema: [
    {
      id: 'tel',
      fieldType: 'input',
      label: 'Phone nr (hyphenated)',
      subLabel: 'Type any number with `-` or `(  )`',
      events: {
        input: (val, { fieldInput, formDataNested }) =>
          fieldInput({ id: 'telClean', value: !val ? '' : val.replace(/[^\d]/g, '').trim() }),
      },
    },
    {
      id: 'telClean',
      fieldType: 'input',
      label: 'Phone nr (only numbers)',
      subLabel: 'This field is automatically updated when you type in a phone nr on the left.',
      disable: true,
    },
  ],
}
