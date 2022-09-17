import React, {useState, useEffect} from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
import axios from 'axios';


const AddEdit = () => {
    const [item, setItem] = useState({
        name:"",
        description:"",
        price:""
    });
    const {name, description, price} = item;
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/product/get/${id}`)
        .then((response) => {
            setItem(response.data[0]);
        });
    }, [id]);

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        if(!name || !description || !price) {
            alert("Please Provide Value Each Field")
        }
        else {
            if(!id) {
                axios.post("/product/create", {
                    name,
                    description,
                    price
                }).then(() => {
                    setItem({name:"", description:"", price:""});
                }).catch((error) => {
                    alert(error.response.data);
                });   
                alert('Contact Added Successfullly');
            }else{
                axios.patch(`/product/update/${id}`, {
                    name,
                    description,
                    price
                }).then(() => {
                    setItem({name:"", description:"", price:""});
                }).catch((error) => {
                    alert(error.response.data);
                });
                alert('Contact Updated Successfullly');
            }
            setTimeout(() => {
                navigate('/');
            }, 500);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setItem({...item, [name]:value});
    }

  return (
      <form 
        onSubmit={handleFormSubmit} 
        style={{
            maxWidth:"500px", 
            margin:"auto",
            marginTop:"120px"
        }}>
            <input 
                type="text" 
                className="form-control mt-3" 
                name="name" 
                value={name || ''} 
                onChange={handleInputChange}
            />
            <input 
                type="text" 
                className="form-control mt-3" 
                name="description" 
                value={description || ''} 
                onChange={handleInputChange}
            />
            <input 
                type="text" 
                className="form-control mt-3 mb-3" 
                name="price" 
                value={price || ''} 
                onChange={handleInputChange}
            />

            <button type="submit" className="btn btn-primary">
                {id ? "Update Item" : "Add Item"}
            </button>
            <Link to="/">
                <button className="btn btn-secondary ms-3">Back</button>
            </Link>
      </form>
  )
}

export default AddEdit;