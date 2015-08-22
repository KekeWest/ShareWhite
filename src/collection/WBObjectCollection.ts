import Backbone = require('backbone');
import WBObjectModel = require('../model/WBObjectModel');

class WBObjectCollection extends Backbone.Collection<WBObjectModel> {

  constructor() {
    super();
    this.listenTo(this, "add", this._onAdd);
    this.listenTo(this, "reset", this._onReset);
  }

  private _onAdd(wbObj: WBObjectModel): void {
    this.listenTo(wbObj, "destroy", this._onDestroy);
  }

  private _onDestroy(wbObj: WBObjectModel): void {
    this.remove(wbObj);
  }

  private _onReset(collection: WBObjectCollection, options: any): void {
    _(options.previousModels).each((model: WBObjectModel) => {
      model.destroy();
    });
  }

}
export = WBObjectCollection;

