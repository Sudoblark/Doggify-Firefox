function openPage() {
    setTimeout(function() {
        url = "https://dog.ceo/api/breeds/image/random"
        const Http = new XMLHttpRequest();
        Http.open("GET", url)
        Http.responseType = "json"
        Http.send();
        Http.onreadystatechange=(e)=>{
            if (Http.readyState == 4) {
                FindDoggo(Http.response)
            }
        }
    }, 300)
}

function FindDoggo(jsonResponse) {
    if (jsonResponse.status != "success") {
        alert("Unable to load doggos :(")
        console.log(jsonResponse)
    } else {
        console.log(jsonResponse)
        doggoUrl = jsonResponse['message']
        console.log(doggoUrl)

        var windowObjectReference;
        var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
        windowObjectReference = window.open(doggoUrl, "Random Doggo")

    }
}


browser.browserAction.onClicked.addListener(openPage);
