$(function() {
  // If browser supports geolocation, display map centered on current location; otherwise, prompt user to consent to location sharing.
  if (navigator.geolocation) {
    // Browser supports geolocation.
    console.log("Geolocation supported.")

    // Retrieve current user document and save to variable.
    var currentUser;
    $.get("/api/users/current", success: function(user) {
      currentUser = user
    })

    // Periodically retrieve user's current location.
    navigator.geolocation.watchPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      // Update current user document location with current location.
      $.ajax({
        url: "/api/users/" + currentUser._id,
        method: "PUT",
        data: {currentLocation: pos},
        success: function(updatedUser) {
          currentUser = updatedUser
        }
      })

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
      map = new google.maps.Map(document.getElementById('map'), {
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

      // To calculate user's age.
      function getAge(dob) {
        var today = new Date()
        var age = today.getFullYear() - dob.getFullYear()
        var monthDiff = today.getMonth() - dob.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--
        }
        return age
      }

      // To add marker representing user on map.
      function addMarker(map, user) {
        var marker = new google.maps.Marker({
          map: map,
          position: user.currentLocation,
          title: (user.local.first_name + " " + user.local.last_name) || user.facebook.name
          infoWindowContent: "<div class='infoWindow'>" + "<p class='infoName'>" + ((user.local.first_name + " " + user.local.last_name) || user.facebook.name) + "</p><br>" + "<p class='infoAge'" + getAge(user.local.dob || user.facebook.dob) + "</p><br>" + "<p class='infoStatus'>" + user.currentStatus + "</p>" + "</div>"
        })
      }

      // To put marker at current user's current location.
      var currentUserMarker = addMarker(map, currentUser)

      // Array to hold all user markers.
      var userMarkers = []

      // To retrieve all user documents.
      $.get("/api/users", success: function(users) {
        for (user in users) {
          // If user is currently located within the map area, represent that user with a marker on the map.
          if map.getBounds().contains(user.currentLocation) {
            var userMarker = addMarker(map, user)
            userMarkers.push(userMarker)
          }
        }
      })

      // To display info window containing user information.
      function displayInfo(map, marker) {
        var infoWindow = new google.maps.InfoWindow({
          content: marker.infoWindowContent
        })
        infoWindow.open(map, marker)
      }

      // To display user information when marker is clicked.
      for (var userMarker in userMarkers) {
        userMarker.addListener("click", function() {
          displayInfo(map, userMarker)
        })
      }
    })
  } else {
    // Browser doesn't support geolocation.
    $("#map").append("To continue, please consent to location sharing in your browser.")
    console.log("Geolocation not supported.")
  }
})
