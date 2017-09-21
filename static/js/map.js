let map;
let editMode = false;

$(document).ready(function(){
    $('.modal').modal();
});

const welcomeOverlay = document.getElementById('welcomeOverlay')
const openEditModeBtn = document.getElementById('openEditModeBtn')
const saveAndWritePropertiesBtn = document.getElementById('saveAndWritePropertiesBtn')
const editMarker = document.getElementById('editMarker')
const editInfoOverlay = document.getElementById('editInfoOverlay')

document.body.addEventListener('click', function click(){
    welcomeOverlay.style.display = 'none'
    document.body.removeEventListener('click', click, false)
}, false)

openEditModeBtn.addEventListener('click', function(){
    this.style.display = 'none'
    saveAndWritePropertiesBtn.style.display = 'block'
    editInfoOverlay.style.display = 'block'
    editMarker.style.display = 'block'
    
});

saveAndWritePropertiesBtn.addEventListener('click', function(){
    $('#modal1').modal('open');
    this.style.display = 'none'
    openEditModeBtn.style.display = 'block'
    editInfoOverlay.style.display = 'none'
    editMarker.style.display = 'none'
});


function initMap() {
    const mapStyle = [
        {
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "color": "#f9ddc5"
                },
                {
                    "lightness": -7
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    visibility: "on",
                    
                },
                {
                    
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "color": "#645c20"
                },
                {
                    "lightness": 38
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#1994bf"
                },
                {
                    "saturation": -69
                },
                {
                    "gamma": 0.99
                },
                {
                    "lightness": 43
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#f19f53"
                },
                {
                    "weight": 1.3
                },
                {
                    "visibility": "on"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "poi.business"
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "color": "#645c20"
                },
                {
                    "lightness": 39
                }
            ]
        },
        {
            "featureType": "poi.school",
            "stylers": [
                {
                    "color": "#a95521"
                },
                {
                    "lightness": 35
                }
            ]
        },
        {},
        {
            "featureType": "poi.medical",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#813033"
                },
                {
                    "lightness": 38
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {
            "elementType": "labels"
        },
        {
            "featureType": "poi.sports_complex",
            "stylers": [
                {
                    "color": "#9e5916"
                },
                {
                    "lightness": 32
                }
            ]
        },
        {},
        {
            "featureType": "poi.government",
            "stylers": [
                {
                    "color": "#9e5916"
                },
                {
                    "lightness": 46
                }
            ]
        },
        {
            "featureType": "transit.station",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "stylers": [
                {
                    "color": "#813033"
                },
                {
                    "lightness": 22
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "lightness": 38
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#f19f53"
                },
                {
                    "lightness": -10
                }
            ]
        },
        {},
        {},
        {}
    ];
    const mapOptions = {
        center: {
            lat: 51.523840, 
            lng: -0.046921
        },
        zoom: 12,
        styles: mapStyle,
        mapTypeControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        streetViewControl: false,
        fullscreenControl: false,
        scaleControl: true
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    if(!rows){ return; }
    for(marker of rows){
        generateMarker(marker.placename, marker.placedescription, marker.submittedby, marker.lat, marker.lng, marker.icon)
    }

    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center); 
    });
    
    
    

    submitButton.addEventListener('click', function(){
        const title = editModeForm.elements[0].value
        const description = editModeForm.elements[1].value
        const submittedBy = editModeForm.elements[2].value || 'Unknown'
        const lat = map.getCenter().lat()
        const lng = map.getCenter().lng()
        const icon = 'liquor.png'

        if(!title || !description){
            alert('You need to put a name and a description')
            return;
        }

        generateMarker(title, description, submittedBy, lat, lng, icon)
        $.ajax ({   
            type: "POST",
            url: '/places',
            data: { 
                city: 'London',
                title,
                description,
                submittedBy,
                lat,
                lng,
                icon
            },
            success: function() {
                console.log('success')
            }
        });
        $('#modal1').modal('close');
    })
}

function generateMarker(title, description, submittedBy, lat, lng, icon){
    const marker = new google.maps.Marker({
        position: {lat, lng},
        map,
        title,
        icon: `images/${icon}`
    });
    
    const infowindow = new google.maps.InfoWindow({
        content: `<p><strong>${title}</strong></p>` +
        `<p>${description}</p>` +
        `<p>Submitted by <a href="https://twitter.com/${submittedBy}">${submittedBy}</a></p>`
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    map.addListener('click', function(){
        infowindow.close()
    })
}