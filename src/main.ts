/// <reference path='./typings/tsd.d.ts' />

import Backbone = require('backbone');
import Environment = require('Environment');
import WBObjectCollection = require('collection/WBObjectCollection');
import WhiteBoardView = require('view/WhiteBoardView');
import WBUtilModel = require('model/WBUtilModel');
import WBUtilView = require('view/WBUtilView');

export function run() {
  Environment.checkEnv();
  var wbUtilModel: WBUtilModel = new WBUtilModel();
  var wbObjectCollection: WBObjectCollection = new WBObjectCollection();
  var wbUtilView: WBUtilView = new WBUtilView({model: wbUtilModel});
  var wbView: WhiteBoardView = new WhiteBoardView({
    collection: wbObjectCollection,
    model: wbUtilModel
  });
  wbUtilView.render();
  wbView.render();
}

