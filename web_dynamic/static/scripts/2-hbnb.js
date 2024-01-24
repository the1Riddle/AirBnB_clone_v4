$(function () {
  const amen = {};
  $("#input#check_amen").change(function () {
    if ($(this).is(":checked"))
      amen[$(this).attr("data-name")] = $(this).attr("data-id");
    else delete amen[$(this).attr("data-name")];
    const objNames = Object.keys(amen);
    $(".amenities h4").text(objNames.sort().join(", "));
  });
});

$(function () {
  const apiUrl = "http://0.0.0.0:5001/api/v1/status/";
  $.get(apiUrl, function (data, status) {
    if (data.status === "OK" && status === "success") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
});
