export default function createWidget(id) {
  const root = document.getElementById(id);
  const widget = Widget();
  const widgetHeader = WidgetHeader(() => {
    widget.toggle();
  });
  const widgetBody = WidgetBody();
  const widgetBodySearch = WidgetBodySearch();

  widgetBody.element.appendChild(widgetBodySearch.element);

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

  closeBtn.onclick = onClick;

  header.onclick = onClick;

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

function WidgetBodySearch() {
  let searchTerm = '';
  const widgetBodySearch = document.createElement('div');
  widgetBodySearch.className = 'widget-body-search';

  const widgetBodySearchInput = document.createElement('input');
  widgetBodySearchInput.className = 'widget-body-search-input';
  widgetBodySearchInput.type = 'text';
  widgetBodySearchInput.placeholder = 'Введите название статьи';
  widgetBodySearchInput.value = searchTerm;

  widgetBodySearchInput.onchange = event => {
    searchTerm = event.target.value;
  };

  const widgetBodySearchSubmitIcon = WidgetBodySearchIcon('submit', 'bi bi-search', () => {});
  const widgetBodySearchClearIcon = WidgetBodySearchIcon('clear', 'bi bi-x-lg', () => {});

  widgetBodySearch.appendChild(widgetBodySearchInput);
  widgetBodySearch.appendChild(widgetBodySearchSubmitIcon.element);
  widgetBodySearch.appendChild(widgetBodySearchClearIcon.element);

  return {
    element: widgetBodySearch,
  };
}

function WidgetBodySearchIcon(type, iconClass, onClick) {
  const iconBtn = document.createElement('button');
  iconBtn.className = `widget-icon widget-body-search-${type}`;
  iconBtn.innerHTML = `<i class="${iconClass}"></i>`;
  iconBtn.onclick = onClick;

  return {
    element: iconBtn,
  };
}
