import React, { useEffect, useState } from "react";
import ReactMapGL, { Popup, Marker } from "react-map-gl";
import { listLogEntries } from "./API";
import LogEntryForm from "./LogEntryForm";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  //add an entry to the map
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3.5,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
    console.log(logEntries);
  };

  //update log entries
  useEffect(() => {
    getEntries();
  }, []);

  // when clicked on the map, we add a popup
  const showAddMarkerPopup = (event) => {
    //pull the lat and lon
    const [longitude, latitude] = event.lngLat;
    console.log(longitude, latitude);
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    //set the map's initial state
    <ReactMapGL
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/sxing0506/cl8fg8958000814lje9my0yem"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
            onClick={() =>
              setShowPopup({
                // ...showPopup,
                [entry._id]: true,
              })
            }
          >
            <div>
              <svg
                className="marker red"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] && (
            <Popup
              longitude={entry.longitude}
              latitude={entry.latitude}
              closeButton={true}
              closeOnClick={false}
              anchor="top"
              onClose={() => setShowPopup({})}
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited on {new Date(entry.visitDate).toLocaleDateString()}
                </small>
                {entry.image && <img src={entry.image} alt={entry.title}/>}
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}

      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
              <svg
                className="marker yellow"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            longitude={addEntryLocation.longitude}
            latitude={addEntryLocation.latitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            anchor="top"
            onClose={() => setAddEntryLocation(null)}
          >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};
export default App;
