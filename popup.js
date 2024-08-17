// popup.js
document.getElementById('scrape').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        // Extract the current tab's URL to get the domain
        let url = new URL(tabs[0].url);
        let domain = url.hostname;

        chrome.tabs.sendMessage(tabs[0].id, {action: 'scrape'}, (response) => {
            if (response.data) {
                // Construct the hyperlink using the scraped data and the current domain
                let docid = response.data;
                let hyperlink = `https://${domain}/MetaViewer/Ip?name=FindPayables&docid=${docid}`;
                let linkHTML = `<a href="${hyperlink}" target="_blank">View Document ${docid}</a>`;
                document.getElementById('result').innerHTML = linkHTML;

                // Show the Copy button
                document.getElementById('copy').style.display = 'block';

                // Add the link to the button's data attribute for copying
                document.getElementById('copy').dataset.link = hyperlink;
            } else {
                document.getElementById('result').textContent = 'No data found.';
                document.getElementById('copy').style.display = 'none';
            }
        });
    });
});

document.getElementById('copy').addEventListener('click', () => {
    // Get the link from the button's data attribute
    let link = document.getElementById('copy').dataset.link;
    navigator.clipboard.writeText(link).then(() => {
        document.getElementById('message').textContent = 'Link copied to clipboard!';
    }).catch(err => {
        document.getElementById('message').textContent = 'Failed to copy the link.';
    });
});