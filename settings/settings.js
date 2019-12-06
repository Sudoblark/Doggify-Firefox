// #region Doggo population
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

function PopulateBreeds() {
    return new Promise(function(resolve, reject) {
        this.ReturnBreeds().then(function(value) {
            // Find json of response
            var JsonResponse = value.json()
            // Enumerate breeds from promise
            var BreedList = EnumerateBreeds(JsonResponse)
            BreedList.then(function(value) {
                // Find select
                var SelectBox = document.getElementById("DoggoBreedsSelect")
                // Populate
                var index = 1
                // All option
                SelectBox[0] = new Option("All doggos", "All doggos")
                value.forEach(element => {
                    SelectBox[index] = new Option(element.value, element.value)
                    index++
                })
                return resolve("Populate DoggoBreedsSelect")
            }).catch(function(error) {
                return reject(`Unable to populateDoggoBreedsSelect: ${error}`)
            })
        })
    })
}
// #endregion Doggo population

// #region Save Settings
function saveOptions(e) {
    e.preventDefault();
    // Get selected breed
    var BreedsSelection = document.getElementById("DoggoBreedsSelect")
    var BreedSelected = BreedsSelection.options[BreedsSelection.selectedIndex].text
    // Save setting
    browser.storage.sync.set({
      PreferredBreed: BreedSelected
    });
    // Output to console
    console.log("***** Saving Settings *****")
    console.log(`PreferredBreed: ${BreedSelected}`)
    console.log("***** Settings Saved  *****")
}


function restoreOptions() {
    // Set current choice
    function setCurrentChoice(result) {
        console.log("***** Getting Settings *****")
        // Get preference
        var PreferredBreedIndex = result.PreferredBreed
        console.log(`PreferredBreed: ${PreferredBreedIndex}`)
        // Get index
        console.log("***** Setting Settings *****")
        var Collection = document.getElementById("DoggoBreedsSelect")
        var PreferredIndex = ReturnIndex(Collection, PreferredBreedIndex)
        Collection.selectedIndex = PreferredIndex
        console.log(`Index: ${PreferredIndex}`)
    }
    function onError(error) {
      console.log(`Error: ${error}`);
    }
    var getting = browser.storage.sync.get("PreferredBreed");
    getting.then(setCurrentChoice, onError);
  }

function ReturnIndex(HTMLCollection, ExpectedValue) {
    var CollectionLength = HTMLCollection.length
    for(var i = 0; i < CollectionLength -1; i++) {
        if (HTMLCollection[i].value == ExpectedValue) {
            return i
        }
    }
    return 0
}

// #endregion Save Settings



window.onload = function() {
    this.PopulateBreeds().then(function(value) {
        // Log result of promises
        console.log(value)
        // *** Bind event handlers *** //
        // Save options event handler
        document.getElementById("SaveSettings").addEventListener('click', saveOptions)
        // *** End event handlers *** //
        // Restore options if possible
        restoreOptions()
    }).catch(function (error) {
        // Log error
        console.log(error)
    })
}


