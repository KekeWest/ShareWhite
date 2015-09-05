import Backbone = require('backbone');
import JST = require('jst');
import WBObjectCollection = require('../collection/WBObjectCollection');
import PeerCollection = require('../collection/PeerCollection');
import WBUtilModel = require('../model/WBUtilModel');

class WBUtilView extends Backbone.View<WBUtilModel> {

  private template: (data: any) => string = null;
  private _wbObjectCollection: WBObjectCollection = null;
  private _peerCollection: PeerCollection = null;


  constructor(options?: any) {
    super(options);
    this.setElement($('#util-container'), true);
    this.template = JST['util'];
    this.events = <any>{
      'click div[id^="wb-util-text-color-"]': "_updateTextColor",
      'click div[id^="wb-util-text-fontsize-"]': "_updateTextFontSize",
      'click #wb-util-clear': "_clearObject"
    };
    this._wbObjectCollection = options.wbObjectCollection;
    this._peerCollection = options.peerCollection;
    this.listenTo(this._peerCollection, 'change', this.render);
    this.listenTo(this.model, 'change', this.render);
  }


  public render(): WBUtilView {
    var data = this.model.toJSON();
    var html = this.template(data);
    this.$el.html(html);
    $('#wb-util-text-' + data.objectColor).addClass("util-active");
    $('#wb-util-text-' + data.textFontSize).addClass("util-active");
    return this;
  }


  private _updateTextColor(event: any): void {
    var color: string = event.target.id.replace(/^wb\-util\-text\-/g, '');
    this.model.set('objectColor', color);
  }


  private _updateTextFontSize(event: any): void {
    var fontsize: string = event.target.id.replace(/^wb\-util\-text\-/g, '');
    this.model.set('textFontSize', fontsize);
  }


  private _clearObject(): void {
    this._wbObjectCollection.reset();
    this._wbObjectCollection.trigger("sendReset", this._wbObjectCollection);
  }

}
export = WBUtilView;
