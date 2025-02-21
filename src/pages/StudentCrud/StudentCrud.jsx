import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentCrud.css';

function StudentCrud() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentStudent, setCurrentStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
    });
    const [id,setId] = useState("");

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:8081/student_management_service_war_exploded/student/getAll');
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentStudent) {
            updateStudent(formData,id);
        } else {
            const url = 'http://localhost:8081/student_management_service_war_exploded/student/';

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    fetchStudents();
                    setIsModalOpen(false);
                    resetForm();
                } else {
                    alert('Error saving student');
                }
            } catch (error) {
                alert('Error saving student:', error);
            }
        }
    };

    const handleEdit = (student) => {
        setCurrentStudent(student);
        setFormData({ name: student.name, age: student.age });
        setId(student.id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const response = await fetch(`http://localhost:8081/student_management_service_war_exploded/student?id=${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchStudents();
                }
            } catch (error) {
                alert('Error deleting student:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            age: '',
        });
        setCurrentStudent(null);
    };

    const updateStudent = (formData, id) => {
        console.log("Id " + id);
        fetch(`http://localhost:8081/student_management_service_war_exploded/student?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to update student');
        })
        .then((data) => {
            window.alert('Student updated successfully');
            console.log('Response data:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    

    const filteredStudents = students.filter(student =>
        student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Student Management</h1>
            </div>

            <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchInput"
            />

            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Name</th>
                        <th className="th">Age</th>
                        <th className="th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student) => (
                        <tr key={student.id}>
                            <td className="td">{student.name}</td>
                            <td className="td">{student.age}</td>
                            <td className="td">
                                <button
                                    className="button editButton"
                                    onClick={() => handleEdit(student)}
                                    style={{ marginRight: '20px' }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="button deleteButton"
                                    onClick={() => handleDelete(student.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="crudButtons">
                <button className="button primaryButton" onClick={() => setIsModalOpen(true)}>Add Student</button>
            </div>

            {isModalOpen && (
                <>
                    <div className="overlay" onClick={() => setIsModalOpen(false)} />
                    <div className="modal">
                        <h2>{currentStudent ? 'Edit Student' : 'Add New Student'}</h2>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label className="label">Full Name</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="formGroup">
                                <label className="label">Age</label>
                                <input
                                    className="input"
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="modalButtons">
                                <button
                                    type="button"
                                    className="button secondaryButton"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        resetForm();  // Reset the form
                                        setCurrentStudent(null);  // Clear the current student
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="button primaryButton"
                                >
                                    {currentStudent ? 'Update Student' : 'Add Student'}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default StudentCrud;