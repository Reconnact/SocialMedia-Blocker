let location = window.location.href
let gettingAllStorageItems = browser.storage.local.get(null);
gettingAllStorageItems.then((results) => {
    let modifiedResults = results;
    if (!results.sites){
        browser.storage.local.set({"sites": []}); 
        modifiedResults = {"sites": []}
        checkSite(modifiedResults)
    } else {
        checkSite(modifiedResults)
    }
});

function checkSite(modifiedResults){
    if (!modifiedResults.sites.find(site => site.site === window.location.href)) {
        modifiedResults.sites.push({"site": window.location.href, notifications: 0})
        browser.storage.local.set(modifiedResults)
        readData()
    } else {
        readData()
    }
}

function readData() {
    let gettingAllStorageItems = browser.storage.local.get(null);
    gettingAllStorageItems.then((results) => {
        let modifiedResults = results;
        for (let index = 0; index < results.sites.length; index++) {
            if (results.sites[index].site == location){
                modifiedResults.sites[index].notifications++;
                browser.storage.local.set({"sites": modifiedResults.sites})
                showBlocker(modifiedResults.sites[index])
            }
        }
})
}

function showBlocker(site){
    let outerDiv = document.createElement('div');
    outerDiv.id = "modal-from-blocker-extension"
    outerDiv.style ="position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;"
    let content = document.createElement('div');
    content.style = "position: absolute; top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: white;padding: 1rem 1.5rem;width: 40%;border-radius: 0.5rem;"
    let closeButton = document.createElement('button')
    closeButton.innerHTML = "&times;"
    closeButton.style = "border: none; position: fixed; top: 0; right: 0; margin-top: 2.5%; margin-right: 2.5%; width: 1.5rem;line-height: 1.5rem;text-align: center;cursor: pointer;border-radius: 0.25rem;background-color: lightgray;"
    content.innerHTML += "<h1>Are you sure you want to access this page?</h1><br/><h3>" + site.site + "</h3><p>Social Media Blocker has blocked this page " + site.notifications + " times"
    let closeTab = document.createElement('button')
    closeTab.innerHTML = "THE RIGHT DECISION!"
    content.appendChild(closeButton)
    content.appendChild(closeTab)
    outerDiv.appendChild(content)
    document.body.appendChild(outerDiv);
    
    closeButton.onclick = function(){
        document.getElementById("modal-from-blocker-extension").style = "display: none;"
    }
    closeTab.onclick = function(){
        window.location.href = "https://www.google.com/ "
    }
}