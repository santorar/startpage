/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"mTUNJUQ2x4VupPeT","label":"School","bookmarks":[{"id":"QkZntpAvJ69hjfJC","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"R3E56CMU3YbG9W8H","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"DQV1W97TVDicFSXb","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"fzRZstYn7eiSffXt","label":"design tools","bookmarks":[{"id":"YNnDbXUvuqSAxCKy","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"BBdCuT1YFmJEiEPL","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"30C4FU3yRRNBcXOt","label":"haikei","url":"https://app.haikei.app/"},{"id":"grjL2TbnWdlV3vRC","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"C52yaGda4ctLeFwG","label":"worth reading","bookmarks":[{"id":"YPeLgMCPZWSPqJPS","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"WG9vQ72mXPAo26p4","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"IQpYh4na4dwPsdYz","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"ZEmqzXwKkB8BwhN1","label":"sources","bookmarks":[{"id":"wq4F3S5zKNoTxq2j","label":"icons","url":"https://feathericons.com/"},{"id":"PzgwLUZZxoGsAoX9","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"TiaABjFpBHkGqUcb","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"rYGTOnmhQXKMCHeo","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
