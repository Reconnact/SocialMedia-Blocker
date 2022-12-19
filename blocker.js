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
        modifiedResults.sites.push({"site": window.location.href, notifications: 0, blocks: 0})
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

function updateBlocks(){
    let gettingAllStorageItems = browser.storage.local.get(null);
    gettingAllStorageItems.then((results) => {
        let modifiedResults = results;
        for (let index = 0; index < results.sites.length; index++) {
            if (results.sites[index].site == location){
                modifiedResults.sites[index].blocks++;
                browser.storage.local.set({"sites": modifiedResults.sites})
                window.location.href = "https://www.google.com/ "
            }
        }
    
    })
}

function showBlocker(site){
    let outerDiv = document.createElement('div');
    outerDiv.id = "modal-from-blocker-extension"
    outerDiv.style ="z-index: 2147483647; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;"
    let content = document.createElement('div');
    content.style = "position: absolute; top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: rgb(35, 34, 43); padding: 1rem 1.5rem;width: 40%;border-radius: 0.5rem; color: #f8f8f2; font-size: 13px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;"
    let closeButton = document.createElement('button')
    closeButton.innerHTML = "&times;"
    closeButton.style = "position: fixed; right: 0; top: 0; border: none; height: 30px; width: 30px; margin: 2%; text-align: center;cursor: pointer;border-radius: 0.25rem;background-color: gray; margin-left: 5%; color: white;"
    content.innerHTML += "<h1 style='margin-top: 1%; margin-bottom: 1%; color: #f8f8f2; font-size: 20px;'>Are you sure you want to access this page?</h1><br/><h3 style='color: #f8f8f2; font-size: 13px;'>" + site.site + "</h3>"+
    "<p style='margin-top: 13px; margin-bottom: 13px;'>You have accessed this page " + site.notifications + " times!</p>" +
    "<p style='margin-bottom: 13px;'>Social Media Blocker blocked this page " + site.blocks + " times!</p>"
    let closeTab = document.createElement('button')
    closeTab.innerHTML = "I don't want to access this site!"
    closeTab.style = "border: none; padding: 2%; background-color: #4285f4; text-align: center; cursor: pointer;border-radius: 0.25rem; color: white;"
    content.appendChild(closeTab)
    content.appendChild(closeButton)
    outerDiv.appendChild(content)
    document.body.appendChild(outerDiv);
    
    //Close button functions
    closeButton.onclick = function(){
        document.getElementById("modal-from-blocker-extension").style = "display: none;"
    }
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = "gray"
    })
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.backgroundColor = "#f44263"
    })

    //Close Tab functions
    closeTab.onclick = function(){
        updateBlocks()
    }
    closeTab.addEventListener('mouseleave', () => {
        closeTab.style.backgroundColor = "#4285f4"
    })
    closeTab.addEventListener('mouseover', () => {
        closeTab.style.backgroundColor = "#1f6fef"
    })
}