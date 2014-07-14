$(document).ready(function() {
  $("p").text("Welcome!");
  $("input[type=submit]").click(function(event) {
     event.preventDefault();
    // $("p").text($("input[type=text]").val());
     $("a").each(function() {
           $(this).attr("href", function(index, old) {
                return old.replace("Thierry_Henry", $("input[type=text]").val());
         });
      });
   });
});
