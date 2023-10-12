chrome.contextMenus.create({
  id: "log-selection",
  title: "Consultar CNPJ",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "log-selection":
      chrome.windows.create(
        {
          url: `popup.html?cnpj=${info.selectionText}`,
          type: "popup",
          height: 800,
          width: 550,
        },
        function (window) {}
      );
      break;
    // …
  }
});
