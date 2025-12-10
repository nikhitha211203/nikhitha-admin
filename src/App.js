import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";

// Pages
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";

// NEW Correct pages
import Experience from "./pages/ExperienceEducation";   // YOUR LIST PAGE
import AddExperience from "./pages/AddExperience";
import AddEducation from "./pages/AddEducation";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectForm from "./pages/ProjectForm";
import SkillsPage from "./pages/SkillsPage";
import SkillForm from "./pages/SkillForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/add" element={<ProjectForm />} />
          <Route path="/projects/edit/:id" element={<ProjectForm />} />

          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/skills/add" element={<SkillForm />} />
          <Route path="/skills/edit/:id" element={<SkillForm />} />

          <Route path="/contact" element={<ContactPage />} />

          {/* Experience & Education */}
          <Route path="/experience" element={<Experience />} />
          <Route path="/experience/add" element={<AddExperience />} />
          <Route path="/education/add" element={<AddEducation />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
