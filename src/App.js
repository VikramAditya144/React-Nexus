import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import githubIcon from './assets/icons8-github-48.png';
import linkedinIcon from './assets/icons8-linkedin-50.png';
import emailIcon from './assets/icons8-gmail-50.png';
import data from './data.json';

const App = () => {
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [professionFilter, setProfessionFilter] = useState("");

  useEffect(() => {
    setAttendees(data);
  }, []);

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearchTerm = `${attendee.name}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = companyFilter ? attendee.company === companyFilter : true;
    const matchesProfession = professionFilter ? attendee.profession === professionFilter : true;
    return matchesSearchTerm && matchesCompany && matchesProfession;
  });

  return (
    <div className="App">
      <header className="header">
            <img src="https://reactnexus.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-light.ecada538.png&w=640&q=75" alt="ReactNexus Logo" className="logo" />
      </header>
      <div className="filters">
        <motion.input
          type="text"
          placeholder="Search attendees"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.select
          className="filter-select"
          value={companyFilter}
          onChange={e => setCompanyFilter(e.target.value)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <option value="">All Companies</option>
          <option value="Google">Google</option>
          <option value="Meta">Meta</option>
          <option value="Adobe">Adobe</option>
          <option value="Amazon">Amazon</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Tesla">Tesla</option>
          <option value="Netflix">Netflix</option>
          <option value="Apple">Apple</option>
          <option value="SpaceX">SpaceX</option>
          <option value="Facebook">Facebook</option>
        </motion.select>
        <motion.select
          className="filter-select"
          value={professionFilter}
          onChange={e => setProfessionFilter(e.target.value)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <option value="">All Professions</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Venture Capitalist">Venture Capitalist</option>
          <option value="AI Specialist">AI Specialist</option>
          <option value="Product Manager">Product Manager</option>
          <option value="App Developer">App Developer</option>
          <option value="GenAI Engineer">GenAI Engineer</option>
        </motion.select>
      </div>
      <div className="attendee-list">
        <AnimatePresence>
          {filteredAttendees.map(attendee => {
            const fullName = attendee.name;
            const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(fullName)}`;

            return (
              <motion.div
                key={attendee.github}
                className="attendee-item"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={avatarUrl} 
                  alt={`${fullName}'s avatar`} 
                  className="avatar" 
                />
                <div className="attendee-details">
                  <h2 className="attendee-name">{fullName}</h2>
                  <p className="attendee-profession">{attendee.profession}</p>
                  <p className="attendee-company">{attendee.company}</p>
                  <div className="links">
                    <a href={`https://github.com/${attendee.github}`} target="_blank" rel="noopener noreferrer">
                      <img src={githubIcon} alt="GitHub" className="icon" />
                    </a>
                    <a href={`https://linkedin.com/in/${attendee.linkedin}`} target="_blank" rel="noopener noreferrer">
                      <img src={linkedinIcon} alt="LinkedIn" className="icon" />
                    </a>
                    <a href={`mailto:${attendee.email}`} target="_blank" rel="noopener noreferrer">
                      <img src={emailIcon} alt="Email" className="icon" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
