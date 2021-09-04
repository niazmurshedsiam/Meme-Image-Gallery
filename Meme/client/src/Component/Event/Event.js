import React, { useState } from 'react';

const Event = ({event}) => {
    // const [images,setImages] = useState([])
    const deleteImage = (id)=>{

    }
    return (
        <div className="col-md-3">
            <img style={{height:"300px", margin:"10px"}} src={event.imageURL} alt="" />
            <h1 style={{marginLeft:"10px"}}>{event.name}</h1>
            <button onClick={deleteImage(event._id)}>Delete</button>
        </div>
    );
};

export default Event;