export default function createWidget(id) {
  const root = document.getElementById(id);
  const widget = Widget();
  const widgetHeader = WidgetHeader(() => {
    widget.toggle();
  });
  const widgetBody = WidgetBody();

  widget.element.appendChild(widgetHeader.element);
  widget.element.appendChild(widgetBody.element);

  root.appendChild(widget.element);
}

function Widget() {
  const widget = document.createElement('div');
  let isOpen = false;
  widget.className = 'widget';

  return {
    element: widget,
    toggle: () => {
      isOpen = !isOpen;
      widget.className = isOpen ? 'widget widget--opened' : 'widget';
    },
  };
}

function WidgetHeader(onClick) {
  const header = document.createElement('div');
  header.className = 'widget-header';
  header.innerHTML = '<span class="widget-text-h6">Поддержка</span>';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'widget-icon widget-header-close';
  closeBtn.innerHTML = '<i class="bi bi-dash-lg"></i>';

  closeBtn.onclick = () => {
    onClick();
  };

  header.onclick = () => {
    onClick();
  };

  header.appendChild(closeBtn);

  return {
    element: header,
  };
}

function WidgetBody() {
  const widgetBody = document.createElement('div');
  widgetBody.className = 'widget-body';
  widgetBody.innerText = 'fsfdfd';

  return {
    element: widgetBody,
  };
}
