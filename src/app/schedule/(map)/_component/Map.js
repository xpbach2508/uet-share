"use client";
import React, { useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript/bin/mapsjs.bundle.harp.js";
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

  // Init map props
  const [directions, setDirections] = useState([]);
  const [multiLineResult, setMultiLine] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);
  const [selectedNoStartMarker, setSelectedNoStartMarker] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  var {
    markers,
    noStartMarkers,
    endScheduleGroup,
    schedule,
    groupId,
    taxiGroup,
    apiKey,
    isRunning,
    currentTime,
  } = props;
  const iconTaxi = new H.map.Icon(
    "http://maps.google.com/mapfiles/kml/pal4/icon7.png"
  );

  useEffect(() => {
    if (!map.current) {
      platform.current = new H.service.Platform({
        apikey: apiKey,
      });
      // Initialize the Here Maps platform and map
      const engineType = H.Map.EngineType["HARP"];
      const defaultLayers = platform.current.createDefaultLayers({
        engineType,
        lg: "vie",
      });
      const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        engineType,
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

      return () => {
        if (map.current) {
          map.current.dispose();
          map.current = null;
        }
      };
    }
  }, []);

  // select group id
  useEffect(() => {
    console;
    if (groupId !== 0) {
      setSelectedMarker([markers[taxiGroup.get(groupId)]]);
      const indexSchedule = endScheduleGroup.get(groupId);
      setSelectedNoStartMarker(
        noStartMarkers.slice(indexSchedule[0], indexSchedule[1])
      );
      setSelectedSchedule(schedule.slice(indexSchedule[0], indexSchedule[1]));
    }
    console.log(groupId);
  }, [groupId]);

  const animateMarker = (currentTime) => {
    console.log(selectedSchedule);
    const destinationPoint = selectedSchedule[selectedSchedule.length - 1];
    if (currentTime < destinationPoint.expectedTime[1]) {
      selectedSchedule.forEach((schedule) => {
        if (currentTime >= schedule.expectedTime[1]) {
          const marker = new H.map.Marker(
            {
              lat: schedule.destination[0],
              lng: schedule.destination[1],
            },
            { icon: iconTaxi }
          );
          map.current.addObject(marker);
        }
      });
    } else {
      const marker = new H.map.Marker(
        {
          lat: selectedSchedule[selectedSchedule.length - 1].destination[0],
          lng: selectedSchedule[selectedSchedule.length - 1].destination[1],
        },
        { icon: iconTaxi }
      );
      map.current.addObject(marker);
    }
  };

  useEffect(() => {
    if (isRunning) {
      const marker = new H.map.Marker(
        {
          lat: selectedSchedule[1].origin[0],
          lng: selectedSchedule[1].origin[1],
        },
        { icon: iconTaxi }
      );
      map.current.addObject(marker);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) animateMarker(currentTime);
  }, [currentTime]);

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
      setMultiLine(multiLineString);

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
      map.current.addObject(routeLine);
    }
  };

  useEffect(() => {
    if (selectedSchedule) {
      const originPoint = selectedSchedule[0];
      const destinationPoint = selectedSchedule[selectedSchedule.length - 1];
      var waypoints = [];
      for (let i = 1; i < selectedSchedule.length; i++) {
        //create request
        var request = selectedSchedule[i];
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
      var routingService = platform.current.getRoutingService(null, 8);
      //pass the request to the route method
      routingService.calculateRoute(routeRequest, onResult, function (error) {
        alert(error.message);
      });
    }
  }, [selectedSchedule]);

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
    if (map.current && ui && groupId !== 0) {
      map.current.removeObjects(map.current.getObjects());

      // Add markers to the map
      selectedMarker.forEach((markerData) => {
        const marker = new H.map.Marker(
          { lat: markerData.lat, lng: markerData.lng },
          {
            icon: iconTaxi,
          }
        );
        map.current.addObject(marker);
        addInfoBubbleToMarker(markerData, marker);
      });

      selectedNoStartMarker.forEach((markerData) => {
        const marker = new H.map.Marker({
          lat: markerData.lat,
          lng: markerData.lng,
        });
        map.current.addObject(marker);
        addInfoBubbleToMarker(markerData, marker);
      });
      // map.getViewPort().resize();
    }
  }, [map.current, ui, groupId, selectedNoStartMarker, selectedMarker]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default HereMapComponent;
