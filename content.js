// content.js
function scrapeData() {
    // Target the specific input element by its id
    let dataElement = document.querySelector('input[name="docprop-docid"]');
    return dataElement ? dataElement.value.trim() : null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrape') {
        let data = scrapeData();
        sendResponse({data: data});
    }
});