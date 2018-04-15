const HEADER_HEIGHT = 40;

class WindowFactory {

  static createWindow(params) {

    if (!window.mainFrameWindow) {
      window.mainFrameWindow = this.windowsStructure({
        text: "Windows | 10.0.6341 | v.008",
        isMain: true
      })[0];

      if (window.globalSettings.windowsToTabs) {
        $(window.mainFrameWindow).addClass('tabs');
        jQuery('<div>', {
          'class': 'headers'
        }).appendTo(window.mainFrameWindow);
      }


    }

    if (window.globalSettings.windowsToTabs) {
      return this.tabsStructure(params);
    } else {
      return this.windowsStructure(params);
    }

  }

  static tabsStructure(params) {

    let allHeaders = $('.headers', window.mainFrameWindow);
    let tabsCount = $('.header', allHeaders).length;

    let header = jQuery('<h4>', {
      'class': 'header',
      'title': params.text || 'Untitled',
      'text': params.text[0] || 'U'
    }).appendTo(allHeaders);

    header.attr('data-href', `tab${tabsCount}`);

    let content = jQuery('<div>', {
      'class': 'content',
      css: {
        maxHeight: params.maxHeight || '',
      }
    }).appendTo(window.mainFrameWindow);

    content.attr('data-target', `tab${tabsCount}`);
    content.attr('data-tab', `true`);

    if (tabsCount === 0) {
      $(header).addClass('active');
      $(content).addClass('active');
    }

    new TabsHelper(header[0]);

    return content;

  }

  static windowsStructure(params) {
    const pane = jQuery('<div>', {
      width: params.width || 330,
      height: (params.height + HEADER_HEIGHT) || '',
      'class': 'window',
      css: {
        backgroundColor: 'transparent',
      },
    }).appendTo(params.isMain ? 'body' : window.mainFrameWindow);

    const headerCol = ColorConverter.hexToRgb(window.globalSettings.headerColor);
    const header = jQuery('<h4>', {
      text: params.text || 'Untitled',
      'class': 'header',
      css: {
        backgroundColor: ColorConverter.combine(headerCol.r, headerCol.g, headerCol.b, window.globalSettings.headerOpacity),
      },
    }).appendTo(pane);

    // TODO: Custom scrollbar
    const contentColor = ColorConverter.hexToRgb(window.globalSettings.windowColor);
    const content = jQuery('<div>', {
      'class': `content${params.isMain ? '' : ' minimized'}`,
      css: {
        maxHeight: params.maxHeight || '',
        backgroundColor: ColorConverter.combine(contentColor.r, contentColor.g, contentColor.b, window.globalSettings.windowOpacity),
      },
    }).appendTo(pane);

    const minimizeBtn = jQuery('<span>', {
      text: '_',
      'class': 'minimize-btn',
    }).appendTo(header);

    let dragAndDrop = new DragAndDrop(header[0], params.isMain);

    dragAndDrop.isMainFrame = params.isMain ? true : false;

    minimizeBtn.click(() => {
      if (content.hasClass('minimized')) {
        content.removeClass('minimized');
        dragAndDrop.on();
      } else {
        content.addClass('minimized');
        if (!params.isMain) {
          dragAndDrop.off();
        }
      }
    });

    return content;
  }

}