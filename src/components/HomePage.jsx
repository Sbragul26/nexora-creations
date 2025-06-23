import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll tracking for overall page
  const { scrollYProgress } = useScroll();

  const roles = ['Innovator', 'Developer', 'Freelancer', 'Creator'];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Modern React-based shopping platform with secure payment integration',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
      title: 'Cybersecurity Dashboard',
      description: 'Real-time threat monitoring and analysis dashboard',
      image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&h=600&fit=crop',
      tech: ['Vue.js', 'Python', 'D3.js', 'WebSocket'],
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      tech: ['React Native', 'Firebase', 'Blockchain'],
    },
    {
      title: 'AI Analytics Platform',
      description: 'Machine learning powered analytics for business intelligence',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tech: ['Python', 'TensorFlow', 'React', 'Docker'],
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud architecture for enterprise applications',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      tech: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
    },
  ];

  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    },
    {
      name: 'Sarah Chen',
      role: 'Cybersecurity Expert',
      skills: ['Penetration Testing', 'Security Auditing', 'Blockchain', 'Cryptography'],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    },
    {
      name: 'Mike Rodriguez',
      role: 'UI/UX Designer',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const slideIn = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Typing effect
  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const type = () => {
      const currentWord = roles[currentRole];

      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, roles]);

  // Vanta.js effect
  useEffect(() => {
    const vantaEffect = window.VANTA?.NET({
      el: '#homeContainer',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x58a6ff,
      backgroundColor: 0x0d1117,
      maxDistance: 21.0,
      spacing: 20.0,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const IPad = ({ project }) => {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-black/20 blur-3xl transform translate-y-6 scale-95 rounded-3xl"></div>
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl max-w-[600px] mx-auto">
          <div className="bg-black rounded-2xl overflow-hidden aspect-[4/3] relative">
            <div className="absolute top-0 left-0 right-0 h-10 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-between px-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="text-white text-sm font-mono">9:41 AM</div>
              <div className="flex items-center space-x-1">
                <div className="w-6 h-3 border border-white rounded-sm">
                  <div className="w-3/4 h-full bg-green-500 rounded-sm"></div>
                </div>
              </div>
            </div>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
              <p className="text-lg text-gray-300">{project.description}</p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-40 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              NEXORA
            </motion.div>
            <ul className="flex space-x-8">
              {['projects', 'team', 'contact'].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(item)}
                    className="hover:text-blue-400 transition-colors duration-300 capitalize"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="homeContainer"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center"
      >
        <motion.div
          className="text-center z-10 px-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            NEXORA CREATIONS
          </motion.h1>
          <motion.div
            className="text-2xl md:text-4xl mb-8 h-16 flex items-center justify-center"
            variants={fadeInUp}
          >
            <span className="mr-4">We're</span>
            <span className="text-blue-400 font-mono">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Where cybersecurity meets digital innovation. We create secure, scalable solutions that push the boundaries of technology.
          </motion.p>
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Work
          </motion.button>
        </motion.div>
      </section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        ref={projectsRef}
        className="min-h-screen py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <div className="relative">
            {/* Left Arrow - positioned outside the content area */}
            <motion.button
              onClick={prevProject}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-blue-600/20 hover:bg-blue-600/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-blue-500/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            {/* Right Arrow - positioned outside the content area */}
            <motion.button
              onClick={nextProject}
              className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-blue-600/20 hover:bg-blue-600/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-blue-500/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            <div className="grid lg:grid-cols-2 gap-16 items-center w-full min-h-[600px]">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={projects[currentProject].title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-0.5 bg-blue-500"></div>
                      <span className="text-blue-400 font-mono text-lg">{String(currentProject + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-5xl font-bold text-white leading-tight">{projects[currentProject].title}</h3>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-lg">{projects[currentProject].description}</p>
                    <div className="flex flex-wrap gap-3">
                      {projects[currentProject].tech.map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-6 pt-4">
                      <motion.button
                        className="group flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Open project</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.button>
                      <motion.button className="text-gray-400 hover:text-white transition-colors duration-300" whileHover={{ scale: 1.05 }}>
                        View Code
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-full max-w-[600px]">
                  <IPad project={projects[currentProject]} />
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="flex justify-center space-x-3 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProject ? 'bg-blue-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        id="team"
        ref={teamRef}
        className="min-h-screen py-20 bg-gray-800/50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="text-center">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-4">{member.role}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm"
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        ref={contactRef}
        className="min-h-screen py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to bring your ideas to life? Let's create something amazing together.
          </motion.p>
          <motion.div
            className="max-w-lg mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <motion.input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none"
                whileFocus={{ scale: 1.02 }}
              ></motion.textarea>
              <motion.button
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </div>
          </motion.div>
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-6">Connect with us</p>
            <div className="flex justify-center space-x-6">
              {[
                { name: 'GitHub', icon: '📧', href: '#' },
                { name: 'LinkedIn', icon: '💼', href: '#' },
                { name: 'Twitter', icon: '🐦', href: '#' },
                { name: 'Discord', icon: '💬', href: '#' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 text-xl"
                  title={social.name}
                  whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;