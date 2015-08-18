import Backbone = require('backbone');
import UtilModel = require('../model/UtilModel');

class UtilView extends Backbone.View<Backbone.Model> {

  template: (data:any) => string;

  constructor(options?) {
    this.setElement($('#util-container'), true);
    this.template = JST['util'];
    this.events = <any>{
      
    };
    super(options);
    this.listenTo(this.model, 'change', this.render);
  }

  render(): UtilView {
    var data = this.model.toJSON();
    var html = this.template(data);
    this.$el.html(html);
    return this;
  }

}
export = UtilView;
