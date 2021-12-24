export default function createWidget(id) {
  const root = document.getElementById(id);
  const widget = Widget();
  const widgetHeader = WidgetHeader(() => {
    widget.toggle();
  });
  const widgetBody = WidgetBody();
  const widgetBodySearchResults = WidgetBodySearchResults();
  const widgetBodySearch = WidgetBodySearch(
    term => {
      fetch(`http://localhost:3000/search?term=${encodeURIComponent(term)}`)
        .then(response => response.json())
        .then(json => {
          widgetBodySearchResults.refreshResults(json);
        });
    },
    () => {
      widgetBodySearchResults.refreshResults([]);
    },
  );

  widgetBody.element.appendChild(widgetBodySearch.element);
  widgetBody.element.appendChild(widgetBodySearchResults.element);

  widget.element.appendChild(widgetHeader.element);
  widget.element.appendChild(widgetBody.element);

  root.appendChild(widget.element);
}

function Widget() {
  let isOpen = false;

  const widget = document.createElement('div');
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

  return {
    element: widgetBody,
  };
}

function WidgetBodySearch(onSubmit, onClear) {
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

  const widgetBodySearchSubmitIcon = WidgetBodySearchIcon('submit', 'bi bi-search', () => {
    onSubmit(searchTerm);
  });
  const widgetBodySearchClearIcon = WidgetBodySearchIcon('clear', 'bi bi-x-lg', () => {
    searchTerm = '';
    widgetBodySearchInput.value = '';
    onClear();
  });

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

function WidgetBodySearchResults() {
  const widgetBodySearchResults = document.createElement('div');
  widgetBodySearchResults.className = 'widget-body-search-results';
  refreshResults([{ title: 'Статья', link: '#' }]);

  function refreshResults(articles) {
    widgetBodySearchResults.innerHTML = __refreshResults(articles);
  }

  function __refreshResults(articles) {
    const resultsTitle =
      '<div class="widget-text-h6 widget-body-search-results-header">Результаты поиска</div>';

    if (articles.length === 0) {
      return `
        ${resultsTitle}
        <div>Не найдено ни одной статьи</div>
      `;
    }

    const articlesLinks = articles
      .map(
        i => `
        <li>
            <a href="${i.link}" target="_blank">${i.title}</a>
        </li>`,
      )
      .join('\n');

    return `
        ${resultsTitle}
        <ul class="widget-body-search-results-list">
            ${articlesLinks}
        </ul>
    `;
  }

  return {
    element: widgetBodySearchResults,
    refreshResults,
  };
}
