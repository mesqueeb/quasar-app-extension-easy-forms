export default {
  component: 'EfMiniForm',
  label: 'Expenses',
  subLabel: "fill in this month's expenses",
  schema: [
    {
      component: 'QSelect',
      label: 'Type',
      id: 'type',
      emitValue: true,
      mapOptions: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Work', value: 'work' },
      ],
    },
    {
      component: 'QInput',
      label: 'Amount',
      id: 'amount',
      type: 'number',
      parseInput: Number,
      prefix: '€',
    },
    { component: 'QToggle', label: 'Notify', default: false, id: 'notify' },
  ],
  default: [],
}
