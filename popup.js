console.log("enter script");

function exportConversation(mode) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"],
      },
      function () {
        chrome.tabs.sendMessage(tabs[0].id, { exportMode: mode });
      }
    );
  });
}

document
  .getElementById("exportFullButton")
  .addEventListener("click", function () {
    console.log("exportButton");
    exportConversation("full");
  });

document
  .getElementById("exportUserButton")
  .addEventListener("click", function () {
    console.log("exportUserButton");
    exportConversation("user");
  });

document
  .getElementById("exportChatGPTButton")
  .addEventListener("click", function () {
    console.log("exportChatGPTButton");
    exportConversation("chatgpt");
  });
