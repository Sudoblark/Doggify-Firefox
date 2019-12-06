function ReturnBreeds() {
    // Log for debugging
    var url = "https://dog.ceo/api/breeds/list/all"
    // Return promise of fetch
    return fetch(url)
}

function EnumerateBreeds(JsonPromise) {
    return new Promise(function(resolve, reject) {
    // wait for promise to resolve
    JsonPromise.then(function(value) {
        // List to hold breeds we find
        if (value.status != "success") {
            // On failure....
            console.log("Unable to load doggo breeds")
        } else {
            // On success...
            console.log("Enumerating doggo breeds")
            // List to hold results
            var BreedList = []
            // Enumerate keys
            var BreedArray = value.message
            for(var Breed in BreedArray) {
                PushBreedToList(BreedList,BreedArray, Breed)
            } // end of for 
        } // end of else
        return resolve(BreedList) // finally we return BreedList and resolve promise
    }) // end of then
    })
}

function PushBreedToList(List, DoggoArray, DoggoBreed) {
    // Create object
    var SingleBreed = {}
    SingleBreed["type"] = "doggo"
    // For each key check if there are subkeys
    if (DoggoArray[DoggoBreed].length > 0) {
        for(var Index in DoggoArray[DoggoBreed]) {
            SubBreed = DoggoArray[DoggoBreed][Index]
            FinalBreed = `${SubBreed} ${DoggoBreed}`
            SingleBreed["value"] = FinalBreed
            }
    } else {
            SingleBreed["value"] = DoggoBreed
    }
    // Push to list
    List.push(SingleBreed)
}

window.onload = function() {
    this.ReturnBreeds().then(function(value) {
        // Find json of response
        var JsonResponse = value.json()
        // Enumerate breeds from promise
        var BreedList = EnumerateBreeds(JsonResponse)
        BreedList.then(function(value) {
            // Find select
            var SelectBox = document.getElementById("DoggoBreedsSelect")
            // Populate
            var index = 0
            value.forEach(element => {
                SelectBox[index] = new Option(element.value, element.value)
                index++
            });
            console.log("Populated DoggoBreedsSelect")
        })
    })
}


