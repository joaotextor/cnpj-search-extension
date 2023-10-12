console.log("plugin loaded");

browser.menus.create(
  {
    id: "log-selection",
    title: "Consultar CNPJ",
    contexts: ["selection"],
  },
  () => void browser.runtime.lastError
);

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "log-selection":
      browser.windows.create(
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
