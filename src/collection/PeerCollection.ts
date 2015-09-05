import Backbone = require('backbone');
import PeerModel = require('../model/PeerModel');

class PeerCollection extends Backbone.Collection<PeerModel> {

  constructor() {
    super();
    this.listenTo(this, "add", this._onAdd);
    this.listenTo(this, "reset", this._onReset);
  }

  private _onAdd(peer: PeerModel): void {
    this.listenToOnce(peer, "destroy", this._onDestroy);
  }

  private _onDestroy(peer: PeerModel): void {
    this.remove(peer);
  }

  private _onReset(collection: PeerCollection, options: any): void {
    _(options.previousModels).each((model: PeerModel) => {
      model.destroy();
    });
  }

}
export = PeerCollection;
