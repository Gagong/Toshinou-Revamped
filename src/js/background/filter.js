/*
Created by Freshek on 08.02.2018
An emergency filter for EventStream
BP Sucks
Lolis > BP
*/

let blacklist = [
  "main-frame",
  "minimized",
  "movable",
  "window",
  "header",
  "tab",
  "minimize-btn",
  "content"
]

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    let result = false;
    console.log("executed!");
    blacklist.forEach(item => {
      if (details.url.indexOf(item) != -1)
        result = true;
    });
    return {
      cancel: result
    };
  }, {
    urls: ["https://*.bigpoint.net/*"]
  }, ["blocking"]
);
