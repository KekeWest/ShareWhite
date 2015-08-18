/// <reference path='./typings/tsd.d.ts' />

import Backbone = require('backbone');
import WBObjectCollection = require('collection/WBObjectCollection');
import WhiteBoardView = require('view/WhiteBoardView');
import UtilModel = require('model/UtilModel');
import UtilView = require('view/UtilView');

export function run() {
  var utilModel: UtilModel = new UtilModel();
  var wbObjectCollection: WBObjectCollection = new WBObjectCollection();
  var utilView: UtilView = new UtilView({model: utilModel});
  var wbView: WhiteBoardView = new WhiteBoardView({
    collection: wbObjectCollection,
    model: utilModel
  });
  utilView.render();
  wbView.render();
}

