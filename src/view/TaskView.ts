import Backbone = require('backbone');
import Task = require('../model/Task');
import TaskList = require('../collection/TaskList');


class TaskView extends Backbone.View<Backbone.Model> {
  
  template: (data: any) => string;

  constructor(options?) {
    this.tagName = "div";
    this.template = JST['task'];
    this.events = <any>{
      "change input[type=checkbox]": "_onCheck",
      "click a.edit-link": "_onEdit",
      "click input.save-input": "_onSave",
      "click input.cancel-input": "_onCancel",
      "click input.delete-input": "_onDelete",
    };
    super(options);
    this.model.bind("change", this.render, this);
    this.model.bind("error", this._onError, this);
  }

  private _onError(model, error) {
    alert(error);
  }

  private _onCheck() {
    var completed = this.model.get('completed');
    this.model.set({ completed: !completed });
  }

  private _onEdit() {
    this.model.set('isEditing', true);
  }

  private _onSave() {
    var name = $(this.el).find('input.name-input').first().val();
    this.model.set({ name: name, isEditing: false });
  }

  private _onCancel() {
    this.model.set('isEditing', false);
  }

  private _onDelete() {
    this.model.destroy();
  }

  render(): TaskView {
    var data = this.model.toJSON();
    var html = this.template(data);
    $(this.el).html(html);
    return this;
  }

}

export = TaskView;
