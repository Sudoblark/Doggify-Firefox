function ReturnBreeds() {
    // Log for debugging
    console.log("ReturnDoggo start")
    var url = "https://dog.ceo/api/breeds/list/all"
    // Return promise of fetch
    return fetch(url)
}

function EnumerateBreeds(JsonPromise) {
    JsonPromise.then(function(value) {
        if (value.status != "success") {
            // On failure....
            console.log("Unable to load doggo breeds")
        } else {
            // On success...
            console.log(value.message)
            // Enumerate keys
            var BreedArray = value.message
            for(var Breed in BreedArray) {
                // For each key check if there are subkeys
                if (BreedArray[Breed].length > 0) {
                    for(var Index in BreedArray[Breed]) {
                        SubBreed = BreedArray[Breed][Index]
                        console.log(`*** BREED ${SubBreed} ${Breed} ***`)
                    }
                } else {
                    console.log(`*** BREED ${Breed} ***`)
                }
            }

        }
    })
}

window.onload = function() {
    this.ReturnBreeds().then(function(value) {
        // Find json of response
        var JsonResponse = value.json()
        // Enumerate breeds from promise
        EnumerateBreeds(JsonResponse)
    })
}


