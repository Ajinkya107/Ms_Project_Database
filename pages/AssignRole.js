import React, { useEffect, useState } from "react";
import '../components/css/form.css'
import '../components/css/table.css'
import Header from '../components/Header/Header'
import axios from "axios";
import { baseUrl } from "../config/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AssignRole = () => {
    const [projects, setProjects] = useState();
    const [employees, setEmployees] = useState();
    const [isLoading, setLoading] = useState();
    const [roleDetails, setRoleDetails] = useState({
        project_no: "",
        emp_code: "",
        role: "",
    });

    let name, value;
    const handleChange = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setRoleDetails({ ...roleDetails, [name]: value });
        console.log(name, value);
    };

    const getData = async () => {
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

        await axios.get(baseUrl.UrlLocal + 'employee/getAllEmployees')
            .then(response => {
                if (response) {
                    if (response.data.status === true) {
                        console.log(response.data.message)
                        setEmployees(response.data.message)
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


    const assignRole = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (roleDetails.project_no === "" || roleDetails.emp_code === "" || roleDetails.role === "") {
            toast.error('Please Fill All The Required Fields Before Submitting The Form!!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            setLoading(false)
        }
        else {
            console.log(roleDetails, typeof (roleDetails))
            await axios.post(baseUrl.UrlLocal + 'project/assignRole', roleDetails)
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
        getData();
    }, [])

    return (
        <div className='App'>
            <div>< Header /></div>

            <div className="w3-container w3-card-4" style={{ width: '50%', marginLeft: '25%', marginTop: '5%', borderRadius: 10 }}>
                <h2 class="w3-text-blue" style={{ fontSize: 20 }}>Select Project</h2>
                <select className="w3-container w3-card-4" onChange={(e) => {
                    setRoleDetails({ ...roleDetails, project_no: e.target.value })
                }} style={{ margin: '1%', height: 40, width: '50%', textAlign: 'center' }}>
                    <option value={0}>-- Projects --</option>
                    {projects ?
                        projects.map((item) => {
                            return (
                                <option key={item.project_no} value={item.project_no}>{item.name}</option>
                            )
                        })
                        : null}
                </select>

                <h2 class="w3-text-blue" style={{ fontSize: 20 }}>Select Employee</h2>
                <select className="w3-container w3-card-4" onChange={(e) => {
                    setRoleDetails({ ...roleDetails, emp_code: e.target.value })
                }} style={{ margin: '1%', height: 40, width: '50%', textAlign: 'center' }}>
                    <option value={0}>-- Employees --</option>
                    {employees ?
                        employees.map((item) => {
                            return (
                                <option key={item.emp_code} value={item.emp_code}>{item.emp_name}</option>
                            )
                        })
                        : null}
                </select>

                <h2 class="w3-text-blue" style={{ fontSize: 20 }}>Select Role</h2>
                <select className="w3-container w3-card-4" onChange={(e) => {
                    setRoleDetails({ ...roleDetails, role: e.target.value })
                }} style={{ margin: '1%', height: 40, width: '50%', textAlign: 'center' }}>
                    <option value={0}>-- Roles --</option>
                    return (
                    <option key='Reporting Manager' value='Reporting Manager'>Reporting Manager</option>
                    <option key='Developer' value='Developer'>Developer</option>
                    )
                </select>

                <p>
                    {!isLoading ?
                        <button class="w3-btn w3-blue" onClick={assignRole}>Assign Role</button>
                        :
                        <button class="w3-btn w3-indigo glyphicon glyphicon-refresh spinning">Please Wait...</button>
                    }
                </p>

            </div>
        </div>
    )
}

export default AssignRole
