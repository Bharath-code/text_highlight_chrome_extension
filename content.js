console.log("Content script loaded.")

let popup = null

document.addEventListener("mouseup", function (event) {
  console.log("Mouseup event triggered.") // Added log
  const selectedText = window.getSelection().toString().trim()
  console.log("Selected text raw:", selectedText) // Added log

  // Remove existing popup if any
  if (popup) {
    console.log("Removing existing popup.") // Added log
    document.body.removeChild(popup)
    popup = null
  }

  console.log("Checking selected text length.") // Added log
  if (selectedText.length > 0) {
    console.log("Text selected, length > 0:", selectedText)

    // Create popup element
    console.log("Creating popup element.") // Added log
    popup = document.createElement("div")
    popup.style.position = "absolute"
    popup.style.background = "white"
    popup.style.border = "1px solid black"
    popup.style.padding = "5px"
    popup.style.zIndex = "10000" // Ensure it's on top
    popup.style.cursor = "pointer"
    popup.textContent = "Save Highlight?"
    console.log("Popup element created:", popup) // Added log

    // Position the popup near the mouse cursor
    popup.style.left = `${event.pageX + 5}px`
    popup.style.top = `${event.pageY + 5}px`
    console.log(
      `Popup position set to: left=${popup.style.left}, top=${popup.style.top}`
    ) // Added log

    // Add click listener to the popup (for future save action)
    popup.addEventListener("click", function () {
      console.log(
        "Popup clicked. Sending highlight to background:",
        selectedText
      )
      chrome.runtime.sendMessage({ type: "saveHighlight", text: selectedText })
      if (popup) {
        console.log("Removing popup after click.") // Added log
        document.body.removeChild(popup)
        popup = null
      }
    })

    // Add the popup to the body
    console.log("Appending popup to body.") // Added log
    document.body.appendChild(popup)
    console.log("Popup appended to body.") // Added log

    // Optional: Remove popup if clicked outside
    setTimeout(() => {
      console.log("Setting up mousedown listener to hide popup.") // Added log
      // Use timeout to avoid immediate removal due to the mouseup event itself
      document.addEventListener("mousedown", function hidePopup(e) {
        console.log("Mousedown event detected for hiding popup.") // Added log
        if (popup && !popup.contains(e.target)) {
          console.log("Clicked outside popup, removing.") // Added log
          document.body.removeChild(popup)
          popup = null
          document.removeEventListener("mousedown", hidePopup)
        }
      })
    }, 0)
  } else {
    console.log("No text selected or selected text length is 0.") // Added log
  }
})
