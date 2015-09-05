import Backbone = require('backbone');
import WBObjectModel = require('../model/WBObjectModel');
import WBObjectCollection = require('../collection/WBObjectCollection');


class PeerModel extends Backbone.Model {

  private _wbObjectCollection: WBObjectCollection;

  constructor(attributes?: any, options?: any) {
    super(attributes, options);
    this._wbObjectCollection = options.wbObjectCollection;
console.log(this._wbObjectCollection);
    this.listenTo(this._wbObjectCollection, 'sendAdd', this._addObject);
    this.listenTo(this._wbObjectCollection, 'sendChange', this._changeObject);
    this.listenTo(this._wbObjectCollection, 'sendDestroy', this._destroyObject);
    this.listenTo(this._wbObjectCollection, 'sendReset', this._resetWhiteBoard);
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
    this.get('dataConnection').send({
      type: 'add',
      object: wbObj.toJSON()
    });
  }

  private _changeObject(wbObj: WBObjectModel): void {
    this.get('dataConnection').send({
      type: 'change',
      object: wbObj.toJSON()
    });
  }

  private _destroyObject(wbObj: WBObjectModel): void {
    this.get('dataConnection').send({
      type: 'destroy',
      object: wbObj.toJSON()
    });
  }

  private _resetWhiteBoard(collection: WBObjectCollection) {
    this.get('dataConnection').send({
      type: 'reset'
    });
  }

  private _apply(data: any) {
console.log(data);
    switch (data.type) {
      case 'add':
        var addObj: WBObjectModel = new WBObjectModel(data.object);
        this._wbObjectCollection.add(addObj);
        break;

      case 'change':
        var chObj: WBObjectModel = this._wbObjectCollection.get(data.object.id);
        if (chObj) {
          chObj.set(data.object, {silent: true});
          chObj.trigger('receiveChange', chObj);
        }
        break;

      case 'destroy':
        var desObj: WBObjectModel = this._wbObjectCollection.get(data.object.id);
        if (desObj) {
          desObj.destroy();
        }
        break;

      case 'reset':
        this._wbObjectCollection.reset();
    }
console.log(this._wbObjectCollection);
  }

}
export = PeerModel;
