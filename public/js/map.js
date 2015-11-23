$(function() {
  // If browser supports geolocation, display map centered on current location; otherwise, prompt user to consent to location sharing.
  if (navigator.geolocation) {
    // Browser supports geolocation.
    console.log("Geolocation supported.")
    // Periodically retrieve user's current location.
    navigator.geolocation.watchPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      // Style of map.
      var styledMap = new google.maps.StyledMapType([
        {
          featureType: 'road.local',
          elementType: 'labels.text',
          stylers: [
            {visibility: 'off'}
          ]
        }, {
          featureType: 'road.arterial',
          elementType: 'labels.text',
          stylers: [
            {visibility: 'on'}
          ]
        }, {
          featureType: 'road',
          stylers: [
            {saturation: -100}
          ]
        }, {
          featureType: 'road.highway',
          stylers: [
            {visibility: 'off'}
          ]
        }, {
          featureType: 'water',
          stylers: [
            {saturation: -20}
          ]
        }
      ])

      // Map of New York City.
      var map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        draggable: true,
        keyboardShortcuts: true,
        scrollwheel: false,
        zoomControl: true,
        zoom: 13,
        mapTypeControlOptions: {
          mapTypeIds: ['styledMap']
        },
        mapTypeControl: false,
      })

      map.mapTypes.set('styledMap', styledMap)
      map.setMapTypeId('styledMap')
    })
  } else {
    // Browser doesn't support geolocation.
    $("#map").append("To continue, please consent to location sharing in your browser.")
    console.log("Geolocation not supported.")
  }
})
