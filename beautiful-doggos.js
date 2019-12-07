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

function ReplaceImages(DoggoUrl) {
    // find all images on page
    var imageCollection = document.images
    var imageCollectionLength = imageCollection.length
    var index = 1
    // Iterate through all images
    for(let image of imageCollection) {
        console.log(`Iterating image ${index}/${imageCollectionLength}`)
        ReturnDoggo(DoggoUrl).then(function(value) {
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
        // Increment index
        index++ 
    }
}

// First populate the url for doggos then replace all images
GetDoggoPreference().then(ReturnDoggoURL).then(ReplaceImages)
