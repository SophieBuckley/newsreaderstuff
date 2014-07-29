$(document).ready(function() { 
    $("form").submit(function(event) {
        event.preventDefault();
        //":text" == "input[type=text]", seprate variable so that [0],[1], etc can be used to account for multiple input boxes
        textInput = $(":text");
        actor = $(textInput[0]).val();
        //actor2 = $(textInput[1]).val();
        actor = actor.replace(" ", "_");
        //http://regex101.com/#javascript sophie buckley --> Sophie_Buckley, accounts for accented letters (http://stackoverflow.com/questions/7874626/how-to-capitalize-each-word-even-after-hyphens-with-jquery)
        actor = actor.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ _][a-zA-Z\p{M}])/g, function(letter) {
           return letter.toUpperCase();
         });
        runQuery(actor, "1");
     });
});

var runQuery = function move(actor, pageNum) { 
    initUrl = "https://newsreader.scraperwiki.com/{0}/page/{1}?uris.0={2}"
    queryUrl = initUrl.replace("{1}", pageNum);
    limit = $(textInput[2]).val();
    offset = $(textInput[3]).val();
    stringFilter = $(textInput[4]).val();
    dateFilter = $(textInput[5]).val();
    framenet = $(textInput[6]).val();
    if (limit != "") {queryUrl += ("&limit=" + limit)};
    if (offset != "") {queryUrl += ("&offset=" + offset)};
    if (stringFilter != "") {queryUrl += ("&filter=" + stringFilter)};
    if (dateFilter != "") {queryUrl += ("&datefilter=" + dateFilter)};
    listInput = $("select");    
    outputFormat = $(listInput[1]).val();
    queryUrl = queryUrl + ("&output=" + outputFormat);
    queryType = $(listInput[0]).val();
    queryUrl = queryUrl.replace("{0}", queryType);
    if (queryType == "describe_uri" || queryType == "event_details_filtered_by_actor" || queryType == "people_sharing_event_with_a_person" || queryType == "summary_of_events_with_actor") {
        queryUrl = queryUrl.replace("{2}", "dbpedia:" + actor);
    } else if (queryType == "properties_of_a_type" || queryType == "summary_of_events_with_actor_type") {
        queryUrl = queryUrl.replace("{2}", "dbo:" + actor);
    } else if (queryType == "get_document" || queryType == "get_document_metadata" || queryType == "get_mention_metadata") {
        queryUrl = queryUrl.replace("{2}", link);
    } else if (queryType == "summary_of_events_with_framenet") {
        queryUrl = queryUrl.replace("{2}", "framenet:" + framenet);
    } else {
    }
    console.log(queryUrl);
    if (outputFormat == "html") {
    //display the results of the query in a table underneath the submit button
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
                runQuery(actor, nextPageNum);
            })
        })
    } else {
        window.open(queryUrl, "_blank");
    }
}
