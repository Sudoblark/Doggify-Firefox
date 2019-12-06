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
            for(let Breed of value.message) {
                console.log(Breed) 
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


