import React, { useEffect, useState } from "react";
import '../components/css/form.css'
import '../components/css/table.css'
import Header from '../components/Header/Header'
import axios from "axios";
import { baseUrl } from "../config/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddProjectMilestone = () => {

    const [projects, setProjects] = useState();
    const [project_no, setProjectNo] = useState();
    const [isLoading, setLoading] = useState(false);
    const [projectMilestone, setProjectMilestone] = useState({
        done_tasks: "",
        pending_tasks: "",
    });

    let name, value;
    const handleChange = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setProjectMilestone({ ...projectMilestone, [name]: value });
        console.log(name, value);
    };

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

    const addMilestone = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(projectMilestone, project_no, typeof (project_no))
        if (projectMilestone.done_tasks === "" || projectMilestone.pending_tasks === "" || parseInt(project_no) === 0) {
            toast.error('Please Fill All The Required Fields Before Submitting The Form!!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            setLoading(false)
        }
        else {
            console.log(projectMilestone, typeof (projectMilestone))
            await axios.post(baseUrl.UrlLocal + 'project/updateProjectMilestones', { done_tasks: projectMilestone.done_tasks, pending_tasks: projectMilestone.pending_tasks, project_no })
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

    useEffect(() => {
        getAllProjects();
    }, [])

    return (
        <div className='App'>

            <div>< Header /></div>
            <div className="w3-container w3-card-4" style={{ width: '50%', marginLeft: '25%', marginTop: '2%', borderRadius: 10 }}>
                <h2 class="w3-text-blue">Select Project</h2>
                <select className="w3-container w3-card-4" onChange={(e) => {
                    setProjectNo(e.target.value)
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

            <form class="w3-container w3-card-4" style={{ marginTop: '5%', width: '50%', marginLeft: '25%', }}>
                <h2 class="w3-text-blue">Add Milestone Details</h2>
                {/* <p>Please Enter UserName / Wallet Address of Your Friend.</p> */}
                <p style={{ textAlign: 'left' }}>
                    <label class="w3-text-black"><b>Done Tasks</b></label>
                    <input class="w3-input w3-border" name="done_tasks" type="text" placeholder='Admin Module Done.' tabIndex={1} value={projectMilestone.done_tasks || ""} onChange={handleChange} />
                </p>
                <p style={{ textAlign: 'left' }}>
                    <label class="w3-text-black"><b>Pending Tasks</b></label>
                    <input class="w3-input w3-border" name="pending_tasks" type="text" placeholder='Customer Module Pending.' tabIndex={2} value={projectMilestone.pending_tasks || ""} onChange={handleChange} />
                </p>
                <p>
                    {!isLoading ?
                        <button class="w3-btn w3-blue" onClick={addMilestone}>Add Milestone</button>
                        :
                        <button class="w3-btn w3-indigo glyphicon glyphicon-refresh spinning">Please Wait...</button>
                    }
                </p>
            </form>
        </div>
    )
}

export default AddProjectMilestone
