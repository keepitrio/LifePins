window.onload = function() {
  L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

  var sendGetRequest = $.get('/postings');
  var removePosting = function(id){
    $.get('/delete?id=' + id, {
      success: function() {
        window.location.reload();
      }
    });
  }

  var markerGroup = L.layerGroup();

  L.thorsten = {};
  L.thorsten.removePosting = removePosting;

  sendGetRequest.done(function(markers) {
    for (var i = 0; i < markers.length; i++) {
      var markerId = markers[i]["id"];
      var markerContact = markers[i]["contact"];
      L.marker([markers[i]["latitude"], markers[i]["longitude"]], {
        icon: L.mapquest.icons.marker({
          primaryColor: '#228B22',
          secondaryColor: '#228B22',
          shadow: true,
          size: 'md'
        }),
        draggable: false
      }).bindPopup(markers[i]["name"] + '’s LifePin' + '<br/>' +
                  'Can provide: ' + markers[i]["categories"] + '<br/>' +
                  'Can accommodate: ' + markers[i]["number_of_people"] + '<br/>' +
                  'Contact: ' + markers[i]["contact"] + '<br/>' +
                  '<form class="sms">Text ' + markers[i]["name"] + ':<br/><input class="touchMe" name="message" value="One person coming to your location." type="text"><input type="hidden" name="phone number" value=' + markerContact + '><input type="submit" value="Send message"></form>' + "<br/>" +
                  '<input id="clickMe" type="button" value="Click here if LifePin no longer available" onclick="L.thorsten.removePosting(' + markerId +');">')
      .addTo(map)
      .addTo(markerGroup);
    }
  });

  $('#map').on('submit', '.sms', e => {
    e.preventDefault();
    var form = $(e.target);
    var data = $(e.target).serializeArray();
    var message = data[0].value;
    var phoneNumber = data[1].value;
    var preProcessed = "+" + phoneNumber.replace(/[\-\.]/g, "");
    var sendPostRequest = $.post('/text?phone_number=' + preProcessed + "&message=" + message);
    sendPostRequest.done((response) => {
      form.replaceWith(response.message);
      debugger;
    });
    sendPostRequest.fail((error) => form.replaceWith(error.message));
  });

  sendGetRequest.fail(function(response) {
    alert("error")
  });

  var map = L.mapquest.map('map', {
    center: [28.502979, -81.100731],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
  })

  fetch('https://ipapi.co/json').then(response => response.json()).then(response => {
    const {latitude, longitude} = response;
    map.panTo([latitude, longitude], 12);
  });


  map.addControl(L.mapquest.control());
}
