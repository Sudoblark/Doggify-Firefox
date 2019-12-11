/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}
/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
/*
Create all the context menu items.
*/

browser.menus.create({
  id: "doggify-me",
  title: "Doggify me!",
  contexts: ["image","video"]
}, onCreated);

browser.menus.onClicked.addListener(function (info, tab) {
  // Sent single message to current tab with the source url for
  // image to change
  browser.tabs.sendMessage(
    tab.id,
    {imageToChangeURL: `${info.srcUrl}`}
  )
  console.log(`Sent message to tab ${tab.id} to Doggify ${info.srcUrl}`)
})
