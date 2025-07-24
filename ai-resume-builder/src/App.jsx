import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/auth/SignIn';
import Header from './Pages/Header';
import Dashbord from './Pages/Dashboard/Dashbord';
import EditResume from './Pages/Dashboard/resume/[resumeId]/edit';
import ResumePreview from './Pages/Dashboard/resume/Component/ResumePreview';
import CreateResume from './Pages/Dashboard/resume/[resumeId]/create';
import UseGetAllResume from './CostumHook/UseGetAllResume';
import { useEffect } from 'react';
import axios from 'axios';
import { setUser } from './redux/AuthSlice';
import { useDispatch } from 'react-redux';
import ViewResume from './Pages/Dashboard/resume/[resumeId]/view';
import ResumeBuilder from './Pages/Dashboard/resume/BuildResumewithPrompt';

function App() {
    UseGetAllResume(); 

    const dispatch = useDispatch();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.get('https://ai-powered-resume-builder.onrender.com/api/v1/verify', { withCredentials: true });
                const { user, token } = res.data;
                dispatch(setUser({ user, token, isAuthenticated: true }));
            } catch (error) {
                console.error("Verification failed:", error.message);
            }
        };

        verifyUser();
    },[dispatch]); 

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/resume" element={<ResumeBuilder />} />
                    <Route path="/auth/sign-in" element={<SignIn />} />
                    <Route path="/dashboard" element={<Dashbord />} />
                    <Route path="/resume/create" element={<CreateResume />} />
                    <Route path="/resume/:resumeId/edit" element={<EditResume />} />
                    <Route path="/resume/:resumeId/view" element={<ViewResume />} />
                    <Route path="/preview" element={<ResumePreview />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

