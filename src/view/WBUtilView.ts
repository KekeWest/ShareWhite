import Backbone = require('backbone');
import JST = require('jst');
import WBObjectCollection = require('../collection/WBObjectCollection');
import PeerCollection = require('../collection/PeerCollection');
import WBUtilModel = require('../model/WBUtilModel');
import P2PManager = require('../net/P2PManager');

class WBUtilView extends Backbone.View<WBUtilModel> {

  private template: (data: any) => string;
  private _wbObjectCollection: WBObjectCollection;
  private _peerCollection: PeerCollection;


  constructor(options?: any) {
    this.setElement($('#util-container'), true);
    this.template = JST['util'];
    this.events = <any>{
      'change input[type=text]#myname-input': "_updateMyName",
      'click div[id^="wb-util-text-color-"]': "_updateTextColor",
      'click div[id^="wb-util-text-fontsize-"]': "_updateTextFontSize",
      'click #wb-util-clear': "_clearObject"
    };
    super(options);
    this._wbObjectCollection = options.wbObjectCollection;
    this._peerCollection = options.peerCollection;
    this.listenTo(this._peerCollection, 'add', this.render);
    this.listenTo(this._peerCollection, 'change', this.render);
    this.listenTo(this._peerCollection, 'destroy', this.render);
    this.listenTo(this.model, 'change', this.render);
  }


  public render(): WBUtilView {
    var data: any = this.model.toJSON();
    _(data).extend({
      peerModels: this._peerCollection.models,
      myPeerID: P2PManager.myPeerID,
      myName: P2PManager.myName
    });
    var html: string = this.template(data);
    this.$el.html(html);
    $('#wb-util-text-' + data.objectColor).addClass("util-active");
    $('#wb-util-text-' + data.textFontSize).addClass("util-active");
    return this;
  }


  private _updateMyName(event: any): void {
    P2PManager.myName = event.target.value;
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
