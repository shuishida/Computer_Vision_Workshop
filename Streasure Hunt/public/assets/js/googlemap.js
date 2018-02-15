var map;
var panorama;

function initialize() {
    var fenway = { lat: 42.345573, lng: -71.098326 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: fenway,
        zoom: 14
    });
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: fenway,
            pov: {
                heading: 34,
                pitch: 10
            }
        });
    map.setStreetView(panorama);
}

function getViewUrl(){
    var position = panorama.getPosition()+'';
    position = position.replace(/[()]/g, "").replace(" ","");
    var heading = panorama.getPov().heading;
    var pitch = panorama.getPov().pitch;
    var zoom = panorama.getZoom();
    var fov = 180 / Math.pow(2,zoom);
    var params = {
        "size": "640x640",
        "location": position,
        "heading": heading,
        "pitch": pitch,
        "fov": fov
    };
    var url = {
        "urlBase": "https://maps.googleapis.com/maps/api/streetview",
        "params": params
    }
    var imageUrl = "https://maps.googleapis.com/maps/api/streetview?size=640x640&location="+position+"&heading="+heading+"&pitch="+pitch+"&fov="+fov+"&key="+MAP_API_KEY;
    return imageUrl;
}


