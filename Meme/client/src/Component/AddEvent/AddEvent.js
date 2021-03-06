import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddEvent = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const [imageURL,setImageURL] = useState(null);
    
    const onSubmit = data => {
        const eventData ={
            name: data.name,
            imageURL:imageURL
        };
        const url = `http://localhost:8000/addImage`;
        fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(res=>console.log('Server side response'))
    };
    const handleImageUpload = event =>{
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', 'bf0089a7da19da02c2b0c7b9ad8d161f');
        imageData.append('image',event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  
    // console.log(watch("example"));
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue="New Exciting Event" {...register("name")} />
            <br />
            <input name="exampleRequired" type="file" onChange={handleImageUpload}/>
            <br />
            
            <input type="submit" />
        </form>
    );
};

export default AddEvent;