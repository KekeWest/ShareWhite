/// <reference path='./typings/tsd.d.ts' />


require(['jquery', 'backbone', 'templates', 'collection/WBObjectCollection', 'view/WhiteBoardView'], 
        ($, Backbone, JST, WBObjectCollection, WhiteBoardView) => {
          $(() => {
            var mainView = new WhiteBoardView({ collection: new WBObjectCollection() });
            mainView.render();
          });
});
