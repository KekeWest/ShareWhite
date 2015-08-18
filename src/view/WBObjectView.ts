import Backbone = require('backbone');
import WBObjectModel = require('../model/WBObjectModel');


class WBObjectView extends Backbone.View<WBObjectModel> {
 
  template: (data:any) => string;

  constructor(options?) {
    this.tagName = "div";
    this.className = "wb-object";
    this.template = JST['wbtext'];
    this.events = <any>{
      "keydown  input[type=text].wb-text": "_updateText",
      "keyup    input[type=text].wb-text": "_updateText",
      "focusout input[type=text].wb-text": "_updateText",
      "dblclick .wb-text": "_onDelete",
    };
    super(options);
    this.listenTo(this.model, "change", this.updateStyle);
    this.listenTo(this.model, "destroy", this.onDestroy);
  }
 
  private _updateText(event:any) {
    var text:string = this.$el.children().first().val();
    switch(event.type) {
      case "keydown":
        var width:number = this._strWidth(text) + 20;
        this.model.set({text: text, width: width});
        break;
      case "keyup":
        var width:number = this._strWidth(text) + 1;
        this.model.set({text: text, width: width});
        break;
      case "focusout":
        if (_.isEmpty(text)) this._onDelete();
        break;
    }
  }

  private _onDelete() {
    this.model.destroy();
  }

  private _strWidth(str:string):number {
    var e:JQuery = $("#ruler");
    var width:number = e.text(str).get(0).offsetWidth;
    return width;
  }

  onDestroy() {
    this.remove();
  }

  updateStyle() {
    this.$el.children().first().css({
      width: this.model.get('width') + "px"
    });
  }

  render(): WBObjectView {
    var data = this.model.toJSON();
    var html = this.template(data);
    this.$el.html(html);
    return this;
  }

}
export = WBObjectView;
