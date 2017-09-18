window.onload = function() {

  L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

  var sendGetRequest = $.get('/postings');
  var removePosting = function(id){
    $.get('/delete?id=' + id);
    window.location.reload();
  }
  var markerGroup = L.layerGroup();

  L.thorsten = {};
  L.thorsten.removePosting = removePosting;

  sendGetRequest.done(function(markers) {
    for (var i = 0; i < markers.length; i++) {
      var markerId = markers[i]["id"]
      L.marker([markers[i]["latitude"], markers[i]["longitude"]], {
        icon: L.mapquest.icons.marker({
          primaryColor: '#228B22',
          secondaryColor: '#228B22',
          shadow: true,
          size: 'md'
        }),
        draggable: false
      }).bindPopup('Name: ' + markers[i]["name"] + '<br/>' +
                  'Can provide: ' + markers[i]["categories"] + '<br/>' +
                  'Can accommodate: ' + markers[i]["number_of_people"] + '<br/>' +
                  'Contact: ' + markers[i]["contact"] + '<br/>' +
                  '<input id="clickMe" type="button" value="Click here if no longer available" onclick="L.thorsten.removePosting(' + markerId +');">')
      .addTo(map)
      .addTo(markerGroup);
    }
  });

  sendGetRequest.fail(function(response) {
    alert("error")
  });

  var map = L.mapquest.map('map', {
    center: [28.71227, -81.325607],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
  });

  map.addControl(L.mapquest.control());
}
