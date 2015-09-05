import Peer = require('peer');
import PeerModel = require('../model/PeerModel');
import PeerCollection = require('../collection/PeerCollection');
import WBObjectCollection = require('../collection/WBObjectCollection');


class P2PManager {

  private static _peerCollection: PeerCollection;
  private static _wbObjectCollection: WBObjectCollection;
  private static _peer: PeerJs.Peer;
  private static _peerServerAddr: string = "192.168.1.21";
  private static _peerServerPort: number = 9000;
  private static _peerServerPath: string = '/';
  private static _myPeerID: string = null;
  private static _myName: string = null;


  public static init(wbObjectCollection: WBObjectCollection): void {
    
    this._wbObjectCollection = wbObjectCollection;
    this._peerCollection = new PeerCollection();
    
    this._peer = new Peer({
      host: this._peerServerAddr,
      port: this._peerServerPort,
      path: this._peerServerPath
    });

    this._peer.on('open', (id: string) => {
      this._myPeerID = id;
      this._connectAllUsers();
    });
    this._peer.on('connection', (conn: PeerJs.DataConnection) => {
      this._setPeer(conn);
    });

  }


  private static _setPeer(conn: PeerJs.DataConnection): void {
    
    var peerModel: PeerModel = new PeerModel(
      {
        id: conn.peer,
        dataConnection: conn
      },
      {
        wbObjectCollection: this._wbObjectCollection
      }
    );
    console.log(peerModel.id);
    
    this._peerCollection.add(peerModel);
  
  }


  private static _connectUser(id: string): void {
    console.log(this._peerCollection.get(id));
    if (this._peerCollection.get(id) || this._myPeerID === id) {
      return;
    }

    var conn: PeerJs.DataConnection = this._peer.connect(id);
    conn.on('open', () => {
      this._setPeer(conn);
    });
  
  }


  private static _connectAllUsers(): void {
    
    this._peer.listAllPeers((list: string[]) => {
      _(list).each((id: string) => {
        this._connectUser(id);
      });
    });
  
  }

}
export = P2PManager;
