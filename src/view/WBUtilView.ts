import Backbone = require('backbone');
import WBUtilModel = require('../model/WBUtilModel');

class WBUtilView extends Backbone.View<Backbone.Model> {

  template: (data:any) => string;

  constructor(options?) {
    this.setElement($('#util-container'), true);
    this.template = JST['util'];
    this.events = <any>{
      'click div[id^="wb-util-text-color-"]': "_updateTextColor",
      'click div[id^="wb-util-text-fontsize-"]': "_updateTextFontSize"
    };
    super(options);
    this.listenTo(this.model, 'change', this.render);
  }

  private _updateTextColor(event:any) {
    var color:string = event.target.id.replace(/^wb\-util\-text\-/g, '');
    this.model.set('objectColor', color);
  }

  private _updateTextFontSize(event:any) {
    var fontsize:string = event.target.id.replace(/^wb\-util\-text\-/g, '');
    this.model.set('textFontSize', fontsize);
  }

  render(): WBUtilView {
    var data = this.model.toJSON();
    var html = this.template(data);
    this.$el.html(html);
    $('#wb-util-text-' + data.objectColor).addClass("util-active");
    $('#wb-util-text-' + data.textFontSize).addClass("util-active");
    return this;
  }

}
export = WBUtilView;
