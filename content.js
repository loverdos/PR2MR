// Terminology mapping
const terminologyMap = {
  // Common PR terms to MR terms
  "Pull Request": "Merge Request",
  "Pull request": "Merge request",
  "Pull Requests": "Merge Requests",
  "Pull requests": "Merge requests",
  "pull request": "merge request",
  "pull requests": "merge requests",
  PR: "MR",
  PRs: "MRs",
  "#PR": "#MR",
  "Compare & pull request": "Compare & merge request",
  "Draft Pull Request": "Draft Merge Request",
  "Open a pull request": "Open a merge request",
  "Create Pull Request": "Create Merge Request",
  "New Pull Request": "New Merge Request",
  "Linked pull requests": "Linked merge requests",
  "Pull request successfully merged": "Merge request successfully merged",
  "Pull request closed": "Merge request closed",
  "Pull request reopened": "Merge request reopened",
  "Reopen pull request": "Reopen merge request",
  Reverts: "Reverts", // Keep the same
  "Close pull request": "Close merge request",
  Closes: "Closes", // Keep the same
  Closed: "Closed", // Keep the same
  Merged: "Merged", // Keep the same
  Open: "Open", // Keep the same
  Draft: "Draft", // Keep the same
};

// Function to replace text in text nodes
function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let newText = node.textContent;

    // Apply replacements
    for (const [github, gitlab] of Object.entries(terminologyMap)) {
      // Use regex with word boundaries where appropriate
      const regex = new RegExp(
        `\\b${github.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "g"
      );
      newText = newText.replace(regex, gitlab);
    }

    if (newText !== node.textContent) {
      node.textContent = newText;
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Skip script and style nodes
    if (node.tagName === "SCRIPT" || node.tagName === "STYLE") {
      return;
    }

    // Process child nodes
    Array.from(node.childNodes).forEach(replaceText);
  }
}

// Function to replace text in attributes (like title, aria-label, etc.)
function replaceAttributes(element) {
  const attributesToReplace = ["title", "aria-label", "placeholder", "alt"];

  attributesToReplace.forEach((attr) => {
    if (element.hasAttribute(attr)) {
      let value = element.getAttribute(attr);
      let newValue = value;

      for (const [github, gitlab] of Object.entries(terminologyMap)) {
        const regex = new RegExp(
          `\\b${github.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
          "g"
        );
        newValue = newValue.replace(regex, gitlab);
      }

      if (newValue !== value) {
        element.setAttribute(attr, newValue);
      }
    }
  });

  // Process child elements
  Array.from(element.children).forEach(replaceAttributes);
}

// Main function to replace all PR terminology with MR terminology
function replacePRTerminology() {
  // Replace text in DOM
  replaceText(document.body);

  // Replace text in attributes
  replaceAttributes(document.body);
}

// Run replacement when page loads
replacePRTerminology();

// Use MutationObserver to handle dynamic content changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          replaceText(node);
          replaceAttributes(node);
        }
      });
    }
  });
});

// Start observing the document
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Not needed for basic functionality, but can be added for advanced features
chrome.runtime.onInstalled.addListener(() => {
  console.log("GitHub to GitLab Terminology extension installed");
});
