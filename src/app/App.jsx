import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ViewStudent from '../pages/ViewStudent/ViewStudent';
import StudentCrud from '../pages/StudentCrud/StudentCrud';
import Sidebar from '../component/Sidebar/Sidebar';

function App() {
  return (
    <Router>
      <Sidebar/>
      <main> {/* Main content container */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-student" element={<ViewStudent />} />
          <Route path="/student-crud" element={<StudentCrud />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;