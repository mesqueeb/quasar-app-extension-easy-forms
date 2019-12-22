const description = `EasyForms have validation enabled by default when clicking the save button or when executing \`validate\` on the EasyForm ref.

There is also the possibility to do programatic validation. EasyForms provides a helper function which can be used without the need of rendering the form at all. It can be used like so:
\`\`\`js
import { validateFormPerSchema } from 'quasar-ui-easy-forms'

validateFormPerSchema(formData, schema)
\`\`\``

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
    {
      id: 'chosenExample',
      component: 'QBtnToggle',
      spread: true,
      noCaps: true,
      options: [
        { label: 'Basic validation', value: 0 },
        { label: 'Programatic validation', value: 1 },
      ],
    },
  ],
}
