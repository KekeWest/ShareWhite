import Backbone = require('backbone');
import WBObjectCollection = require('../collection/WBObjectCollection');


class PeerModel extends Backbone.Model {

  private _wbObjectCollection: WBObjectCollection;

  constructor(attributes?: any, options?: any) {
    super(attributes, options);
    this._wbObjectCollection = options.wbObjectCollection;
    this.listenTo(this._wbObjectCollection, 'add', this._addObject);
    this.listenTo(this._wbObjectCollection, 'change', this._changeObject);
    this.listenTo(this._wbObjectCollection, 'remove', this._removeObject);
    this.get('dataConnection').on('data', (data: any) => {
      this._apply(data);
    });
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


  private _addObject(wbObj: WBObjectModel): void {

  }

  private _changeObject(wbObj: WBObjectModel): void {
  
  }

  private _removeObject(wbObj: WBObjectModel): void {

  }

  private _apply(data: any) {
    console.log(data);
  }

}
export = PeerModel;
