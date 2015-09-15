import Backbone = require('backbone');
import JST = require('jst');
import WBObjectCollection = require('../collection/WBObjectCollection');
import WBObjectModel = require('../model/WBObjectModel');
import WBObjectView = require('../view/WBObjectView');

class WhiteBoardView extends Backbone.View<Backbone.Model> {

  private template: (data: any) => string;

  constructor(options?: any) {
    this.setElement($('#wb-container'), true);
    this.template = JST['whiteboard'];
    this.events = <any>{
      'click #white-board': '_addObject'
    };
    super(options);
    this.listenTo(this.collection, 'add', this.addObject);
  }

  public addObject(wbObjM: WBObjectModel, wbObjC: WBObjectCollection = null, options: any = {}): void {
    var view: WBObjectView = new WBObjectView({ model: wbObjM });
    view.render(options);
  }

  public render(): WhiteBoardView {
    var html = this.template({});
    this.$el.html(html);
    this.collection.each((wbObj: WBObjectModel) => {
      this.addObject(wbObj);
    });

    return this;
  }

  private _addObject(event: any): void {
    if (event.target.id !== "white-board") {
      return;
    }
    var offset: any = $(event.target).offset();
    var offsetX: number = event.pageX - offset.left;
    var offsetY: number = event.pageY - offset.top;
    var wbObj: WBObjectModel = new WBObjectModel(_.extend(this.model.toJSON(), {posLeft: offsetX, posTop: offsetY}));
    this.collection.add(wbObj);
    wbObj.trigger("sendAdd", wbObj);
  }

}
export = WhiteBoardView;
