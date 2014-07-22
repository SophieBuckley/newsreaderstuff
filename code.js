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
        runQuery(actor, "1");
     });
});

var runQuery = function move(actor, pageNum) { 
    var initUrl = "https://newsreader.scraperwiki.com/{0}/page/{1}?uris.0=dbpedia:{2}"
    var queryUrl = initUrl.replace("{1}", pageNum);
    var queryUrl = queryUrl.replace("{2}", actor);
    limit = $(textInput[1]).val();
    offset = $(textInput[2]).val();
    stringFilter = $(textInput[3]).val();
    dateFilter = $(textInput[4]).val();
    if (limit != "") {queryUrl += ("&limit=" + limit)};
    if (offset != "") {queryUrl += ("&offset=" + offset)};
    if (stringFilter != "") {queryUrl += ("&filter=" + stringFilter)};
    if (dateFilter != "") {queryUrl += ("&datefilter=" + dateFilter)};
    listInput = $("select");    
    //Fix outputFormat... open in new tab? window.open(queryUrl, "_blank");
    //outputFormat = $(listInput[0]).val();
    //queryUrl = queryUrl + ("&output=" + outputFormat);
    queryType = $(listInput[1]).val();
    queryUrl = queryUrl.replace("{0}", queryType);
    console.log(queryUrl);
    //display the results of the query in a table underneath the submit button.
    $.ajax({
        url: queryUrl,
        cache: false
    })
    .done(function(html) {
        var table = $(html).find("table");
        var pagination = $(html).find(".pagination");
        $("#results").html("");
        $("#results").append(pagination[0]);
        $("#results").append(table);
        $("#results").append(pagination[1]);
        $(".pagination a").click(function(event) {
            event.preventDefault();
            nextPageNum = $(this).html();
            runQuery(actor, nextPageNum)
        })
    })
}
