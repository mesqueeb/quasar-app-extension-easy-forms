const carData = [
  { year: 2015, make: 'Audi', model: 'A3', trim: '2.0' },
  { year: 2015, make: 'Audi', model: 'A3', trim: '1.8' },
  { year: 2015, make: 'Audi', model: 'A6', trim: '2.5' },
  { year: 2015, make: 'Audi', model: 'A6', trim: '3.0' },
  { year: 2015, make: 'BMW', model: 'M3', trim: 'b2.0' },
  { year: 2015, make: 'BMW', model: 'M3', trim: 'b1.8' },
  { year: 2015, make: 'BMW', model: 'M5', trim: 'b2.5' },
  { year: 2015, make: 'BMW', model: 'M5', trim: 'b3.0' },
  { year: 2016, make: 'Chevy', model: 'Impala', trim: 'c2.0' },
  { year: 2016, make: 'Chevy', model: 'Impala', trim: 'c1.8' },
  { year: 2016, make: 'Chevy', model: 'Malibu', trim: 'c2.5' },
  { year: 2016, make: 'Chevy', model: 'Malibu', trim: 'c3.0' },
  { year: 2016, make: 'Dodge', model: 'RAM', trim: 'd2.0' },
  { year: 2016, make: 'Dodge', model: 'RAM', trim: 'd1.8' },
  { year: 2016, make: 'Dodge', model: 'Challanger', trim: 'd2.5' },
  { year: 2016, make: 'Dodge', model: 'Challanger', trim: 'd3.0' },
]

export default {
  mode: 'edit',
  actionButtons: [],
  columnCount: 4,
  schema: [
    {
      id: 'year',
      label: 'Year',
      component: 'QSelect',
      emitValue: true,
      options: [...new Set(carData.map(d => d.year))].map(value => ({ value, label: value })),
    },
    {
      id: 'make',
      label: 'Make',
      component: 'QSelect',
      emitValue: true,
      options: (val, { formData }) => {
        const { year } = formData || {}
        return [...new Set(carData.filter(car => car.year === year).map(d => d.make))].map(
          value => ({ value, label: value })
        )
      },
    },
    {
      id: 'model',
      label: 'Model',
      component: 'QSelect',
      emitValue: true,
      options: (val, { formData }) => {
        const { year, make } = formData || {}
        return [
          ...new Set(
            carData.filter(car => car.year === year && car.make === make).map(d => d.model)
          ),
        ].map(value => ({ value, label: value }))
      },
    },
    {
      id: 'trim',
      label: 'Trim',
      component: 'QSelect',
      emitValue: true,
      options: (val, { formData }) => {
        const { year, make, model } = formData || {}
        return [
          ...new Set(
            carData
              .filter(car => car.year === year && car.make === make && car.model === model)
              .map(d => d.trim)
          ),
        ].map(value => ({ value, label: value }))
      },
    },
  ],
}
