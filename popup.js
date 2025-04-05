document.addEventListener("DOMContentLoaded", () => {
  const enabledCheckbox = document.getElementById("enabled");

  // Load saved state
  chrome.storage.sync.get("enabled", (data) => {
    enabledCheckbox.checked = data.enabled !== false; // Default to true
  });

  // Save state when checkbox changes
  enabledCheckbox.addEventListener("change", () => {
    chrome.storage.sync.set({ enabled: enabledCheckbox.checked });

    // Notify content script about the change
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "toggleEnabled",
          enabled: enabledCheckbox.checked,
        });
      }
    });
  });
});
