import Backbone = require('backbone');
import WBObjectModel = require('../model/WBObjectModel');
import WBObjectCollection = require('../collection/WBObjectCollection');


class PeerModel extends Backbone.Model {

  private _wbObjectCollection: WBObjectCollection;

  constructor(attributes?: any, options?: any) {
    super(attributes, options);
    this._wbObjectCollection = options.wbObjectCollection;
console.log(this._wbObjectCollection);
    this.listenTo(this._wbObjectCollection, 'add', this._addObject);
    this.listenTo(this._wbObjectCollection, 'change', this._changeObject);
    this.listenTo(this._wbObjectCollection, 'destroy', this._destroyObject);
    this.listenTo(this._wbObjectCollection, 'reset', this._resetWhiteBoard);
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
console.log("add");
  }

  private _changeObject(wbObj: WBObjectModel): void {
console.log("change");
  }

  private _destroyObject(wbObj: WBObjectModel): void {
console.log("destroy");
  }

  private _resetWhiteBoard(collection: WBObjectCollection, options: any) {
console.log("reset");
  }

  private _apply(data: any) {
console.log(data);
  }

}
export = PeerModel;
