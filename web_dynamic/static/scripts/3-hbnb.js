const HOST = "0.0.0.0";

$("document").ready(function () {
  const amen = {};
  $("#input#check_amen").change(function () {
    if ($(this).is(":checked"))
      amen[$(this).attr("data-name")] = $(this).attr("data-id");
    else delete amen[$(this).attr("data-name")];
    const objNames = Object.keys(amen);
    $(".amenities h4").text(objNames.sort().join(", "));
  });

  apiStatus();
  fetchPlaces();
});

$(function apiStatus() {
  const apiUrl = "http://0.0.0.0:5001/api/v1/status/";
  $.get(apiUrl, function (data, status) {
    if (data.status === "OK" && status === "success") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
});

function fetchPlaces() {
  const PLACES_URL = `http://${HOST}:5001/api/v1/places_search/`;
  $.ajax({
    url: PLACES_URL,
    type: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({}),
    success: function (response) {
      for (const r of response) {
        const article = [
          "<article>",
          '<div class="title_box">',
          `<h2>${r.name}</h2>`,
          `<div class="price_by_night">$${r.price_by_night}</div>`,
          "</div>",
          '<div class="information">',
          `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
          "</div>",
          '<div class="description">',
          `${r.description}`,
          "</div>",
          "</article>",
        ];
        $("SECTION.places").append(article.join(""));
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}
