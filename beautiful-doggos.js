function GetDoggoPreference() {
    return new Promise(function(resolve,reject){
        var getting = browser.storage.sync.get("PreferredBreed");
        getting.then(function(result) {
            var PreferredBreedIndex = result.PreferredBreed
            console.log(`PreferredBreed: ${PreferredBreedIndex}`)
            return resolve(PreferredBreedIndex)
        })
    })
}

function ReturnDoggoURL(result) {
    return new Promise(function(resolve,reject){
        // if no result is returned, or the preference is all doggos
        if ((result == null) || (result == "All doggos")) {
            // return all doggos
            var url = "https://dog.ceo/api/breeds/image/random"
        } else {
            // otherwise construct the appropriate string and then return this
            var url = "https://dog.ceo/api/breed/" + result + "/images/random"
        }
        console.log(`Doggo URL: ${url}`)
        return resolve(url)
    })
}

function ReturnDoggo(url) {
    // Return promise of fetch
    return fetch(url)
}

function FindDoggo(jsonResponse) {
    // Log for debugging
    // If not OK status then return and log error
    if (jsonResponse.status != "success") {
        return "Unable to load doggos"
    } else { // If OK then try to return message value which will
        // be a url of a doggo from the api
        var FindDoggoReturn = jsonResponse['message']
        return FindDoggoReturn
    }
}

function ReplaceImageURL(BaseURL, image) {
    ReturnDoggo(BaseURL).then(function(value) {
        // Find json of response
        var JsonResponse = value.json()
        // json is actually promise, so to get value need to use then
        JsonResponse.then(function(value) {
            var lovelyDoggo = FindDoggo(value)
            if (lovelyDoggo != "Unable to load doggos") {
                image.src = lovelyDoggo
            } else {
                console.log(`Unable to query for lovely doggos for image`)
            }
        })}).catch(function(value) {
        console.log(value)
    })
}

function ReplaceImages(DoggoUrl) {
    // find all images on page
    var imageCollection = document.images
    var imageCollectionLength = imageCollection.length
    var index = 1
    // Iterate through all images
    for(let image of imageCollection) {
        console.log(`Iterating image ${index}/${imageCollectionLength}`)
        GetDoggoPreference().then(ReturnDoggoURL).then(function(url) {
            ReplaceImageURL(url, image)})
        // Increment index
        index++ 
    }
}

function GetContinousDoggoSetting() {
    // function to query browser storage for continous doggo setting
    return new Promise(function(resolve,reject){
        var getting = browser.storage.sync.get("ContinousDoggos");
        getting.then(function(result) {
            var ContinousDoggosBool = result.ContinousDoggos
            console.log(`ContinousDoggos: ${ContinousDoggosBool}`)
            return resolve(ContinousDoggosBool)
        }).catch(function(error) {
            console.log(`Error: ${error}`)
            return resolve (false)
        })
    })
}

GetContinousDoggoSetting().then(function(value) {
    var ContinousDoggos = false
    if ((value != null) && (value != false)) {
        ContinousDoggos = true
    }

    if (ContinousDoggos != false)  {
        console.log("continousDoggos set to TRUE")
        // First populate the url for doggos then replace all images
        GetDoggoPreference().then(ReturnDoggoURL).then(ReplaceImages)
    } else {
        // Otherwise do not
        console.log("continousDoggos set to FALSE")
    }

})


// Add listener for info passed from doggify contextmenu click
browser.runtime.onMessage.addListener(request => {
    // Check if valid URL is passed back
    var requestURL = request.imageToChangeURL
    if (requestURL == null || requestURL.length == 0) {
        // If not raise error
        console.error("Invalid url passed from background script")
        return "Invalid url passed from background script"
    } else {
        // If proper url then find image based on this
        var imageCollection = document.images
        var Success = false
        for(let image of imageCollection) {
            // If match is found
            if (image.src == requestURL) {
                console.log(`Replaced src of image using url ${requestURL}`)
                Success = true
                // Replace src and return success
                GetDoggoPreference().then(ReturnDoggoURL).then(function(url) {
                    ReplaceImageURL(url, image)})
                break  
            }
        }
        if (Success != true) {
            console.error("No match found for Doggify target")
        }
    }
})