const description = `Each \`<EasyField />\` can be passed an prop called \`events\`. This prop can be passed like so: \`:events="events"\` and will set all the event listeners on the field like so: \`v-on="events"\`.

An \`events\` prop would look like so:
\`\`\`js
events: {
  input: ($event, context) => { /* do something */ },
  focus: ($event, context) => { /* do something */ },
  // etc...
}
\`\`\`

The benefits of passing your event listeners via the \`events\` prop are:
- Besides the typical \`$event\` parameter they receive as first parameter, they will receive a second \`context\` parameter.
- \`context\` is the Vue component reference of the \`<EasyField />\`, you can deconstruct this to access any other properties/values.
- \`context\` has useful props like: \`$store\`, \`$router\`, \`formData\`, \`formDataFlat\`, \`mode\`, \`formId\`, ... All of these are explained in the *"Evaluated Props" documentation*, so be sure to check that.
- \`context\` has a special function called \`fieldInput\` which can be used to modify other fields programatically.
- And all this can be set from inside an \`<EasyForm />\`'s \`schema\` so you don't need add anything manually inside your templates.

Phew. That was a bit of a lot of information all at once. 😅 Let's tackle these one by one.
`

export default {
  mode: 'edit',
  actionButtons: [],
  schema: Object.values({
    _1: {
      component: 'QMarkdown',
      noContainers: true,
      noLineNumbers: true,
      src: description,
    },
    get _2 () {
      return {
        id: 'chosenExample',
        component: 'QBtnToggle',
        spread: true,
        noCaps: true,
        options: [this._3, this._4].map((field, index) => {
          return { label: field.label, value: index }
        }),
      }
    },
    _3: {
      showCondition: (value, { formData }) => formData.chosenExample === 0,
      label: 'Notify on events',
      hasMarkdown: true,
      subLabel: `
Eg.
\`\`\`js
events: {
  input: (val, {$q}) => $q.notify(val)
  focus: (val, {id, label, $q}) => $q.notify(\`focussed: 「\${label}」 (id: \${id})\`)
}
\`\`\``.trim(),
    },
    _4: {
      showCondition: (value, { formData }) => formData.chosenExample === 1,
      label: "Update other fields on 'input'",
      hasMarkdown: true,
      subLabel: `
Eg.
\`\`\`js
events: {
  input: (val, {fieldInput}) => fieldInput({id: 'telClean', value: !val ? '' : val.replace(/[^\d]/g, '').trim()})
}
\`\`\`

The \`fieldInput\` function can be used to update other fields inside your form. It receives a single parameter which should be an object that looks like \`{id, value}\` with the \`id\` of the field you want to update and a \`value\` you want to update it with.
`.trim(),
    },
  }),
}
