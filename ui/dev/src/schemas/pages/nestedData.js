const description = `An \`<EasyForm />\` can use a nested data structure on a flat form schema. When you have a nested data structure you will need to appoint each field ID with dot notation.

Eg. a field with ID \`size.width\` points to \`{size: {width}}\` in your data.

Besides writing your field IDs with dot notation, nothing further needs to be done.

The only thing you need to be careful with is the \`@field-input\` event:
- Listening to the \`@input\` event will always return the full data nested
- Listening to the \`@field-input\` event will always have the field ID with dot-notation in its payload.

In the example below you can see a nested data structure when updating one of the fields, but if you check the developer tools > console, you will see that the \`id\`s are logged as eg. \`'size.width'\``

export default {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      component: 'QMarkdown',
      noContainers: true,
      noLineNumbers: true,
      src: description,
    },
  ],
}
