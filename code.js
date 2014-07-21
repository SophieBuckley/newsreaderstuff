$(document).ready(function() { 
    $("form").submit(function(event) {
        event.preventDefault();
        //":text" == "input[type=text]", seprate variable so that [0],[1], etc can be used to account for multiple input boxes
        textInput = $(":text");
        actor = $(textInput[0]).val();
        actor = actor.replace(" ", "_");
        //http://regex101.com/#javascript sophie buckley --> Sophie_Buckley, accounts for accented letters (http://stackoverflow.com/questions/7874626/how-to-capitalize-each-word-even-after-hyphens-with-jquery)
        actor = actor.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ _][a-zA-Z\p{M}])/g, function(letter) {
           return letter.toUpperCase();
         });
        navUrl(actor, "1");
     });
});

var navUrl = function move(actor, pageNum) { 
    var initUrl = "https://newsreader.scraperwiki.com/{0}/page/{1}?uris.0=dbpedia:{2}"
    var queryUrl = initUrl.replace("{1}", pageNum);
    var queryUrl = queryUrl.replace("{2}", actor);
    limit = $(textInput[1]).val();
    offset = $(textInput[2]).val();
    dateFilter = $(textInput[3]).val();
    // if (limit != "") {queryUrl += ("&limit=" + limit)};
    // if (offset != "") {queryUrl += ("&offset=" + offset)};
    // if (dateFilter != "") {queryUrl += ("&datefilter=" + dateFilter)};
    if (limit == "" && offset == "" && dateFilter == "") {
        //queryUrl = queryUrl;
    } else if (limit == "" && offset == "" && dateFilter != "") {
        queryUrl = queryUrl + ("&datefilter=" + dateFilter);
    } else if (limit == "" && offset != "" && dateFilter == "") {
        queryUrl = queryUrl + ("&offset=" + offset);
    } else if (limit != "" && offset == "" && dateFilter == "") {
        queryUrl = queryUrl + ("&limit=" + limit);
    } else if (limit != "" && offset != "" && dateFilter == "") {
        queryUrl = (queryUrl + ("&limit=" + limit)) + ("&offset=" + offset);
    } else if (limit != "" && offset == "" && dateFilter != "") {
        queryUrl = (queryUrl + ("&datefilter=" + dateFilter)) + ("&limit=" + limit);
    } else if (limit == "" && offset != "" && dateFilter != "") {
        queryUrl = (queryUrl + ("&datefilter=" + dateFilter)) + ("&offset=" + offset);
    } else {
        queryUrl = ((queryUrl + ("&datefilter=" + dateFilter)) + ("&limit=" + limit)) + ("&offset=" + offset);
    }
    listInput = $("select");    
    outputFormat = $(listInput[0]).val();
    queryUrl = queryUrl + ("&output=" + outputFormat);
    queryType = $(listInput[1]).val();
    queryUrl = queryUrl.replace("{0}", queryType);
    disableParameters;
    //console.log(queryUrl);
    // http://stackoverflow.com/questions/5141910/javascript-location-href-to-open-in-new-window-tab 
    window.open(queryUrl, "_blank");
    // http://stackoverflow.com/questions/8970600/how-to-navigate-to-a-different-page-with-javascript
    //window.location = queryUrl; 
}

var disableParameters = function() {
    //document.myForm.myField.disabled = true;
    //if (
}
