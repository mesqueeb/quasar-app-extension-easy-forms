const description = `By default, EasyForm has buttons on the top side of the form to edit/save etc... Each of these actions will $emit an event, so you can do something appropriately. (eg. saving data to a DB when "save" is clicked)

Action buttons are set via the prop 'actionButtons'. Some buttons are already set up for you and can be included by just passing the string of the button you want:

- \`'edit'\`: Adds a button that puts the form in "edit" mode
- \`'cancel'\`: Adds a button that puts the form back into "view" mode & reverts the content to its original state
- \`'save'\`: Adds a button that puts the form back into "view" mode & keeps the modified content
- \`'delete'\` & \`'archive'\`: Adds a button that emits a delete or archive event (you must implement your own logic)

The buttons above emits the events: \`@edit\`, \`@cancel\`, \`@save\`, \`@delete\`, \`@archive\`

Only \`@save\` receives a payload with the new and old form data.
- \`@save="onSave"\`
\`\`\`js
import merge from 'merge-anything' // my merge util 😉
{
  onSave ({newData, oldData}) {
    console.log(newData) // an object with only the updated fields
    console.log(oldData) // the original object with all the field values
    // if you need a combination of both:
    const newFormData = merge(oldData, newData)
  }
}
\`\`\`

When you don't specify the action buttons it will default to:
- \`:action-buttons="['archive', 'cancel', 'edit', 'save']"\`

When you want no buttons to show you can pass:
- \`:action-buttons="[]"\`

You can also pass custom buttons with a schema just like an EfBtn (see the \`EasyField > EfBtn\` documentation).

The function you set to \`events.click\` of custom buttons will receive the native event payload as first parameter and the EasyForm context (the component instance) as second: \`($event, context) => {}\`
An example of a custom button could be:
\`\`\`js
actionButtons: [{
  btnLabel: 'log the data',
  events: {
    click: (event, {formData}) => console.log(formData),
  },
}]
\`\`\`

For more information on the \`context\` prop passed to a click event see the "Evaluated Props" and "Events" documentation.
`

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
