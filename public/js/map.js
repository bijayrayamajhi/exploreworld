
  const map_token  = mapToken;
  mapboxgl.accessToken = map_token ;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center:	listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 10 // starting zoom
    });


    const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({offset: 25})
     .setHTML(`<h1>${listing.title}</h1><P>Exact location will be provided after booking</p>`)
    .setMaxWidth("300px")

    )
    .addTo(map);
