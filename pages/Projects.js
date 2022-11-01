import React, { useEffect, useState } from "react";
import '../components/css/form.css'
import '../components/css/table.css'
import Header from '../components/Header/Header'
import axios from "axios";
import { baseUrl } from "../config/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Projects = () => {
    const [projects, setProjects] = useState();

    const getAllProjects = async () => {
        await axios.get(baseUrl.UrlLocal + 'project/getAllProjects')
            .then(response => {
                if (response) {
                    if (response.data.status === true) {
                        console.log(response.data.message)
                        setProjects(response.data.message)
                    }
                    else {
                        toast.error(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                toast.error('Internal Server Error occured!!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            })
    }

    useEffect(() => {
        getAllProjects();
    }, [])

    return (
        <div className="App">
            <div>< Header /></div>

            {projects !== "" && projects !== undefined ?
                <>
                    <h2 class="w3-text-blue" style={{marginTop: '3%' }}>Projects List</h2>
                    <div className="mainDiv">
                        {
                            <table style={{ width: '70%' }}>
                                <thead>
                                    <tr>
                                        <th>Project No.</th>
                                        <th>Project Name</th>
                                        <th>Budget</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((item, index) => {
                                        { console.log(item) }
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>${item.budget}</td>
                                                <td>{item.start_date}</td>
                                                <td>{item.end_date}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </>
                : null
            }
        </div>
    )
}

export default Projects
