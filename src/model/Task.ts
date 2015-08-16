import Backbone = require('backbone');


class Task extends Backbone.Model {
  
  defaults() {
    return {
      name: "",
      completed: false,
      isEditing: false
    }
  }


  destroy() {
    this.trigger("destroy", this);
  }

  validate(attrs: any) : string {
    if (_.isString(attrs.name) && _.isEmpty(attrs.name)) {
      return "task name is empty.";
    }
  }

}

export = Task;
