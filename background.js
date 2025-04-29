console.log("Background script loaded.")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "saveHighlight") {
    console.log("Received highlight to save:", request.text)
    // Get existing highlights from storage
    chrome.storage.local.get({ highlights: [] }, (result) => {
      const highlights = result.highlights
      // Add the new highlight (consider adding URL, timestamp etc. later)
      highlights.push({
        text: request.text,
        url: sender.tab ? sender.tab.url : "Unknown URL",
        timestamp: new Date().toISOString(),
      })
      // Save the updated list back to storage
      chrome.storage.local.set({ highlights: highlights }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error saving highlight:", chrome.runtime.lastError)
          sendResponse({
            status: "error",
            message: chrome.runtime.lastError.message,
          })
        } else {
          console.log("Highlight saved successfully.")
          sendResponse({ status: "success" })
        }
      })
    })
    // Return true to indicate you wish to send a response asynchronously
    return true
  }
})

// Optional: Log stored highlights on startup for debugging
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get({ highlights: [] }, (result) => {
    console.log("Highlights on startup:", result.highlights)
  })
})

// Optional: Log stored highlights when the extension is installed/updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ highlights: [] }, (result) => {
    console.log("Highlights on install/update:", result.highlights)
  })
})
