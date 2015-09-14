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
  private static _intervalTime: number = 10000;
  private static _myPeerID: string = null;
  private static _myName: string = "none";


  public static get myPeerID(): string {
    return this._myPeerID;
  }


  public static get myName(): string {
    return this._myName;
  }


  public static set myName(val: string) {
    this._myName = val;
    _(this._peerCollection.models).each((pModel: PeerModel) => {
      pModel.sendMyName(this._myName);
    });
  }


  public static init(peerCollection: PeerCollection, wbObjectCollection: WBObjectCollection): void {
    
    this._wbObjectCollection = wbObjectCollection;
    this._peerCollection = peerCollection;

    _(this).bindAll('_connectAllUsers');
    
    this._peer = new Peer({
      host: this._peerServerAddr,
      port: this._peerServerPort,
      path: this._peerServerPath
    });

    this._peer.on('open', (id: string) => {
      this._myPeerID = id;
      this._connectAllUsers();
      setInterval(this._connectAllUsers, this._intervalTime);
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
    
    this._peerCollection.add(peerModel);
  }


  private static _connectUser(id: string): void {
    
    if (this._peerCollection.get(id) || this._myPeerID === id) {
      return;
    }
    var conn: PeerJs.DataConnection = this._peer.connect(id);
    if (conn) {
      conn.on('open', () => {
        this._setPeer(conn);
      });
    }
  
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
