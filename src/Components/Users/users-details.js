import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from '../../axios'
import ThePagination from "../ThePagination";

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

const Users = (props) =>
{
    let history = useHistory();
    const location = useLocation();
    const path = window.location.pathname;
    const initialQueryString = location.search;
    const initialPageNumber = Number(initialQueryString.page) || 1;
    const [headers] = useState(['Id', 'Firstname', 'Lastname', 'Age', 'Actions']);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');;
    const [currentPage, setCurrentPage] = useState(initialPageNumber);
    const [totalpage, setTotalpage] = useState();
    let [limit, setLimit] = useState(0);



    useEffect(() =>
    {
        let data = new FormData()
        data.append('limit', 20 * limit)
        axios.post('/getUsers', data).then((response) =>
        {
            if (response.status === 200)
            {

                const total = response.data.total
                setUsers([...response.data.data])
                const totalPages = Math.ceil(total / 20);
                setTotalpage(totalPages)
            }
        })
        history.push(`${path}?page=${currentPage}`);
    }, [currentPage, history, path])


    const paginate = (pageNumber) =>
    {
        setCurrentPage(pageNumber);
        setLimit(pageNumber - 1)
    }

    function handleNewUser()
    {
        history.push("/user");
    }

    function removeUser(id)
    {
        let newUsers = users.filter(item => item.id !== id)
        setUsers([...newUsers])
        axios.delete(`/deleteUser/${id}`).then(res =>
        {
            setMessage('Successfully Removed')
            setShow(true)
        })
    }

    function calculate_age(dob)
    {
        let b_date = new Date(dob)
        let diff_ms = Date.now() - b_date.getTime();
        let age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }



    return (

        <>
            <Card body className="shadow">
                <Row>
                    <Col md="4">
                        <Button variant="success" className="w-50 rounded font-weight-bold" size="md" onClick={handleNewUser}>Add New User</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Card body className="shadow-sm">
                        <Table responsive>
                            <thead>
                                <tr>
                                    {headers.map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>

                                {users.map((item, _index) =>
                                (
                                    <tr key={item.id}>
                                        <td >{item.id}</td>
                                        <td>{item.firstname}</td>
                                        <td >{item.lastname}</td>
                                        <td>{calculate_age(item.date_of_birth)}</td>
                                        <td >
                                            <Button
                                                onClick={() => history.push(`/user/${item.id}`)}
                                                variant="primary"
                                                className="w-25 rounded font-weight-bold mx-1 " size="sm">Edit</Button>
                                            <Button
                                                onClick={() => removeUser(item.id)}
                                                variant="danger"
                                                className="w-25 rounded font-weight-bold" size="sm">Delete</Button>
                                        </td>
                                    </tr>

                                ))}


                            </tbody>
                        </Table>
                    </Card>
                </Row>
                <Row className="float-end mt-3 ">
                    <ThePagination
                        currentPage={currentPage}
                        dataAmount={totalpage}
                        paginate={paginate} />
                </Row>

            </Card>
            <Toast autohide bg="success" onClose={() => setShow(false)} show={show}
                delay={1000}
                style={{ position: 'absolute', top: 0, right: 0, color: 'white', fontSize: 1 + 'em' }}>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </>
    );
};

export default Users;