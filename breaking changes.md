<!-- prettier-ignore-start -->

# Breaking changes

## actionButtons

Action buttons now default to an empty string.

**why:**
It's better to be explicited about the components that should be rendered. It's easier to understand that there will be buttons shown at the top of an EasyForm if you see that they are actually passed.

It's good that there are buttons pre-made for us, but it's better that these are explicitly added.

**how to update code:**
Anywhere you have not defined action buttons you can pass the previous default ones if you like: `['archive', 'cancel', 'edit', 'save']`

## fieldType

EasyForms now uses `component` instead of `fieldType`.
The "component" field can be passed any component name (string) which is globally registered, OR you can pass a component options object directly.

It's very powerful because now you can have EasyForms use _any_ Quasar component by eg. `component: 'QBtn'`. You can also define all your own custom components and use those, as long as you register them globally via `Vue.component()`

**why:**
EasyForms used to provide a wrapper component for every single component that was usable. This becomes very unwieldly very fast. I refactored the code to be able to provide plain Quasar components.

I still export the original wrapper components I did via the field names with `Ef` in front. Eg. `fieldType: 'input'` can now be used via `component: 'EfInput'`.

**how to update code:**

1. replace `fieldType: 'input'` with `component: 'EfInput'`
2. repeat for all field types

## mode & formMode

EasyForm has a `mode` which can be 'view', 'edit', 'add' and 'raw'.
EasyField used to receive this prop as `formMode` but now receives it as just `mode`.

An individual field could have a different 'mode' by passing `readonly: true` or `rawValue: true`.
Now when you want to set the 'mode' of a single field, you should just set the mode the same as EasyForms: `mode: 'raw'`

Another change is that EasyForms used to have mode="view" by default, but now it defaults to mode="edit"

**why:**
Unified syntax. A single prop called "mode" can be set globally at the EasyForm or locally at EasyField.
I went for "edit" instead of "view" by default because then fields are editable by default and thus closest to their intended state. I think this will cause less confusion.

**how to update code:**

1. replace `formMode` (in evaluated props) with just `mode`
2. replace `rawValue: true` with `mode: 'raw'`
3. replace `readonly: true` with `mode: 'view'`
4. add `mode: 'view'` or `mode="view"` to EasyForms without mode set

## disable

`disable` used to be ignored in the case `readonly` is true.
`disable` now is not modified as such any more.

**why**:
To avoid magic things happening without a strong reasoning. It will make working with EasyForms more predictable and thus easier to reason about.

**how to update code:**
If you have fields you set to `disable: true` but want it to be `false` when `readonly: true` you can do:

```js
// change
{
  disable: true,
}
// to
{
  disable: (val, {mode}) => mode !== 'view',
}
```

## evaluatedProps

An EasyField used to execute any prop which was a function to allow for these "Evaluated Props". Now you need to be explicit about which props you want to use as "Evaluated Props".

**why:**
Because now any component can a "field" (EasyForm doesn't use its own field wrappers). We cannot anticipate which props of these fields can accept functions.

**how to update code:**

The new prop called "evaluatedProps" defaults to an array with some prop names by default.
If your EasyForms only use Evaluated Props for the following props, you don't need to do anything:

```js
;[
  'component',
  'showCondition',
  'label',
  'subLabel',
  'required',
  'rules',
  'fieldStyle',
  'fieldClasses',
  'componentStyle',
  'componentClasses',
  'disable',
  'events',
  'lang',
]
```

If you have other props in your schemas that were "Evaluated Props" you will have to manually pass an array with _all_ props that you use as evaluated props: `evaluatedProps: ['myProp', 'subLabel']` etc.

This can be defined on the EasyForm level or individually on the EasyField level.

## format

The prop called `format` in which you could pass a function is now renamed to `parseValue`.
This was renamed for clarity because it's the opposite from `parseInput`. Now there is `parseValue` and `parseInput`. Much better!!

Just search & replace ;)

## innerClasses, innerStyle

Both `innerClasses` and `innerStyle` are renamed to `componentClasses` & `componentStyle` to make it clear that these are applied directly to the component. Just search & replace ;)

## CSS

The class `.easy-field__field` was renamed to `.easy-field__component`. Just search & replace ;)

## externalLabels

The prop called `externalLabels` was `true` by default and meant that labels were shown in the EasyField and not the component.

Now when passing `internalLabels: true` it will show the labels as part of the component.

So instead of `externalLabels: false` you need to pass `internalLabels: true` instead.

Also check out the new prop: `internalErrors`

## Changes to fields (check all!!)

I removed most fields, because they were _just_ wrapper components without much additive value. Also, the focus of the library is now only on the form generation, not providing a bunch of fields.

You should update your code to use Quasar components directly instead. See below:

## Fields I deleted:

### title / EfTitle:

```js
// Before:
{ fieldType: 'title', label: 'my title' }
// v1.0:
{
  // don't specify any component
  label: 'my title',
  span: true,
  fieldClasses: 'easy-field--title',
}
```

You can make title fields prettier via CSS. Eg.

```sass
.easy-field--title .easy-field__label
  font-weight: 600
```

### Others:

```js
// Before:
{ fieldType: 'btnToggle' }
{ fieldType: 'img' }
{ fieldType: 'input' }
{ fieldType: 'markdown' }
{ fieldType: 'range' }
{ fieldType: 'select' }
{ fieldType: 'slider' }
{ fieldType: 'toggle' }

// v1.0:
{ component: 'QBtnToggle', spread: true }
{ component: 'QImg' }
{ component: 'QInput' }
{ component: 'QMarkdown', noContainers: true, /* this is a bug fix */, noLineNumbers: true }
{ component: 'QRange' }
{ component: 'QSelect' }
{ component: 'QSlider' }
{ component: 'QToggle', default: false }
```

Some fields might have small differences in behaviour from my previous wrapper components. However, you can check the [source code of my wrapper components here](https://github.com/mesqueeb/quasar-ui-easy-forms/tree/a6b5c9626e6cf172a42f588a361e3b665e9a840f/ui/src/components/fields) and copy the wrapper components to your project if you want.

No equivalents:

```js
// Before:
{ fieldType: 'inputDate' }
{ fieldType: 'link' }
{ fieldType: 'pdf' }
{ fieldType: 'uploaderFirebase' }
{ fieldType: 'video' }

// v1.0
// these don't exist anymore.
```

You can copy my [old source code](https://github.com/mesqueeb/quasar-ui-easy-forms/tree/a6b5c9626e6cf172a42f588a361e3b665e9a840f/ui/src/components/fields).

It's better to have these components defined locally anyway, then it's much more flexible when you need new functionality.

## Fields I kept as is:

```jsack
// Before:
{ fieldType: 'btn' }
{ fieldType: 'div' }
{ fieldType: 'form' }
// v1.0:
{ component: 'EfBtn' } // because this is used in the action-buttons
{ component: 'EfDiv' }
{ component: 'EfMiniForm' }
```

I updated the name to EfMiniForm to make it easier to understand that this is a mini form, not a full fledged EasyForm.

## formDataNested

`formDataNested` was renamed to just `formData`. Just search & replace ;)

<!-- prettier-ignore-end -->
