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
    this.listenTo(this.model, "change", this.updateStyle);
    this.listenTo(this.model, "destroy", this.onDestroy);
  }

  public onDestroy(): void {
    this.remove();
  }

  public updateStyle(): void {
    this._input.css({
      width: this.model.get('width') + "px"
    });
  }

  public render(): WBObjectView {
    var data = this.model.toJSON();
    var html = this._template(data);
    this.$el.html(html);
    $('#white-board').append(this.el);
    this._input = this.$el.children('input');
    this._ruler = this.$el.children('span');
    this._fontSize = parseInt(this._input.css('font-size'), 10);
    this._input.focus();
    return this;
  }

  private _updateText(event: any): void {
    var text: string = this._input.val();
    var width: number = 1;
    this._ruler.text(text);
    switch (event.type) {
      case "keydown":
        width = this._getStrWidth() + this._fontSize + 1;
        this.model.set({text: text, width: width});
        break;
      case "keyup":
        width = this._getStrWidth() + 1;
        this.model.set({text: text, width: width});
        break;
      case "focusout":
        if (_.isEmpty(text)) {
          this._onDelete();
        }
        break;
    }
  }

  private _onDelete(): void {
    this.model.destroy();
  }

  private _getStrWidth(): number {
    return this._ruler.get(0).offsetWidth;
  }

}
export = WBObjectView;
