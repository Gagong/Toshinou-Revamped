class ControlFactory {

  static info({
    labelText,
    spanText,
    appendTo
  }) {
    let info = jQuery("<div>");

    let label = jQuery("<label>");
    label.html(labelText);
    label.appendTo(info);

    let span = jQuery("<span>");
    span.html(spanText);
    span.appendTo(info);


    info.appendTo(appendTo);

    return info;
  }

  static select({
    labelText,
    appendTo,
    eventType = "change",
    event = () => {},
    attrs = {},
    options = []
  }) {

    let select = jQuery("<select>");

    Object.keys(attrs).forEach((name) => {
      select.attr(name, attrs[name]);
    });

    options.forEach((option) => {
      let localOption = jQuery("<option>");
      localOption.attr('value', option.value);
      localOption.text(option.text);
      localOption.appendTo(select);
    });

    if (labelText) {
      let label = jQuery("<label>");
      label.html(labelText);
      label.appendTo(appendTo);
    }

    select.appendTo(appendTo);


    select[eventType](function (ev) {

      this.select = select;
      if (labelText) {
        this.label = label;
      }

      event.call(this, ev);
    });

    return {
      option,
      label
    };

  }

  static checkbox({
    labelText,
    appendTo,
    eventType = "change",
    event = () => {},
    attrs = {}
  }) {
    return this.createControl({
      labelText,
      appendTo,
      eventType,
      event,
      attrs
    });
  }

  static createControl({
    type = "checkbox",
    labelText,
    labelBefore = false,
    appendTo,
    br = true,
    eventType = "change",
    event = () => {},
    attrs = {},
  }) {
    let input = jQuery("<input>");
    input.attr("type", type);

    Object.keys(attrs).forEach((name) => {
      input.attr(name, attrs[name]);
    });

    let label = jQuery("<label>");
    label.html(labelText);

    if (labelBefore) {
      label.appendTo(appendTo);
    }

    input.appendTo(appendTo);

    if (!labelBefore) {
      label.appendTo(appendTo);
    }

    if (br) {
      jQuery("<br>").appendTo(appendTo);
    }

    input[eventType](function (ev) {
      this.input = input;
      this.label = label;
      event.call(this, ev);
    });

    return {
      input,
      label
    };
  }

  static emptyDiv(appendTo) {
    return jQuery("<div>").appendTo(appendTo);
  }

  static btn({
    labelText,
    appendTo
  }) {
    let btn = jQuery("<button>", {
      class: 'btn'
    });
    btn.html(labelText);
    btn.appendTo(appendTo);
    return btn;
  }
}