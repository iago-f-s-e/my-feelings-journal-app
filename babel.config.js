module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-transform-typescript-metadata',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx'],
          alias: {
            '@modules': './src/modules',
            '@core': './src/core',
            '@shared': './src/shared',
          },
        },
      ],
    ],
  };
};
