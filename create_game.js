$('document').ready(function(){
    create_game = new Create_Game();
    $('#submit-button').on('click', (event) => {
        create_game.collect_game_data(event)
    })
})

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('googleMap'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        create_game.location = places
        if (places.length == 0) {
        return;
      }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        create_game.complete_game.lat_lon.lat = searchBox.bounds.b.b;
        create_game.complete_game.lat_lon.lon = searchBox.bounds.f.b;
        places.forEach(function(place) {
            if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
            }
            var icon = {
            url: '/img/basketball_icon.png',
            size: new google.maps.Size(21, 21),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(50, 50),
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
            }));

            if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
            } else {
            bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
        

        });
    }

//Need to check if they already have an active game on there profile
function Create_Game() {
    this.location = {};
    this.complete_game = {
        game_title: '',
        game_time: null,
        game_address: '',
        lat_lon: {
            lat: '',
            lon: ''
        },
        game_date: '',
        game_vibe: '',
        game_description: '',
        game_creator: true
    };
    this.collect_game_data = function(event) {
        event.preventDefault()
        
        this.complete_game.game_title = $('.game_title_input')[0].value;
        this.complete_game.game_time = $(".game_time_input")[0].value;
        this.complete_game.game_date = $('#game_date')[0].value;
        this.complete_game.game_vibe = $('select')[0][0].selected === true ? 'casual':'competitive';
        this.complete_game.game_address = this.location[0].formatted_address;
        this.complete_game.game_description = $('.game_description_input')[0].value
        console.log(JSON.stringify(this.complete_game));
        $.ajax({
            url: '/proto',
            method: 'post',
            data: this.complete_game
        })
    }
}

var create_game = null;

