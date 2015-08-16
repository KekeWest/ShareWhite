import Backbone = require('backbone');
import Task = require('../model/Task');


class TaskList extends Backbone.Collection<Backbone.Model> {
  
  model = Task;

  constructor() {
    super();
    this.bind("add", this._onAdd, this);
  }

  private _onAdd(task: Task) {
    task.bind("destroy", this._onDestroy, this);
  }

  private _onDestroy(task: Task) {
    this.remove(task);
  }

}

export = TaskList;
