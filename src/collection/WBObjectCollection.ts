import Backbone = require('backbone');
import WBObjectModel = require('../model/WBObjectModel');

class WBObjectCollection extends Backbone.Collection<WBObjectModel> {

  constructor() {
    super();
    this.bind("add", this._onAdd, this);
  }

  private _onAdd(wbObj: WBObjectModel) {
    wbObj.bind("destroy", this._onDestroy, this);
  }

  private _onDestroy(wbObj: WBObjectModel) {
    this.remove(wbObj);
  }

}
export = WBObjectCollection;

