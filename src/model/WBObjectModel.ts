import Backbone = require('backbone');


class WBObjectModel extends Backbone.Model {

  defaults() {
    return {
      objectType: 'text',
      objectColor: 'color-black',
      posLeft: 0,
      posTop: 0,
      width: 1,
      height: 1,
      textFontSize: 'fontsize-m',
      text: ""
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
