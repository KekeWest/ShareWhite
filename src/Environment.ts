class Environment {

  static device:string;
  static browser:string;

  static checkEnv() {

    var userAgent = navigator.userAgent.toLowerCase();
    var appVersion = navigator.appVersion.toLowerCase();
    // デバイス判定
    if (userAgent.indexOf('iphone') > 0 || userAgent.indexOf('ipod') > 0 || userAgent.indexOf('android') > 0) {
      this.device = 'device-mobile';
    } else {
      this.device = 'device-pc';
    }
    // ブラウザ判定
    if (userAgent.indexOf('opera') != -1) {
      this.browser = 'opera';
    } else if (userAgent.indexOf("msie") != -1) {
      if (appVersion.indexOf("msie 6.") != -1) {
        this.browser = 'ie6';
      } else if (appVersion.indexOf("msie 7.") != -1) {
        this.browser = 'ie7';
      } else if (appVersion.indexOf("msie 8.") != -1) {
        this.browser = 'ie8';
      } else if (appVersion.indexOf("msie 9.") != -1) {
        this.browser = 'ie9';
      } else {
        this.browser = 'ie';
      }
    } else if (userAgent.indexOf('trident') != -1) {
      this.browser = 'ie11';
    } else if (userAgent.indexOf('chrome') != -1) {
      this.browser = 'chrome';
    } else if (userAgent.indexOf('safari') != -1) {
      this.browser = 'safari';
    } else if (userAgent.indexOf('firefox') != -1) {
      this.browser = 'firefox';
    } else {
      this.browser = 'unknown';
    }

  }

}
export = Environment;
