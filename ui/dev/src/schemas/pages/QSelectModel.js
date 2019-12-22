import merge from 'merge-anything'

const description = `This is an example of an \`<EasyForm />\` with a bunch of evaluated field props.

In this example I display all the possibilities to manage your field "model" with a QSelect field. I always found this confusing in the Quasar docs, so here is a nice overview you can play around with.

At the same time, if you check the source code, you'll see how easy it is to create such a complex form with such an easy schema. 🙃`

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
