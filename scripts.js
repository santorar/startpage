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

const bookmarks = [{"id":"mTUNJUQ2x4VupPeT","label":"School","bookmarks":[{"id":"QkZntpAvJ69hjfJC","label":"ucundinamarca","url":"https://www.ucundinamarca.edu.co/"},{"id":"R3E56CMU3YbG9W8H","label":"notion","url":"https://www.notion.so/"},{"id":"DQV1W97TVDicFSXb","label":"aulas virtuales","url":"https://moodle.ucundinamarca.edu.co/iniciar/"},{"id":"a6tG10kbvL91AVOG","label":"Office","url":"https://www.office.com/"}]},{"id":"fzRZstYn7eiSffXt","label":"entertaiment","bookmarks":[{"id":"YNnDbXUvuqSAxCKy","label":"youtube","url":"https://www.youtube.com/"},{"id":"BBdCuT1YFmJEiEPL","label":"reddit","url":"https://www.reddit.com"},{"id":"30C4FU3yRRNBcXOt","label":"netflix","url":"https://www.netflix.com/co-en/"},{"id":"grjL2TbnWdlV3vRC","label":"pinterest","url":"https://co.pinterest.com/"}]},{"id":"C52yaGda4ctLeFwG","label":"Development","bookmarks":[{"id":"YPeLgMCPZWSPqJPS","label":"github","url":"https://github.com/"},{"id":"WG9vQ72mXPAo26p4","label":"the odin project","url":"https://www.theodinproject.com/"},{"id":"IQpYh4na4dwPsdYz","label":"freecodecamp","url":"https://www.freecodecamp.org/"}]},{"id":"ZEmqzXwKkB8BwhN1","label":"Social","bookmarks":[{"id":"wq4F3S5zKNoTxq2j","label":"Teams","url":"https://teams.microsoft.com/_#/school/FileBrowserTabApp/General?threadId=19:cObzLYs_L8POsoZtDkH_tD5qV1X8Kg-sdu3HqSp0HDA1@thread.tacv2&ctx=channel"},{"id":"PzgwLUZZxoGsAoX9","label":"Whatsapp","url":"https://web.whatsapp.com"},{"id":"TiaABjFpBHkGqUcb","label":"Gmail","url":"https://mail.google.com/"},{"id":"rYGTOnmhQXKMCHeo","label":"outlook","url":"https://outlook.office.com/mail/"}]}]

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
