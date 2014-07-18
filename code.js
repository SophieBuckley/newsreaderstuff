$(document).ready(function() { 
    $("form").submit(function(event) {
        event.preventDefault();
        //":text" == "input[type=text]", seprate variable so that [0],[1], etc can be used to account for multiple input boxes
        input = $(":text");
        actor = $(input[0]).val();
        actor = actor.replace(" ", "_");
        //http://regex101.com/#javascript sophie buckley --> Sophie_Buckley, accounts for accented letters (http://stackoverflow.com/questions/7874626/how-to-capitalize-each-word-even-after-hyphens-with-jquery)
        actor = actor.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ _][a-zA-Z\p{M}])/g, function(letter) {
           return letter.toUpperCase();
         });
        navUrl(actor, "1");
     });
});

var navUrl = function move(actor, pageNum) { 
    var initUrl = "https://newsreader.scraperwiki.com/summary_of_events_with_actor/page/{0}?uris.0=dbpedia:{1}"
    var queryUrl = initUrl.replace("{0}", pageNum);
    var queryUrl = queryUrl.replace("{1}", actor);
    limit = $(input[1]).val();
    offset = $(input[2]).val();
    var queryUrl = (queryUrl + ("&limit=" + limit)) + ("&offset=" + offset);
    // http://stackoverflow.com/questions/8970600/how-to-navigate-to-a-different-page-with-javascript
    // http://stackoverflow.com/questions/5141910/javascript-location-href-to-open-in-new-window-tab 
    window.location = queryUrl; 
}
