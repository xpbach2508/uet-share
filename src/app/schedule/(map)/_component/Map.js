"use client";
import React, { useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript";
const HereMapComponent = (props) => {
  const colors = [
    "#FF0000",
    "#00cc00",
    "#ff66ff",
    "#0000ff",
    "#00000",
    "#ffff00",
    "#00ffff",
    "#993399",
  ];
  const mapRef = useRef(null);
  const map = useRef(null);
  const platform = useRef(null);

  const [ui, setUi] = useState(null);
  const [directions, setDirections] = useState([]);
  var {
    markers,
    noStartMarkers,
    endScheduleGroup,
    schedule,
    groupId,
    taxiGroup,
    apiKey,
  } = props;

  useEffect(() => {
    if (!map.current) {
      platform.current = new H.service.Platform({
        apikey: apiKey,
      });
      // Initialize the Here Maps platform and map
      const defaultLayers = platform.current.createDefaultLayers({
        lg: "vie",
      });
      const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: 21.028511, lng: 105.804817 },
        zoom: 14,
        padding: { top: 50, right: 50, bottom: 50, left: 50 },
      });

      const behavior = new H.mapevents.Behavior(
        new H.mapevents.MapEvents(hMap)
      );
      const ui = H.ui.UI.createDefault(hMap, defaultLayers);

      setUi(ui);
      // createDirection(props.schedule);
      map.current = hMap;
      //   return () => {
      //     hMap.dispose();
      //   };
    }
  }, [apiKey]);
  useEffect(() => {
    if (groupId !== 0) {
      markers = [markers[taxiGroup.get(groupId)]];
      const indexSchedule = endScheduleGroup.get(groupId);
      noStartMarkers = noStartMarkers.slice(indexSchedule[1], indexSchedule[3]);
      schedule = schedule.slice(indexSchedule[0], indexSchedule[2]);
      createDirection(schedule);
    }
    console.log(groupId);
  }, [groupId]);
  const onResult = function (result) {
    // Ensure that at least one route was found
    if (result.routes.length) {
      const lineStrings = [];
      result.routes[0].sections.forEach((section) => {
        // Create a linestring to use as a point source for the route line
        lineStrings.push(
          H.geo.LineString.fromFlexiblePolyline(section.polyline)
        );
      });

      // Create an instance of H.geo.MultiLineString
      const multiLineString = new H.geo.MultiLineString(lineStrings);

      const routeBackground = new H.map.Polyline(multiLineString, {
        style: {
          lineWidth: 6,
          strokeColor: "rgba(0, 128, 255, 0.7)",
          lineTailCap: "arrow-tail",
          lineHeadCap: "arrow-head",
        },
      });
      // Create a patterned polyline:
      const routeArrows = new H.map.Polyline(multiLineString, {
        style: {
          lineWidth: 6,
          fillColor: "white",
          strokeColor: "rgba(255, 255, 255, 1)",
          lineDash: [0, 2],
          lineTailCap: "arrow-tail",
          lineHeadCap: "arrow-head",
        },
      });
      // Create a group that represents the route line and contains
      // Outline and the pattern
      var routeLine = new H.map.Group();
      routeLine.addObjects([routeBackground, routeArrows]);
      map.addObject(routeLine);
    }
  };

  const createDirection = (listPointSchedule) => {
    const originPoint = listPointSchedule[0];
    const destinationPoint = listPointSchedule[listPointSchedule.length - 1];
    var waypoints = [];
    for (let i = 1; i < listPointSchedule.length; i++) {
      //create request
      var request = listPointSchedule[i];
      waypoints.push({ lat: request.origin[0], lng: request.origin[1] });
    }

    const routeRequest = {
      origin: `${originPoint.origin[0]},${originPoint.origin[1]}`,
      // The end point of the route:
      destination: `${destinationPoint.destination[0]},${destinationPoint.destination[1]}`,
      transportMode: "car",
      return: "polyline",
      departureTime: "any",
      via: new H.service.Url.MultiValueQueryParameter(
        waypoints.map((wp) => `${wp.lat},${wp.lng}`)
      ),
    };
    var routingService = platform.getRoutingService(null, 8);
    //pass the request to the route method
    routingService.calculateRoute(routeRequest, onResult, function (error) {
      alert(error.message);
    });
  };
  // Assuming `map` is your HERE map instance, and `ui` is the map UI
  function addInfoBubbleToMarker(position, marker) {
    // HTML structure for the info bubble
    const bubbleContent = `
        <div style="background-color: green; color: white; border-radius: 1em; width: 100px; font-size: 12px; text-align: center;">
            Expected: ${position.expectedTimeString}
        </div>
        `;

    // Create the info bubble but don't add it to the map initially
    let infoBubble = new H.ui.InfoBubble(marker.getGeometry(), {
      closeButton: false,
    });
    infoBubble.setContent(bubbleContent);
    // infoBubble.addClass('H_ib_noclose');
    let isVisible = false;

    ui.addBubble(infoBubble);
    infoBubble.close();

    // Add click event to marker to toggle the info bubble
    marker.addEventListener("tap", () => {
      if (isVisible) {
        infoBubble.close(); // Hide the bubble
      } else {
        infoBubble.open();
      }
      isVisible = !isVisible; // Toggle visibility state
    });
  }

  // Render markers and directions whenever they update
  useEffect(() => {
    if (map && ui && groupId !== 0) {
      map.removeObjects(map.getObjects());

      // Add markers to the map
      markers.forEach((markerData) => {
        const marker = new H.map.Marker(
          { lat: markerData.lat, lng: markerData.lng },
          {
            icon: new H.map.Icon(
              "http://maps.google.com/mapfiles/kml/pal4/icon7.png"
            ),
          }
        );
        map.addObject(marker);
        addInfoBubbleToMarker(markerData, marker);
      });

      noStartMarkers.forEach((markerData) => {
        const marker = new H.map.Marker({
          lat: markerData.lat,
          lng: markerData.lng,
        });
        map.addObject(marker);
        addInfoBubbleToMarker(markerData, marker);
      });
      // map.getViewPort().resize();
    }
  }, [map, ui, groupId]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default HereMapComponent;
