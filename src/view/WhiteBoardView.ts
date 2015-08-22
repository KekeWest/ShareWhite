import Backbone = require('backbone');
import WBObjectModel = require('../model/WBObjectModel');
import WBObjectView = require('../view/WBObjectView');

class WhiteBoardView extends Backbone.View<Backbone.Model> {
 
  template: (data:any) => string;

  constructor(options?) {
    this.setElement($('#wb-container'), true);
    this.template = JST['whiteboard'];
    this.events = <any>{
      'click #white-board': '_addObject'
    };
    super(options);
    this.listenTo(this.collection, 'add', this.addObject);
  }

  private _addObject(event:any) {
    if (event.target.id != "white-board") return;
    var offset:any = $(event.target).offset();
    var offsetX:number = event.pageX - offset.left;
    var offsetY:number = event.pageY - offset.top;
    var wbObj:WBObjectModel = new WBObjectModel(_.extend(this.model.toJSON(), {posLeft: offsetX, posTop: offsetY}));
    this.collection.add(wbObj);
  }

  addObject(wbObj:WBObjectModel) {
    var view:WBObjectView = new WBObjectView({ model: wbObj });
    view.render();
  }

  render(): WhiteBoardView {
    var html = this.template({});
    this.$el.html(html);
    this.collection.each(wbObj => {
      var view = new WBObjectView({ model: wbObj });
      view.render();
    });

    return this;
  }
}
export = WhiteBoardView;
