import Backbone = require('backbone');


class WBUtilModel extends Backbone.Model {

  public defaults(): any {
    return {
      objectType: 'text',
      objectColor: 'color-black',
      textFontSize: 'fontsize-m'
    };
  }

  public destroy(): void {
    this.trigger("destroy", this);
  }

}
export = WBUtilModel;
