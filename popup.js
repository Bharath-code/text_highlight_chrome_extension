document.addEventListener("DOMContentLoaded", function () {
  const highlightsList = document.getElementById("highlights-list")

  // Fetch highlights from storage
  chrome.storage.local.get({ highlights: [] }, (result) => {
    const highlights = result.highlights
    console.log("Loaded highlights:", highlights)

    if (highlights.length === 0) {
      highlightsList.textContent = "No highlights saved yet."
      return
    }

    // Clear placeholder text
    highlightsList.innerHTML = ""

    // Display each highlight
    highlights.forEach((highlight, index) => {
      const highlightElement = document.createElement("div")
      highlightElement.style.borderBottom = "1px solid #eee"
      highlightElement.style.padding = "10px 0"
      highlightElement.style.marginBottom = "5px"

      const textElement = document.createElement("p")
      textElement.textContent = `"${highlight.text}"`
      textElement.style.fontStyle = "italic"
      textElement.style.marginBottom = "5px"

      const urlElement = document.createElement("p")
      const urlLink = document.createElement("a")
      urlLink.href = highlight.url
      urlLink.textContent = highlight.url
      urlLink.target = "_blank" // Open link in new tab
      urlElement.style.fontSize = "0.8em"
      urlElement.style.color = "#555"
      urlElement.appendChild(document.createTextNode("Source: "))
      urlElement.appendChild(urlLink)

      highlightElement.appendChild(textElement)
      highlightElement.appendChild(urlElement)

      highlightsList.appendChild(highlightElement)
    })
  })
})
