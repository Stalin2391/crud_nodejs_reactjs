import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

const ViewItem = () => {
    const [viewItem, setViewItem] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios.get(`/product/get/${id}`)
        .then((response) => {
            setViewItem(response.data[0]);
        });
    }, [id])
  return (
    <div className="container" style={{maxWidth:'500px',margin:'150px auto auto'}}>
        <div className="card text-center">
            <div className="card-header">
                <h3>Item Details</h3>
            </div><br/>
            <span><strong>ID:</strong>{id}</span><br/>
            <span><strong>NAME:</strong>{viewItem.name}</span><br/>
            <span><strong>DESCRIPTION:</strong>{viewItem.description}</span><br/>
            <span><strong>PRICE:</strong>{viewItem.price}</span><br/>
        </div>
        <Link to="/">
            <button className="btn btn-primary btn-blok mt-3">Back</button>
        </Link>
    </div>
  )
}

export default ViewItem;