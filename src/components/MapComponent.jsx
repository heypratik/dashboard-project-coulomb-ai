import React, {useState, useRef, useContext} from 'react'
import mapData from '../mapData';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import {Context} from '../lib/Context'


const MapComponent = () => {

  const { formState } = useContext(Context)

  const mapRef = useRef();
  const [zoom, setZoom] = useState(7)
  const [bounds, setBounds] = useState(null)

  const Marker = ({children}) => children;

    const points = mapData.filter(city => formState.includes(city.city)).map(point => ({
      "type": "Feature",
      "properties": {
        "cluster": false,
        "locationId": point.id,
      },
      "geometry": { "type": "Point", "coordinates": [point.location.longitude, point.location.latitude] }
    }))

  const {clusters, supercluster} = useSupercluster({
    points,
    bounds,
    zoom,
    options: {radius: 75, maxZoom: 20}
  })  

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDOr2rlAlhujFm7vZlEI8VV3ifj2URUlsI' }}
        defaultCenter={{ lat: 19.044980816728945, lng: 77.5828631815308 }}
        defaultZoom={5.2}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map}) => {
          mapRef.current = map
        }}
        onChange={({zoom, bounds}) => {
          setZoom(zoom)
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ])}}>
        
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates
          const {cluster: isCluster, point_count: pointCount} = cluster.properties

          if (isCluster) {
            return (
              <Marker key={cluster.id} lat={latitude} lng={longitude}>
                  <div className='cluster-marker' 
                  onClick={() => {
                    const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20)
                    mapRef.current.setZoom(expansionZoom)
                    mapRef.current.panTo({lat: latitude, lng: longitude})
                  }} 
                  style={{ width: `${10 + (pointCount / points.length) * 20}px`, height: `${10 + (pointCount / points.length) * 20}px` }}>
                    {pointCount}
                  </div>
              </Marker>
            )
          }

        return (
          <Marker key={cluster.properties.locationId} lat={latitude} lng={longitude}>
          <button className='_marker'>{pointCount}</button>
          </Marker>
        )

        })}
          
      </GoogleMapReact>
    </div>
  )
}

export default MapComponent