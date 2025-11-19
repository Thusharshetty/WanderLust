

maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
    container: 'map', // container id
    style: maptilersdk.MapStyle.STREETS,
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

const popup = new maptilersdk.Popup({ closeOnClick: false })
    .setHTML(popupHtml);

const marker = new maptilersdk.Marker({ color: "#fe424d" })
  .setLngLat(coordinates)
  .setPopup(popup)
  .addTo(map);