import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  	const [data, setData] = useState([]);
	const loadData = async() => {
		await axios.get("/product/get").then((res)=>{
		setData(res.data);
		})
	}
	useEffect(() => {
		loadData();
	}, []);

  const deleteItem = (id) => {
	if(window.confirm("Are you sure want to delete Item?")){
		axios.delete(`/product/delete/${id}`);
		// alert("Your Item deleted Successfully");
		setTimeout(() => loadData(), 500);
	}
  }

  return (
    <div className="container" style={{marginTop:'120px'}}>
		<div className="d-flex justify-content-end">
			<Link to="/add/item">
				<button className="btn btn-primary mb-4">Add item</button>
			</Link>
		</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Desc</th>
            <th>Price</th>
			<th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index)=> {
            return(
              <tr>
				<th scope="row">{index+1}</th>
				<td>{item.name}</td>
				<td>{item.description}</td>
				<td>{item.price}</td>
				<td>
					<Link to={`/update/${item.id}`}>
						<button className="btn btn-primary">Edit</button>
					</Link>
					<button 
						onClick={()=>deleteItem(item.id)}
					   className="btn btn-danger"
					>
						Delete
					</button>
					<Link to={`/view/${item.id}`}>
						<button className="btn btn-secondary">View</button>
					</Link>
				</td>
			</tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Home;