require.config({

  baseUrl: "./dist/js",

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery.min',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone',
  },

  shim: {
    underscore: {
      exports: '_'
    }
  }

});


require(['main', 'templates'], (Main, JST) => {
  Main.run();
});
