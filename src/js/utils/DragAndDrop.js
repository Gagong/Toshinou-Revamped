class DragAndDrop {

  constructor(el, isOn = false) {
    this.el = el;
    this.parent = el.parentNode;
    this.isOn = isOn;
    this.isMainFrame = false;

    if (isOn) {
      this.on();
    }

    return this;
  }

  init() {
    this.el.onselectstart = () => {
      return false
    };

    this.el.onmousedown = (e) => {
      this._onMouse(e);
    };

    this.el.ondragstart = (ev) => {
      ev.target.dispatchEvent(ev);
      ev.preventDefault();

      return false;
    };
  }

  _onMouse(e) {

    this.shiftX = e.pageX - this.parent.offsetLeft;
    this.shiftY = e.pageY - this.parent.offsetTop;

    document.onselectstart = () => {
      return false
    };

    document.onmousemove = (e) => {
      this._moveThis(e);
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onselectstart = null;
      this.el.onmouseup = null;
    };
  }

  _moveThis(e) {

    let newX = e.pageX - this.shiftX;
    let newY = e.pageY - this.shiftY;

    let xTobig = (newX + this.parent.clientWidth >= window.innerWidth || newX < 0);
    let yTobig = (newY + this.parent.clientHeight >= window.innerHeight || newY < 0);

    if (!xTobig) {
      this.parent.style.left = newX + 'px';
    }
    if (!yTobig) {
      this.parent.style.top = newY + 'px';
    }

  }

  on() {
    this.isOn = true;
    this.parent.classList.add('movable');
    document.body.appendChild(this.parent);
    this.init();
  }

  off() {
    this.isOn = false;
    if (!this.isMainFrame) {
      window.mainFrameWindow.appendChild(this.parent);
    }
    this.el.onselectstart = null;
    this.parent.classList.remove('movable');
    this.el.onmousedown = null;
    this.el.ondragstart = null;
    this.el.onselectstart = null;
  }

}