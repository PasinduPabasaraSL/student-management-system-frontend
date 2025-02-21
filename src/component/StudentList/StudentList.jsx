function StudentList({ students }) {
    return (
        <ul>
            {students.map((student, index) => (
                <li key={index}>{student.name} - {student.age} years old</li>
            ))}
        </ul>
    );
}

export default StudentList;