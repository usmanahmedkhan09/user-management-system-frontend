import React, { useEffect, useState } from 'react';
import axios from '../../axios'
import
{
    useParams,
    withRouter
} from "react-router-dom";
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import { useHistory } from "react-router-dom";

function UpdateUser(props)
{
    let history = useHistory();
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');


    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            date_of_birth: '',
        },

        onSubmit: values =>
        {
            if (id)
            {
                UpdateUser(values)
            } else
            {
                createUser(values)
            }

        },
    })
    useEffect(() =>
    {
        if (id)
        {
            axios.get(`/getUserById/${id}`).then((response) =>
            {
                if (response.status === 200)
                {
                    const fields = ['firstname', 'lastname'];
                    formik.setFieldValue('date_of_birth', response.data.date_of_birth.split('T')[0], false)
                    fields.forEach(field => formik.setFieldValue(field, response.data[field], false));

                }
            })
        }
    }, [id])


    function createUser(payload)
    {
        axios.post(`/addUser`, payload).then((res) =>
        {
            if (res.status === 200)
            {
                setMessage('Successfully Created')
                setShow(true)
                setTimeout(() => { history.push("/") }, 2000)

            }
        })
    }

    function UpdateUser(payload)
    {
        axios.put(`/updateUser/${id}`, payload).then((res) =>
        {
            if (res.status === 200)
            {
                setMessage('Successfully Updated')
                setShow(true)
                setTimeout(() => { history.push("/") }, 2000)
            }
        })
    }

    return (
        <>
            <Card className="w-50 d-flex shadow p-2">
                <Card.Body>
                    <Card.Title className="text-center font-weight-bold">{id ? 'UPDATE USER' : 'ADD USER'}</Card.Title>
                    <Form onSubmit={formik.handleSubmit} >
                        <Form.Group className="mb-3" controlId="formGroupFirstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                name="firstname"
                                onChange={formik.handleChange}
                                value={formik.values.firstname}
                                required
                                type="text"
                                placeholder="Enter FirstName" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                name="lastname"
                                onChange={formik.handleChange}
                                value={formik.values.lastname}
                                required type="text" placeholder="Enter LastName" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Choose Date</Form.Label>
                            <Form.Control
                                name="date_of_birth"
                                onChange={formik.handleChange}
                                value={formik.values.date_of_birth}
                                required
                                formate="yyyy-dd-mm"
                                type="date" placeholder="Enter DOB" />
                        </Form.Group>
                        <div className="d-flex justify-content-around w-50 float-end mt-3">
                            <Button type="submit" variant="success" className="w-50 mx-2">{id ? 'Update' : 'Create'}</Button>
                            <Button variant="danger" className="w-50" onClick={() => history.push("/")}>Cancel</Button>
                        </div>
                    </Form>
                </Card.Body>

            </Card>
            <Toast autohide bg="success" onClose={() => setShow(false)} show={show}
                delay={1000}
                style={{ position: 'absolute', top: 0, right: 0, color: 'white', fontSize: 1 + 'em' }}>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </>
    );
}

export default withRouter(UpdateUser);