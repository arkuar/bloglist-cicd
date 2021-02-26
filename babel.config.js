module.exports = (api) => {
  api.cache(false)

  const plugins = [
    '@babel/plugin-transform-react-jsx'
  ]

  return {
    plugins
  }
}