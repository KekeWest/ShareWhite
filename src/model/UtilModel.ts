import Backbone = require('backbone');


class UtilModel extends Backbone.Model {

  defaults() {
    return {
      ObjectType: 'text',
      fontSize: 11,
      fontColor: 'black'
    }
  }

  destroy() {
    this.trigger("destroy", this);
  }

}
export = UtilModel;
