class TabsHelper {

  constructor(el) {
    this.el = el;
    this.allHeaders = el.parentNode;
    this.contentEl = $(`[data-target="${$(this.el).attr('data-href')}"]`);
    this.init();
  }

  init() {
    $(this.el).on('click', (ev) => {
      $(this.allHeaders.childNodes).removeClass('active');
      $('[data-tab="true"]').removeClass('active');
      $(this.el).addClass('active');
      this.contentEl.addClass('active');
    });
  }
}