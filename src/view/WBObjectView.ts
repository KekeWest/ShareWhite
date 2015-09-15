import Backbone = require('backbone');
import JST = require('jst');
import WBObjectModel = require('../model/WBObjectModel');


class WBObjectView extends Backbone.View<WBObjectModel> {
 
  private _template: (data: any) => string;
  private _ruler: JQuery;
  private _input: JQuery;
  private _fontSize: number;

  constructor(options?: any) {
    this.tagName = "div";
    this.className = "wb-object";
    this._template = JST['wbtext'];
    this.events = <any>{
      "keydown  input[type=text].wb-text": "_updateText",
      "keyup    input[type=text].wb-text": "_updateText",
      "focusout input[type=text].wb-text": "_updateText",
      "dblclick .wb-text": "_onDelete"
    };
    super(options);
    this.listenTo(this.model, "change", this.updateState);
    this.listenTo(this.model, "destroy", this.onDestroy);
  }

  public onDestroy(): void {
    this.remove();
  }
  
  public render(options?: any): WBObjectView {
    var data = this.model.toJSON();
    var html = this._template(data);
    this.$el.html(html);
    this._input = this.$el.children('input');
    this._ruler = this.$el.children('span');
    $('#white-board').append(this.el);
    if (!options.fromPeer) {
      this._input.focus();
    }
    this._fontSize = parseInt(this._input.css('font-size'), 10);
    return this;
  }

  public updateState(model: WBObjectModel, options: any = {}): void {
    if (options.fromPeer) {
      this._input.val(this.model.get("text"));     
    }

    var width: number;
    this._ruler.text(this._input.val());
    if (options.eventType === "keydown") {
      width = this._ruler.get(0).offsetWidth + this._fontSize + 1;
    } else {
      width = this._ruler.get(0).offsetWidth + 1;
    }
    this._input.css({width: width});
  }

  private _updateText(event: any): void {
    var text: string = this._input.val();
    switch (event.type) {
      case "keydown":
        if (text === this.model.get("text")) {
          this.updateState(this.model, {eventType: "keydown"});  
        } else {
          this.model.set({text: text}, {eventType: "keydown"});
          this.model.trigger("sendChange", this.model);
        }
        break;

      case "keyup":
        this.model.set({text: text}, {eventType: "keyup"});
        this.model.trigger("sendChange", this.model);
        break;

      case "focusout":
        if (_.isEmpty(text)) {
          this._onDelete();
        } else {
          this.updateState(this.model);
        }
        break;
    }
  }

  private _onDelete(): void {
    this.model.trigger('sendDestroy', this.model);
    this.model.destroy();
  }

}
export = WBObjectView;
