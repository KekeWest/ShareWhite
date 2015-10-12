import Backbone = require('backbone');
import PeerModel = require('../model/PeerModel');

class PeerCollection extends Backbone.Collection<PeerModel> {

  constructor() {
    super();
    this.listenTo(this, "reset", this._onReset);
  }


  private _onReset(collection: PeerCollection, options: any): void {
    _(options.previousModels).each((model: PeerModel) => {
      model.destroy();
    });
  }

}
export = PeerCollection;
