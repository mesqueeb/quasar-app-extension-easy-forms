<template>
  <q-page padding class="column">
    <q-list dense class="list">
      <div class="text-h4 q-my-md">< EasyForm /></div>
      <div class="q-my-md">
        Generate an entire form via just a "schema" object. Use <b>any component</b> you want!
      </div>
      <q-item v-for="page in pagesEasyForm" :key="page.path" :to="page.path">
        <q-item-section avatar>
          <q-icon name="label_important" />
        </q-item-section>
        <q-item-section>
          {{ page.title }}
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
      <div class="text-h4 q-mb-md q-mt-xl">< EasyField /></div>
      <div class="q-my-md">Bonus! Some handy fields usable inside an EasyForm. 😃</div>
      <q-item v-for="page in pagesEasyField" :key="page.path" :to="page.path">
        <q-item-section avatar>
          <q-icon name="label_important" />
        </q-item-section>
        <q-item-section>
          {{ page.title }}
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-item-label class="q-mt-xl q-pt-xl" header>Essential Links</q-item-label>
    <q-list class="row">
      <q-item
        clickable
        tag="a"
        target="_blank"
        href="https://github.com/mesqueeb/quasar-ui-easy-forms"
      >
        <q-item-section avatar>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 33 33"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g transform="translate(-136, -55)">
              <path
                d="M152.608,55.455 C143.614,55.455 136.32,62.748 136.32,71.745 C136.32,78.942 140.987,85.047 147.46,87.201 C148.275,87.351 148.572,86.848 148.572,86.416 C148.572,86.03 148.558,85.005 148.55,83.646 C144.019,84.63 143.063,81.462 143.063,81.462 C142.322,79.58 141.254,79.079 141.254,79.079 C139.775,78.069 141.366,78.089 141.366,78.089 C143.001,78.204 143.861,79.768 143.861,79.768 C145.314,82.257 147.674,81.538 148.602,81.121 C148.75,80.069 149.171,79.351 149.636,78.944 C146.019,78.533 142.216,77.135 142.216,70.893 C142.216,69.115 142.851,67.66 143.893,66.522 C143.725,66.11 143.166,64.453 144.053,62.211 C144.053,62.211 145.42,61.773 148.532,63.881 C149.831,63.519 151.225,63.339 152.61,63.332 C153.994,63.339 155.387,63.519 156.688,63.881 C159.798,61.773 161.163,62.211 161.163,62.211 C162.052,64.453 161.493,66.11 161.326,66.522 C162.37,67.66 163,69.115 163,70.893 C163,77.151 159.191,78.528 155.563,78.931 C156.147,79.434 156.668,80.428 156.668,81.948 C156.668,84.125 156.648,85.882 156.648,86.416 C156.648,86.852 156.942,87.359 157.768,87.2 C164.236,85.041 168.899,78.94 168.899,71.745 C168.899,62.748 161.605,55.455 152.608,55.455"
                id="Fill-4"
              ></path>
            </g>
          </svg>
        </q-item-section>
        <q-item-section>
          <q-item-label>Github</q-item-label>
          <q-item-label caption>mesqueeb/quasar-ui-easy-forms</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" target="_blank" href="https://twitter.com/mesqueeb">
        <q-item-section avatar>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
            />
          </svg>
        </q-item-section>
        <q-item-section>
          <q-item-label>Twitter</q-item-label>
          <q-item-label caption>@mesqueeb</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
        <q-item-section avatar>
          <q-icon name="camera" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Quasar Framework</q-item-label>
          <q-item-label caption>quasar.dev</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
const pagesEasyForm = [
  { title: 'Basics', path: '/basics' },
  { title: 'Advanced', path: '/advanced' },
  { title: 'Action Buttons', path: '/actionButtons' },
  { title: 'Evaluated Props', path: '/evaluatedProps' },
  { title: 'Events', path: '/events' },
  { title: 'Nested data', path: '/nestedData' },
  { title: 'Validation', path: '/validation' },
]

const pagesEasyField = [
  { title: '<EfMiniForm />', path: '/EasyField/EfMiniForm' },
  { title: '<EfDiv />', path: '/EasyField/EfDiv' },
  { title: '<EfBtn />', path: '/EasyField/EfBtn' },
  { title: "component: 'QSelect'", path: '/QSelectModel' },
]

export default {
  name: 'PageIndex',
  data () {
    return {
      pagesEasyForm,
      pagesEasyField,
    }
  },
}
</script>

<style lang="sass" scoped>

.list
  width: 700px
  max-width: 100%
</style>
