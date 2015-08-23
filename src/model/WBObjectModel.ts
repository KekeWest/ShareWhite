import Backbone = require('backbone');


class WBObjectModel extends Backbone.Model {

  public defaults(): any {
    return {
      objectType: 'text',
      objectColor: 'color-black',
      posLeft: 0,
      posTop: 0,
      width: 1,
      height: 1,
      textFontSize: 'fontsize-m',
      text: ""
    };
  }

}
export = WBObjectModel;
