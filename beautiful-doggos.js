function ReturnDoggo() {
    console.log("ReturnDoggo start")
    var url = "https://dog.ceo/api/breeds/image/random"
    return fetch(url)
}

function FindDoggo(jsonResponse) {
    console.log("FindDoggo start")
    if (jsonResponse.status != "success") {
        console.log(jsonResponse)
        return "Unable to load doggos"
    } else {
        console.log(jsonResponse['message'])
        return jsonResponse['message']
    }
}

function ReplaceImages() {
    var imageCollection = document.images
    var imageCollectionLength = imageCollection.length
    console.log(`Found ${imageCollectionLength} images`)
    for (var i = 0; i < imageCollectionLength; i++) {
        console.log(`Iteration of image ${i}`)
        ReturnDoggo().then(function(value) {
            console.log("ReturnDoggo then statement")
            console.log(value)
            var lovelyDoggo = FindDoggo(value)
            if (lovelyDoggo != null) {
                imageCollection[i].setAttribute("src", lovelyDoggo)
                console.log(`Set src to ${lovelyDoggo}`)
            } else {
                console.log(`Unable to query for lovely doggos`)
            }
        }).catch(function(value) {
            console.log(value)
        })
    }
}

ReplaceImages();