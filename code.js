$(document).ready(function() {
  $("p").text("Welcome! Please enter the name of the actor you'd like to search for.");
  var initUrl = "https://newsreader.scraperwiki.com/summary_of_events_with_actor?uris.0=dbpedia:Thierry_Henry"
  $("input[type=submit]").click(function(event) {
     event.preventDefault();
     actor = $("input[type=text]").val();
     actor = actor.replace(" ", "_");
     actor = actor.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ _][a-zA-Z\p{M}])/g, function(letter) {
                return letter.toUpperCase();
            });
     var queryUrl = initUrl.replace("Thierry_Henry", actor);
     $.ajax({
           url: queryUrl,
           cache: false
     })
       .done(function(html) {
               var table = $(html).find("table");
               $("#results").html(table);
      });
   });
});
