// webpack.config.js or webpack.mix.js
mix.js('resources/js/app.js', 'public/js')
   .postCss('resources/css/app.css', 'public/css', [
      require('postcss-import'),
      require('tailwindcss'),
      require('postcss-nested'),
      require('postcss-preset-env'),
   ]);
