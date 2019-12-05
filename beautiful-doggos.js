function ReturnDoggo() {
    // Log for debugging
    console.log("ReturnDoggo start")
    var url = "https://dog.ceo/api/breeds/image/random"
    // Return promise of fetch
    return fetch(url)
}

function FindDoggo(jsonResponse) {
    // Log for debugging
    console.log("FindDoggo start")
    // If not OK status then return and log error
    if (jsonResponse.status != "success") {
        console.log(jsonResponse)
        return "Unable to load doggos"
    } else { // If OK then try to return message value which will
        // be a url of a doggo from the api
        var FindDoggoReturn = jsonResponse['message']
        console.log(`Find Doggo Return ${FindDoggoReturn}`)
        return FindDoggoReturn
    }
}

function ReplaceImages() {
    // find all images on page
    var imageCollection = document.images
    // get length
    var imageCollectionLength = imageCollection.length
    // Log for debugging
    console.log(`Found ${imageCollectionLength} images`)
    // Iterate through all images
    for (var i = 0; i < imageCollectionLength; i++) {
        console.log(`Iteration of image ${i}`)
        // Call API then after call is finished
        ReturnDoggo().then(function(value) {
            console.log("ReturnDoggo then statement")
            // Find json of response
            var JsonResponse = value.json()
            // json is actually promise, so to get value need to use then
            JsonResponse.then(function(value) {
                console.log(value)
                var lovelyDoggo = FindDoggo(value)
                if (lovelyDoggo != "Unable to load doggos") {
                    imageCollection[i].setAttribute("src", lovelyDoggo)
                    console.log(`Tried to set src for image ${i} to ${lovelyDoggo}`)
                } else {
                    console.log(`Unable to query for lovely doggos for image ${i}`)
                }
            })

        }).catch(function(value) {
            console.log(value)
        })
    }
}

ReplaceImages();
