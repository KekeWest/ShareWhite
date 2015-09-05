require.config({

  baseUrl: "./dist/js",

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery.min',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone',
    peer: '../../bower_components/peerjs/peer.min'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    jst: {
      exports: 'JST'
    },
    peer: {
      exports: 'Peer'
    }
  }

});


require(['main'], (Main: any) => {
  Main.run();
});
