import Backbone = require('backbone');
import WBObjectModel = require('../model/WBObjectModel');

class WBObjectCollection extends Backbone.Collection<WBObjectModel> {

  constructor() {
    super();
    this.listenTo(this, "reset", this._onReset);
  }


  private _onReset(collection: WBObjectCollection, options: any): void {
    _(options.previousModels).each((model: WBObjectModel) => {
      model.destroy();
    });
  }

}
export = WBObjectCollection;

