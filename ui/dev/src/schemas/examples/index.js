// easy forms
export const basics = {
  code: [require('./basics').default],
  string: [require('!!raw-loader!./basics').default],
}
export const actionButtons = {
  code: [require('./actionButtons').default],
  string: [require('!!raw-loader!./actionButtons').default],
}
export const advanced = {
  code: [require('./advanced').default],
  string: [require('!!raw-loader!./advanced').default],
}
export const nestedData = {
  code: [require('./nestedData').default],
  string: [require('!!raw-loader!./nestedData').default],
}
export const validation = {
  code: [require('./validation').default, require('./validation2').default],
  string: [
    require('!!raw-loader!./validation').default,
    require('!!raw-loader!./validation2').default,
  ],
}
export const responsiveStyle = {
  code: [require('./responsiveStyle').default],
  string: [require('!!raw-loader!./responsiveStyle').default],
}
export const QSelectModel = {
  code: [require('./QSelectModel').default],
  string: [require('!!raw-loader!./QSelectModel').default],
}
export const evaluatedProps = {
  code: [
    require('./evaluatedProps1').default,
    require('./evaluatedProps2').default,
    require('./evaluatedProps3').default,
    require('./evaluatedProps4').default,
  ],
  string: [
    require('!!raw-loader!./evaluatedProps1').default,
    require('!!raw-loader!./evaluatedProps2').default,
    require('!!raw-loader!./evaluatedProps3').default,
    require('!!raw-loader!./evaluatedProps4').default,
  ],
}
export const events = {
  code: [require('./events1').default, require('./events2').default],
  string: [require('!!raw-loader!./events1').default, require('!!raw-loader!./events2').default],
}

// easy fields
export const EfMiniForm = {
  code: [require('./EfMiniForm').default],
  string: [require('!!raw-loader!./EfMiniForm').default],
}
export const EfBtn = {
  code: [require('./EfBtn').default],
  string: [require('!!raw-loader!./EfBtn').default],
}
export const EfDiv = {
  code: [require('./EfDiv').default],
  string: [require('!!raw-loader!./EfDiv').default],
}
