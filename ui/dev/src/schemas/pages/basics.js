const description = `\`<EasyForm />\` is a component that allows you to easily create forms by passing an object with a schema on how you want the form to look. By merely passing a schema array you can easily generate entire forms! No more writing clunky HTML forms! 🎉

#### **Schema**

The schema of an EasyForm is an array of objects that usually looks something like this:
Eg.:
\`\`\`js
[
  // you can use custom Vue components
  { id: 'myField', label: 'My Field', component: 'MyFieldVueComponent' },

  // you can use quasar components
  { id: 'name', label: 'Name', component: 'QInput' },
]
\`\`\`

Besides 'id', 'label' and 'component' there are many more props you can pass: subLabel; required; labelPosition; fieldClasses; componentClasses; parseValue; parseInput; events and many more.

#### **Value/Model**

There are several ways to work with the data of an EasyForm.

1. You can pass an empty object as \`v-model\` (or \`:value\` & listen to \`@input\`)
  In this case EasyForms will populate an object with the field's \`id\` as key and the user input as value.

2. You can listen to the \`@field-input\` event which triggers every time a field's value changes. It's payload is an object that looks like: \`{id, value}\`.

3. You can listen to the \`@save\` event which is triggered when the form's save button is pressed. It's payload is an object that looks like: \`{newData, oldData}\`. For more info see the [Action Buttons documentation](/actionButtons).

#### **Mode**

EasyForm has four modes:
- \`'view'\`: Show fields based on the schema; but make each field \`readonly: true\`.
- \`'edit'\`: Show editable fields based on the schema
- \`'add'\`: The same as 'edit'
- \`'raw'\`: Used to show raw data of your form. No fields are generated, just divs with the labels and values. This mode is powerful because it will automatically map values to the schema provided (eg. adding pre-/suffix; mapping to options of a select; etc.)

When in 'view' mode, EasyForm can be used to just show data. These buttons can also be disabled and by providing a custom mode you can keep the form in a certain mode forever.

--

Be sure to check out all the other pages for more functionality, but first...

Try filling in the form below and play around with the props via the **interactive preview**. You can click "props" to update any props used in the <EasyForm /> and see how the how the preview and source code changes.`

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
