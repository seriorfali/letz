var currentUser
// If browser supports geolocation, display map centered on current location; otherwise, prompt user to consent to location sharing.
function generateMap() {
  // Retrieve current user document and save to variable.
  $.get("/api/users/current")
  .done(function(user) {
    currentUser = user
    if (navigator.geolocation) {
      // Browser supports geolocation.
      console.log("Geolocation supported.")

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

        // To calculate user's age.
        function getAge(user) {
          var today = new Date()
          var dob = new Date(user.local.dob || user.facebook.dob)
          var age = today.getFullYear() - dob.getFullYear()
          var monthDiff = today.getMonth() - dob.getMonth()
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--
          }
          return age
        }

        // To calculate similarity of user's age to current user's age.
        function getSimAge(user) {
          var simAge
          if ((getAge(user) >= getAge(currentUser) - 10) && (getAge(user) <= getAge(currentUser) + 10)) {
            simAge = 1
          } else {
            simAge = 0
          }
          return simAge
        }

        // To calculate similarity of user's declared status to current user's declared status.
        function getSimStatus(user) {
          var simStatus
          if (user.currentStatus === currentUser.currentStatus) {
            simStatus = 1
          } else {
            simStatus = 0
          }
          return simStatus
        }

        // To calculate similarity of user to current user in terms of age and declared status.
        function getSim(user) {
          var sim = getSimAge(user) + getSimStatus(user)
          return sim
        }

        // To assign url for marker icon according to corresponding user's similarity to current user in terms of age and declared status.
        function getMarkerIcon(user) {
          var sim = getSim(user)
          var icon
          if (sim === 0) {
            icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          } else if (sim === 1) {
            icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
          } else if (sim === 2) {
            icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          }
          return icon
        }

        // To color marker based on similarity in terms of age and declared status.
        function colorizeMarker(marker) {
          var icon = getMarkerIcon(marker.user)
          marker.setIcon(icon)
        }

        // To add marker representing user on map.
        function addMarker(map, user) {
          var marker = new google.maps.Marker({
            map: map,
            position: user.currentLocation,
            title: (user.local.first_name + " " + user.local.last_name) || user.facebook.name,
            infoWindowContent: "<div class='infoWindow'>" + "<p class='infoName'>" + ((user.local.first_name + " " + user.local.last_name) || user.facebook.name) + "</p><br>" + "<p class='infoAge'" + getAge(user) + "</p><br>" + "<p class='infoStatus'>" + user.currentStatus + "</p><br>" + "<button class='startChat' type='button'>CHAT</button>" + "</div>",
            user: user
          })
          if (currentUser.currentStatus) {
            colorizeMarker(marker)
          } else {
            marker.setIcon("http://maps.google.com/mapfiles/ms/icons/purple-dot.png")
          }
        }

        // To put marker at current user's current location.
        var currentUserMarker = addMarker(map, currentUser)

        // To retrieve all user documents.
        $.get("/api/users", function(users) {
          for (user in users) {
            if (user.currentLocation) {
              // If user is currently located within the map area, represent that user with a marker on the map.
              if (map.getBounds().contains(user.currentLocation)) {
                var userMarker = addMarker(map, user)
                userMarkers.push(userMarker)
              }
            }
          }
        }, "json")

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

        // Variable that represents number of chat windows open.
        var chats = 0

        var chatWindow = "<div class='chats' id='chat" + chats + "'>" + "<ul class='messages'></ul>" + "<form class='sendMessage' action=''>" + "<input class='newMessages' autocomplete='off' /><button>Send</button>" + "</form>" + "</div>"

        // AJAX request to open chat window when chat button is clicked.
        $(".startChat").click(function() {
          chats ++
          $("#container").append(chatWindow)
          $("#chat" + chats).load("../views/chat.html")
          generateChat()
        })
      })

      // Array to hold all user markers.
      var userMarkers = []

      // HTML for overlay that prompts user to declare status.
      var statusOverlay = "<div id='statusOverlay'>" + "<p id='statusPrompt'>What are you in the mood for?</p>" + "<form id='statusForm'>" + "<select id='statusDropdown' form='statusForm' required='required'>" + "<option class='statusOptions' value='food'>Food</option>" + "<option class='statusOptions' value='coffee'>Coffee/Tea</option>" + "<option class='statusOptions' value='movie'>Movie</option>" + "<option class='statusOptions' value='stroll'>Stroll</option>" + "<option class='statusOptions' value='exercise'>Exercise</option>" + "<option class='statusOptions' value='recreation'>Recreation</option>" + "<option class='statusOptions' value='shopping'>Shopping</option>" + "<option class='statusOptions' value='sightseeing'>Sightseeing</option>" + "<option class='statusOptions' value='party'>Party</option>" + "<option class='statusOptions' value='concert'>Concert</option>" + "</select>" + "</form>" + "</div>"

      // To display status overlay in browser.
      $("#map").append(statusOverlay)

      var statusDropdown = $("#statusDropdown")

      // If status selected, update current user's current status with selection, remove status overlay from browser, and colorize user markers according to similarities in terms of age and declared status.
      statusDropdown.change(function() {
        var status = $(this).options[$(this).selectedIndex].value
        $.ajax({
          url: "/api/users/" + currentUser._id,
          method: "PUT",
          data: {currentStatus: status},
          success: function(updatedUser) {
            currentUser = updatedUser
          }
        })
        $("#statusOverlay").remove()
        for (var userMarker in userMarkers) {
          colorizeMarker(userMarker)
        }
      })
    } else {
      // Browser doesn't support geolocation.
      $("#map").append("<div id='geolocationPrompt'>To continue, please consent to location sharing in your browser.</div>")
      console.log("Geolocation not supported.")
    }
  })
}
