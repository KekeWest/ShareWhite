import Backbone = require('backbone');


class UtilModel extends Backbone.Model {

  defaults() {
    return {
      objectType: 'text',
      objectColor: 'color-black',
      textFontSize: 'fontsize-m'
    }
  }

  destroy() {
    this.trigger("destroy", this);
  }

}
export = UtilModel;
