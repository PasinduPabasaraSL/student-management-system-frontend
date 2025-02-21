import { useState } from 'react';

function StudentForm({ addStudent }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({ name, age });
    setName('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <label>Age:</label>
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;