// Code from user Iván Nokonoko on Stack Overflow @ https://stackoverflow.com/questions/50796884/open-the-extensions-options-html-page-in-new-tab-when-clicking-on-extension-ico
// 
// Here we're basically using this file to listen to events concerning the extension
// Do not have any popup for our extension
chrome.browserAction.setPopup({popup:''});  //disable browserAction's popup

// Instead, open our clipboard listening page in a new tab woot
chrome.browserAction.onClicked.addListener(()=>{
    chrome.tabs.create({url:'public/index.html'});
});