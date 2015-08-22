/// <reference path='./typings/tsd.d.ts' />

import Environment = require('Environment');
import WBObjectCollection = require('collection/WBObjectCollection');
import WhiteBoardView = require('view/WhiteBoardView');
import WBUtilModel = require('model/WBUtilModel');
import WBUtilView = require('view/WBUtilView');

export function run(): void {
  Environment.checkEnv();
  var wbUtilModel: WBUtilModel = new WBUtilModel();
  var wbObjectCollection: WBObjectCollection = new WBObjectCollection();
  var wbUtilView: WBUtilView = new WBUtilView({
    collection: wbObjectCollection,
    model: wbUtilModel
  });
  var wbView: WhiteBoardView = new WhiteBoardView({
    collection: wbObjectCollection,
    model: wbUtilModel
  });
  wbUtilView.render();
  wbView.render();
}

