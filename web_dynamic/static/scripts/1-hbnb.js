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
