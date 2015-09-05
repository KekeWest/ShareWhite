/// <reference path='./typings/tsd.d.ts' />

import P2PManager = require('net/P2PManager');
import Environment = require('util/Environment');
import WBObjectCollection = require('collection/WBObjectCollection');
import PeerCollection = require('collection/PeerCollection');
import WhiteBoardView = require('view/WhiteBoardView');
import WBUtilModel = require('model/WBUtilModel');
import WBUtilView = require('view/WBUtilView');

export function run(): void {
  
  var wbUtilModel: WBUtilModel = new WBUtilModel();
  var wbObjectCollection: WBObjectCollection = new WBObjectCollection();
  var peerCollection: PeerCollection = new PeerCollection();

  var wbUtilView: WBUtilView = new WBUtilView({
    wbObjectCollection: wbObjectCollection,
    peerCollection: peerCollection,
    model: wbUtilModel
  });
  var wbView: WhiteBoardView = new WhiteBoardView({
    collection: wbObjectCollection,
    model: wbUtilModel
  });
  wbUtilView.render();
  wbView.render();

  Environment.checkEnv();
  P2PManager.init(peerCollection, wbObjectCollection);

}

