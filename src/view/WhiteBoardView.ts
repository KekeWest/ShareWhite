import Backbone = require('backbone');
import WBObjectModel = require('../model/WBObjectModel');
import WBObjectView = require('../view/WBObjectView');

class WhiteBoardView extends Backbone.View<WBObjectModel> {
  
  constructor(options?) {
    this.events = <any>{
      'click #white-board': '_addObject'
    };
    super(options);
    this.setElement($('#wb-container'), true);
    this.listenTo(this.collection, 'add', this.addObject);
    // this.listenTo(this.collection, 'remove', this.removeObject);
  }

  private _addObject(event:any) {
    if (event.target.id != "white-board") return;
    var offset:any = $(event.target).offset(),
        offsetX:number = event.pageX - offset.left,
        offsetY:number = event.pageY - offset.top;
    console.log(event);
    var wbObj:WBObjectModel = new WBObjectModel({posLeft: offsetX, posTop: offsetY});
    this.collection.add(wbObj);
  }

  addObject(wbObj:WBObjectModel) {
    var view:WBObjectView = new WBObjectView({ model: wbObj });
    view.render();
    $('#white-board').append(view.el);
    $('#white-board').find(':last').focus();
  }

  // removeObject(wbObj:WBObjectModel) {
  // }

  render(): WhiteBoardView {
    var whiteBoardEl:JQuery = $('#white-board');
    whiteBoardEl.empty();

    this.collection.each(wbObj => {
      var view = new WBObjectView({ model: wbObj });
      view.render();
      whiteBoardEl.append(view.el);
    });

    return this;
  }
}
export = WhiteBoardView;
