let map;

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

    for(marker of rows){
        generateMarker(marker.placename, marker.placedescription, marker.submittedby, marker.lat, marker.lng, marker.icon)
    }

    // document.getElementById('add-place').addEventListener('click', function(){
    //     editMode()
    // });
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

// function editMode(){

//     const centerMarker = document.getElementById('centerMarker')
//     const saveButton = document.getElementById('saveButton')
//     const editMode = document.getElementById('editMode')
//     const form = document.getElementById('addplace-form')
//     const submitButton = document.getElementById('submitAddPlace')

//     submitButton.addEventListener('click', function(){
//         const title = form.elements[0].value
//         const description = form.elements[1].value
//         const submittedBy = form.elements[2].value
//         const lat = map.getCenter().lat()
//         const lng = map.getCenter().lng()
//         const icon = 'liquor.png'

//         generateMarker(title, description, submittedBy, lat, lng, icon)

//         $.ajax ({   
//             type: "POST",
//             url: '/places',
//             data: { 
//                 title,
//                 description,
//                 submittedBy,
//                 lat,
//                 lng,
//                 icon
//             },
//             success: function() {
//                 console.log('success')
//             }
//         });
//     })

//     centerMarker.style.display = 'block';
//     editMode.style.display = 'block';

//     saveButton.addEventListener('click', function(e){
//         $('#exampleModal').modal('toggle')

//     })

//     google.maps.event.addListener(map, 'center_changed', function() { 
//         console.log(map.getCenter().lat(),map.getCenter().lng())
//     });  
// }

