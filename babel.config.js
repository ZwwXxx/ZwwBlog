const components = require('prismjs/components');
const allLanguages = Object.keys(components.languages).filter((item) => item !== 'meta');
module.exports = {
  presets: [
    // ["es2015", { "modules": false }],
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
  // plugins: [
  //   [
  //     'prismjs',
  //     {
  //       // languages: ['html','java']
  //       languages: allLanguages
  //     },
  //   ],
  // ],
}
