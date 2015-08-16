import Backbone = require('backbone');
import Task = require('../model/Task');
import TaskList = require('../collection/TaskList');
import TaskView = require('../view/TaskView');


class TaskListView extends Backbone.View<Backbone.Model> {
  
  
  constructor(options?) {
    this.events = <any>{
      'click #add-input': '_onAddInputClick'
    };
    super(options);
    this.setElement($('#main'), true);
    _.bindAll(this);
    this.collection.bind('add', this.render);
    this.collection.bind('remove', this.render);
  }

  private _onAddInputClick() {
    var name = $('#name-input').val();
    if (_.isEmpty(name)) {
      alert("task name is empty.");
      return;
    }
    var task = new Task({ 'name': name });
    this.collection.add(task);
    $('#name-input').val("");
  }

  render(): TaskListView {
    var TaskListEl = $('#task-list');
    TaskListEl.empty();
    this.collection.each(task => {
      var view = new TaskView({ model: task });
      view.render();
      TaskListEl.append(view.el);
                        
    });
    return this;
  }
}

export = TaskListView;
