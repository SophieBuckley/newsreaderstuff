$(document).ready(function() {
  $("p").text("Hello!");
  $("input[type=submit]").click(function(event) {
     event.preventDefault();
     $("p").text($("input[type=text]").val());
   });
});
