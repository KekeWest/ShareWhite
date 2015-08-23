import Backbone = require('backbone');


class WBUtilModel extends Backbone.Model {

  public defaults(): any {
    return {
      objectType: 'text',
      objectColor: 'color-black',
      textFontSize: 'fontsize-m'
    };
  }

}
export = WBUtilModel;
