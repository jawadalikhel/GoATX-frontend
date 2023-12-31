// Importing necessary modules from React and custom components
import React, {useCallback, useContext, useState} from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../../shared/components/UIElements/Modal";
import Map from "../../../shared/components/UIElements/Map";

// Importing CSS styles for the component
import "../Styles/SavedPlacesItem.css"

//component "PlaceItem" takes props as input
const SavedPlacesItem = (props) =>{
    const auth = useContext(AuthContext);
    // Using the React Hook "useState" to create two state variables: "showMap" and "showConfirmModal"
    const [showMap, setShowMap] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();


    // Handler function to open the map modal
    const openMapHandler = () =>{
        setShowMap(true);
    }

    // Handler function to close the map modal
    const closeMapHandler = () =>{
        setShowMap(false);
    }

    const showDeleteWarningHandler = () =>{
        setShowDeleteModal(true)
    }

    const cancelDeleteHandler = () =>{
        setShowDeleteModal(false);
    }

    const confirmDeleteHandler = async() => {
        setShowDeleteModal(false);
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/favorites/user/deletePlace/${props.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            props.onDelete(props.id);
        } catch (error) {
            // Handle errors if needed
            console.log(error, "<---- can't delete place")
        }
    };

    // The component's JSX code starts here
    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {/* Modal for displaying the map */}
            <Modal 
                show={showMap} 
                onClick={closeMapHandler} 
                header={props.address} 
                contentClass="place-item__modal-content" 
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button onClick={closeMapHandler}>CLOSE</Button>
                        <Button onClick={confirmDeleteHandler}>Remove</Button>
                    </React.Fragment>
                }
            >
                <div className="map-container">
                    {/* Displaying the map using the Map component with the coordinates provided */}
                    <Map center={props.coordinates} zoom={17}/>
                </div>
            </Modal>

            {/* The main content of the component */}
            <li className="savedPlacesItem-content" key={props.id}>
                <div className="">
                    {isLoading ? <LoadingSpinner asOverlay /> : null}
                    <div className="favPlace_item_image">
                        <img
                        src={
                            props.photo
                            ? props.photo
                            : null
                        }
                        alt={props.name}
                        />
                    </div>
                    <div className="place-item_info">
                        <h2>{props.name}</h2>
                        <h3>
                        {props.Rating} ({props.userRatingTotal})
                        </h3>
                    </div>
                    <div className="place-item_actions">
                        <Button inverse onClick={openMapHandler}>
                        VIEW IN MAP
                        </Button>
                    </div>
                </div>
            </li>
            
        </React.Fragment>
    )
}

// Exporting the component to be used in other parts of the application
export default SavedPlacesItem;