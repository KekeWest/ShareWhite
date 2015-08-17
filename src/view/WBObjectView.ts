import Backbone = require('backbone');
import WBObjectModel = require('../model/WBObjectModel');


class WBObjectView extends Backbone.View<WBObjectModel> {
 
  template: (data: any) => string;

  constructor(options?) {
    this.tagName = "div";
    this.className = "wb-object";
    this.template = JST['wbtext'];
    this.events = <any>{
      "change input[type=text].wb-text": "_onEdit",
      "dblclick .wb-obj": "_onDelete",
    };
    super(options);
    this.listenTo(this.model, "change", this.render);
  }

  private _onEdit() {
    console.log("hoge");
    // this.model.set('isEditing', true);
  }

  private _onDelete() {
    // this.model.destroy();
  }

  render(): WBObjectView {
    var data = this.model.toJSON();
    var html = this.template(data);
    this.$el.html(html);
    return this;
  }

}
export = WBObjectView;
