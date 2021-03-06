import Backbone = require('backbone');


class WBObjectModel extends Backbone.Model {

  constructor(attributes?: any, options?: any) {
    super(attributes, options);
    if (!this.id) {
      this.set('id', new Date().getTime() + Math.random());
    }
  }


  public defaults(): any {
    return {
      id: null,
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


  public destroy(): void {
    this.trigger("destroy", this);
  }

}
export = WBObjectModel;
