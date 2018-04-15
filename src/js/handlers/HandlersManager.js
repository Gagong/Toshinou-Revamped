class HandlersManager {
  constructor(a) {
    this.handlers = {};
    this._api = a;
  }

  registerEvent(e, h) {
    $(document).on(e, h.handler);
  }

  registerCommand(id, h) {
    this.handlers[id] = h.handler;
  }

  listen() {
    var self = this;
    $(document).on("commandRec", function (e) {
      var s = e.detail.split("|");
      var id = parseInt(s[0]);
      var cmd = s[1];

      /*if (window.gebug)*/
      /*console.log(id + "|" + cmd);*/

      var h = self.handlers[id];
      if (h != null) {
        h({
          detail: cmd,
          wholeMessage: e.detail
        }, self._api);
      }
    });
  }
}