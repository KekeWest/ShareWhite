import Backbone = require('backbone');


class UtilModel extends Backbone.Model {

  defaults() {
    return {
      objectType: 'text',
      objectOption: {
        fontSizeClass: 'font-size-s'
      },
      color: 'color-black'
    }
  }

  destroy() {
    this.trigger("destroy", this);
  }

}
export = UtilModel;
