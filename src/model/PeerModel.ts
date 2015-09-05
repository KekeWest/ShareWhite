import Backbone = require('backbone');
import WBObjectCollection = require('../collection/WBObjectCollection');


class PeerModel extends Backbone.Model {

  private _wbObjectCollection: WBObjectCollection;

  constructor(attributes?: any, options?: any) {
    super(attributes, options);
    this._wbObjectCollection = options.wbObjectCollection;
  }


  public defaults(): any {
    return {
      id: null,
      dataConnection: null
    };
  }


  public destroy(): void {
    this.trigger("destroy", this);
  }

}
export = PeerModel;
