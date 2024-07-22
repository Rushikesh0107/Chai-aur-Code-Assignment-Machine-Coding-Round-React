import React from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import OTPForm from './components/OTPForm/OTPForm';
import CourseList from './components/CourseList/CourseList';
import Batches from './components/Batches/Batches';
import Layout from './components/Common/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<OTPForm />} />
          <Route path="/otp-form" element={<OTPForm />} />
          <Route path="/course-list" element={<CourseList />} />
          <Route path="/batches" element={<Batches />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
