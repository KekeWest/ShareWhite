import Backbone = require('backbone');


class WBObjectModel extends Backbone.Model {

  defaults() {
    return {
      text: "",
      posLeft: 0,
      posTop: 0,
      width: 1,
      height: 1
    }
  }


  destroy() {
    this.trigger("destroy", this);
  }

  // validate(attrs: any) : string {
  //   if (_.isString(attrs.name) && _.isEmpty(attrs.name)) {
  //     return "task name is empty.";
  //   }
  // }

}
export = WBObjectModel;
