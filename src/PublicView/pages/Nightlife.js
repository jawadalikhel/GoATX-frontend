import React, { useState, useEffect } from "react";
import geoLocationHook from "../../shared/hooks/geoLocationHook";
import { fetchNearbyPlaces } from "../../shared/apis/apiService";
import PlacesToEatList from "../components/PlacesList";
import Button from "../../shared/components/FormElements/Button";
import FilterModal from "../../shared/components/UIElements/FilterModal";

import "./Styles/AllPlacesStyle.css";
const CATEGORY_NAMES = ["NIGHTLIFE","BARS", "BREWWEIES", "DISTILLERIES", "ENTERTAINMENT DISTRICTS", "LIVE MUSIC"];

const Nightlife = () =>{
    const [placesData, setPlacesData] = useState(null);
    const { location, error } = geoLocationHook();
    const cityName = "austin";

    const [showFilter, setShowFilter] = useState(false);
    const [selectedQueryFor, setSelectedQueryFor] = useState("nightlife");

    // Handler function to open the map modal
    const openFilterHandler = () =>{
        setShowFilter(true);
    }

    // Handler function to close the map modal
    const closeFilterHandler = () =>{
        setShowFilter(false);
    }

    const handleCategorySelect = category =>{
      setSelectedQueryFor(category);
      closeFilterHandler();
    }

    useEffect(() => {
        if (location) {
          const findNearbyNightlife = async () => {
            try {
              const places = await fetchNearbyPlaces(location.latitude, location.longitude, selectedQueryFor, cityName);
              setPlacesData(places);
            } catch (error) {
              console.log(error);
            }
          };
    
          findNearbyNightlife();
        }
      }, [location, selectedQueryFor, cityName]);
    
    return (
        <div className="place-container">
              <FilterModal 
                show={showFilter} 
                onClick={closeFilterHandler} 
                contentClass="place-item__modal-content" 
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button onClick={closeFilterHandler}>CLOSE</Button>
                    </React.Fragment>
                }
                categoryInfo={CATEGORY_NAMES}
                onCategorySelect = {handleCategorySelect}
            />
            <div className="place-heading">
              <h1>NIGHTLIFE PLACES</h1>
              <Button inverse onClick={openFilterHandler}>FILTER</Button>
            </div>
            {
                placesData !== null ? <PlacesToEatList resturants={placesData}/> : <p className="place-loading">Loading...</p>
            }
        </div>
    )
}

export default Nightlife;