window.onload = function() {
  let lat, lng;
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
      }).bindPopup('Name: ' + markers[i]["name"] + '<br/>' +
                  'Can provide: ' + markers[i]["categories"] + '<br/>' +
                  'Can accommodate: ' + markers[i]["number_of_people"] + '<br/>' +
                  'Contact: ' + markers[i]["contact"] + '<br/>' +
                  '<input id="clickMe" type="button" value="Click here if no longer available" onclick="L.thorsten.removePosting(' + markerId +');">' + "<br/>" +
                  '<form class="sms"><input class="touchMe" name="message" placeholder="Text your Lifepin!" type="text"><input type="hidden" name="phone number" value=' + markerContact + '><input type="submit" value="Submit"></form>')
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
    lat = response.latitude;
    lng = response.longitude;
    map.panTo([lat, lng], 12);
  });
  

  map.addControl(L.mapquest.control());
}
