module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/env"],
  ],

  plugins: [
    ['import', {
      'libraryName': 'vant',
      'libraryDirectory': 'es',
      'style': true
    }]
  ]
}
