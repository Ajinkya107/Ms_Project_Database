import React, { useEffect, useState } from "react";
import '../components/css/form.css'
import '../components/css/table.css'
import Header from '../components/Header/Header'
import axios from "axios";
import { baseUrl } from "../config/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Reports() {

    const [projects, setProjects] = useState();
    const [projectReport, setProjectReport] = useState({
        total_persons: "",
        total_hours: "",
        ProjectDetails: "",
        team_members: ""
    })

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

    const getProjectReport = async (project_no) => {
        if (parseInt(project_no) != 0) {
            await axios.post(baseUrl.UrlLocal + 'project/getProjectsReport', { project_no })
                .then(response => {
                    if (response) {
                        if (response.data.status === true) {
                            console.log(response.data)
                            let data = response.data;
                            setProjectReport({ total_persons: data.total_persons, total_hours: data.total_hours, team_members: data.team_members, ProjectDetails: data.ProjectDetails })
                            setTimeout(() => {
                                console.log(projectReport, "Report");
                            }, 3000);
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
        else{
            setProjectReport({ProjectDetails: ""})
        }
    }

    useEffect(() => {
        getAllProjects();
    }, [])

    return (
        <div className="App">
            <div>< Header /></div>
            <h2 class="w3-text-blue">Project Reports</h2>
            <div className="w3-container w3-card-4" style={{ width: '50%', marginLeft: '25%', marginTop: '3%', borderRadius: 10 }}>
                <h2 class="w3-text-blue">Select Project</h2>
                <select className="w3-container w3-card-4" onChange={(e) => {
                    getProjectReport(e.target.value)
                }} style={{ margin: '5%', height: 40, width: '50%', textAlign: 'center' }}>
                    <option value={0}>-- Projects --</option>
                    {projects ?
                        projects.map((item) => {
                            return (
                                <option key={item.project_no} value={item.project_no}>{item.name}</option>
                            )
                        })
                        : null}
                </select>
            </div>

            {projectReport.ProjectDetails !== "" ?
                <>
                    {console.log(projectReport.ProjectDetails)}
                    <h2 style={{ fontSize: 25, marginTop: '3%' }}>Project Details</h2>
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
                                        <th>Total Persons</th>
                                        <th>Total Working Hours</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(projectReport.ProjectDetails).map((item, index) => {
                                        { console.log(item) }
                                        return (
                                            <tr key={index}>
                                                <td>{item.project_no}</td>
                                                <td>{item.name}</td>
                                                <td>{item.budget}</td>
                                                <td>{item.start_date}</td>
                                                <td>{item.end_date}</td>
                                                <td>{projectReport.total_persons}</td>
                                                <td>{projectReport.total_hours}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>


                    <h2 style={{ fontSize: 25, marginTop: '3%' }}>Project Milestones</h2>
                    <div className="mainDiv">
                        {
                            <table style={{ width: '80%' }}>
                                <thead>
                                    <tr>
                                        <th>Done Tasks</th>
                                        <th>Pending Tasks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(projectReport.ProjectDetails).map((item, index) => {
                                        { console.log(item) }
                                        return (
                                            <tr key={index}>
                                                <td>{item.done_tasks}</td>
                                                <td>{item.pending_tasks}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>

                    {projectReport.team_members !== "" ?
                        <>
                            <h2 style={{ fontSize: 25, marginTop: '3%' }}>Project Team</h2>
                            <div className="mainDiv">
                                {
                                    <table style={{ width: '90%', marginBottom: '3%' }}>
                                        <thead>
                                            <tr>
                                                <th>Employee Name</th>
                                                <th>role</th>
                                                <th>Salary</th>
                                                <th>Total Hours</th>
                                                <th>Phone No</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(projectReport.team_members).map((item, index) => {
                                                { console.log(item) }
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.emp_name}</td>
                                                        <td>{item.role}</td>
                                                        <td>${item.salary}</td>
                                                        <td>{item.total_hours}</td>
                                                        <td>{item.phone_no}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </>
                        : null}
                </>
                :
                null}
        </div>
    )
}

export default Reports
