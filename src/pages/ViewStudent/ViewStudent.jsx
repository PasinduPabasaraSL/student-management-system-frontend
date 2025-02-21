import { useState, useEffect } from 'react';

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.8rem',
    color: '#1a1a1a',
    margin: 0,
  },
  backButton: {
    padding: '0.6rem 1rem',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s',
    color: '#1a1a1a',
    fontWeight: 500,
  },
  searchContainer: {
    marginBottom: '2rem',
  },
  searchInput: {
    width: '100%',
    maxWidth: '300px',
    padding: '0.8rem 1rem',
    borderRadius: '6px',
    border: '1px solid #dee2e6',
    fontSize: '0.95rem',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: 600,
    color: '#1a1a1a',
    borderBottom: '1px solid #dee2e6',
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #dee2e6',
    color: '#444',
  },
  noData: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
  },
  status: {
    padding: '0.3rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    display: 'inline-block',
  },
  loadingSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    color: '#666',
  }
};

function ViewStudent() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8081/student_management_service_war_exploded/student/getAll');
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
      setError(null);
    } catch (error) {
      setError('Failed to load students. Please try again later.');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (age) => ({
    ...styles.status,
    backgroundColor: age < 20 ? '#e3fcef' : '#fff3cd',
    color: age < 20 ? '#0d503c' : '#664d03',
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Student Directory</h1>
        <button 
          style={styles.backButton}
          onClick={handleBack}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#dee2e6'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#f8f9fa'}
        >
          ← Back
        </button>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {loading ? (
        <div style={styles.loadingSpinner}>Loading students...</div>
      ) : error ? (
        <div style={styles.noData}>{error}</div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student Name</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.age}</td>
                    <td style={styles.td}>
                      <span style={getStatusStyle(student.age)}>
                        {student.age < 20 ? 'Junior' : 'Senior'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={styles.noData}>
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewStudent;