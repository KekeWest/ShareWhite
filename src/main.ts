/// <reference path='./typings/tsd.d.ts' />


require(['jquery', 'backbone', 'templates', 'collection/TaskList', 'view/TaskListView'], 
        ($, Backbone, JST, TaskList, TaskListView) => {
          $(() => {
            var mainView = new TaskListView({ collection: new TaskList() });
            mainView.render();
          });
});
