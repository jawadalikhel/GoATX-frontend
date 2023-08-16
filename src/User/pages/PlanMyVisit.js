import React from "react";
import Header from "../components/Header";
import ProfileMainNavigation from "../components/Navigation/ProfileMainNavigation";
import SavedPlaces from "../components/userFavorites/savedPlaces";
import SavedPlans from "../components/userPlans/savedPlans";

import "./Styles/PlanMyVisit.css";

const PlanMyVisit = () =>{
    return (
        <div>
            <Header />
            <ProfileMainNavigation />

            <SavedPlaces />

            <SavedPlans />
        </div>
    )
}

export default PlanMyVisit;