export default {
  mode: 'edit',
  actionButtons: [],
  columnCount: 2,
  schema: [
    {
      id: 'over18',
      component: 'QToggle',
      default: false,
      label: 'Are you over 18?',
    },
    {
      id: 'parentalConsent',
      component: 'QToggle',
      default: false,
      label: 'Do you have parental consent?',
      subLabel: 'This will be disabled when the first question is `true`.',
      disable: (val, { formData }) => formData.over18,
    },
  ],
}
