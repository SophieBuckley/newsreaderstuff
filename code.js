$(document).ready(function() {
    $("p").text("Welcome! Please enter the name of the actor you'd like to search for.");
    $("input[type=submit]").click(function(event) {
        event.preventDefault();
        actor = $("input[type=text]").val();
        actor = actor.replace(" ", "_");
        actor = actor.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ _][a-zA-Z\p{M}])/g, function(letter) {
           return letter.toUpperCase();
        });
        runQuery(actor, "1");
    });
});

var runQuery = function(actor, pageNum) {
    var initUrl = "https://newsreader.scraperwiki.com/summary_of_events_with_actor/page/{0}?uris.0=dbpedia:{1}"
    var queryUrl = initUrl.replace("{0}", pageNum);
    var queryUrl = queryUrl.replace("{1}", actor);
    console.log(queryUrl);
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
            nextPageNum = $(this).html()
            runQuery(actor, nextPageNum);
        });
    });
}
