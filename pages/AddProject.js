import React, { useEffect, useState } from "react";
import '../components/css/form.css'
import Header from '../components/Header/Header'
import axios from "axios";
import { baseUrl } from "../config/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddProject = () => {

    const [projectDetails, setProjectDetails] = useState({
        name: "",
        budget: "",
        start_date: "",
        end_date: "",
    });
    const [isLoading, setLoading] = useState(false);

    let name, value;
    const handleChange = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setProjectDetails({ ...projectDetails, [name]: value });
        console.log(name, value);
    };

    const addSubject = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (projectDetails.name === "" || projectDetails.budget === "" || projectDetails.start_date === "" || projectDetails.end_date === "") {
            toast.error('Please Fill All The Required Fields Before Submitting The Form!!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            setLoading(false)
        }
        else {
            console.log(projectDetails, typeof (projectDetails))
            await axios.post(baseUrl.UrlLocal + 'project/createProject', projectDetails)
                .then(response => {
                    if (response) {
                        if (response.data.status === true) {
                            toast.success(response.data.message, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                            });
                            setLoading(false)
                        }
                        else {
                            toast.error(response.data.message, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                            });
                            setLoading(false)
                        }
                    }
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Internal Server Error occured!!', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setLoading(false)
                })
        }
    }

    return (
        <div className='App'>
            <div>< Header /></div>
            <form class="w3-container w3-card-4" style={{ marginTop: '5%', width: '50%', marginLeft: '25%', }}>
                <h2 class="w3-text-blue">Add Project</h2>
                {/* <p>Please Enter UserName / Wallet Address of Your Friend.</p> */}
                <p style={{ textAlign: 'left' }}>
                    <label class="w3-text-black"><b>Project Name</b></label>
                    <input class="w3-input w3-border" name="name" type="text" placeholder='Ecommerce Website' tabIndex={1} value={projectDetails.name || ""} onChange={handleChange} />
                </p>
                <p style={{ textAlign: 'left' }}>
                    <label class="w3-text-black"><b>Project Budget</b></label>
                    <input class="w3-input w3-border" name="budget" type="text" placeholder='50000' tabIndex={2} value={projectDetails.budget || ""} onChange={handleChange} />
                </p>
                <p style={{ textAlign: 'left' }}>
                    <label class="w3-text-black"><b>Project Start Date</b></label>
                    <input class="w3-input w3-border" name="start_date" type="text" placeholder='01/04/2022' tabIndex={3} value={projectDetails.start_date || ""} onChange={handleChange} />
                </p>
                <p style={{ textAlign: 'left' }}>
                    <label class="w3-text-black"><b>Project End Date</b></label>
                    <input class="w3-input w3-border" name="end_date" type="text" placeholder='01/05/2022' tabIndex={4} value={projectDetails.end_date || ""} onChange={handleChange} />
                </p>
                <p>
                    {!isLoading ?
                        <button class="w3-btn w3-blue" onClick={addSubject}>Submit</button>
                        :
                        <button class="w3-btn w3-indigo glyphicon glyphicon-refresh spinning">Please Wait...</button>
                    }
                </p>
                {/* <button class="btn btn-lg btn-warning">
                    <span class="glyphicon glyphicon-refresh spinning"></span> Loading...
                </button> */}
            </form>
        </div >
    )
}

export default AddProject
