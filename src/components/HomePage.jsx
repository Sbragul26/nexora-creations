import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const projectsRef = useRef(null);

  const roles = ['Innovator', 'Developer', 'Freelancer', 'Creator'];
  
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern React-based shopping platform with secure payment integration",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      title: "Cybersecurity Dashboard",
      description: "Real-time threat monitoring and analysis dashboard",
      image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&h=600&fit=crop",
      tech: ["Vue.js", "Python", "D3.js", "WebSocket"]
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      tech: ["React Native", "Firebase", "Blockchain"]
    },
    {
      title: "AI Analytics Platform",
      description: "Machine learning powered analytics for business intelligence",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tech: ["Python", "TensorFlow", "React", "Docker"]
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable cloud architecture for enterprise applications",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      tech: ["AWS", "Kubernetes", "Terraform", "Docker"]
    }
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "Python", "AWS"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Sarah Chen",
      role: "Cybersecurity Expert",
      skills: ["Penetration Testing", "Security Auditing", "Blockchain", "Cryptography"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Mike Rodriguez",
      role: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const slideIn = {
    hidden: { x: -60, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
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
  }, [displayText, isDeleting, currentRole]);

  // Vanta.js effect
  useEffect(() => {
    console.log('HomePage mounted, initializing Vanta.js');
    const vantaEffect = VANTA.NET({
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
      console.log('HomePage unmounting, cleaning up Vanta.js');
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const iPad = ({ project }) => {
    return (
      <motion.div 
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* iPad Shadow */}
        <div className="absolute inset-0 bg-black/20 blur-3xl transform translate-y-8 scale-95 rounded-3xl"></div>
        
        {/* iPad Body */}
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-4 shadow-2xl">
          {/* iPad Screen */}
          <div className="bg-black rounded-2xl overflow-hidden aspect-[4/3] relative">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-between px-4">
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="text-white text-xs font-mono">9:41 AM</div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3/4 h-full bg-green-500 rounded-sm"></div>
                </div>
              </div>
            </div>
            
            {/* Project Image */}
            <motion.img 
              key={project.title}
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            
            {/* Project Title Overlay */}
            <motion.div 
              className="absolute bottom-4 left-4 right-4 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h4 className="text-lg font-bold mb-1">{project.title}</h4>
              <p className="text-sm text-gray-300">{project.description}</p>
            </motion.div>
          </div>
          
          {/* Home Indicator */}
          <div className="flex justify-center mt-2">
            <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
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
      <motion.div 
        id="homeContainer" 
        className="relative min-h-screen flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="text-center z-10 px-6">
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
            Where cybersecurity meets digital innovation. We create secure, scalable solutions 
            that push the boundaries of technology.
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
        </div>
      </motion.div>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        ref={projectsRef}
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Featured Projects
          </motion.h2>
          
          <div className="flex items-center justify-center min-h-[600px] relative">
            {/* Navigation Arrows */}
            <motion.button
              onClick={prevProject}
              className="absolute left-4 z-10 w-12 h-12 bg-blue-600/20 hover:bg-blue-600/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variants={slideIn}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={nextProject}
              className="absolute right-4 z-10 w-12 h-12 bg-blue-600/20 hover:bg-blue-600/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variants={slideIn}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              {/* Project Info */}
              <motion.div 
                className="space-y-8"
                variants={slideIn}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Project Number */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-0.5 bg-blue-500"></div>
                      <span className="text-blue-400 font-mono text-lg">
                        {String(currentProject + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <h3 className="text-5xl font-bold text-white leading-tight">
                      {projects[currentProject].title}
                    </h3>
                    
                    <p className="text-gray-300 text-xl leading-relaxed max-w-lg">
                      {projects[currentProject].description}
                    </p>
                    
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-10 10M17 7H7m10 0v10" />
                        </svg>
                      </motion.button>
                      
                      <motion.button 
                        className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        View Code
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* iPad Showcase */}
              <motion.div 
                className="flex justify-center"
                variants={fadeInUp}
              >
                <div className="w-[400px]">
                  <AnimatePresence mode="wait">
                    <iPad key={currentProject} project={projects[currentProject]} />
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Project Indicators */}
          <motion.div 
            className="flex justify-center space-x-3 mt-12"
            variants={fadeInUp}
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
      </motion.section>

      {/* Team Section */}
      <motion.section 
        id="team" 
        className="py-20 bg-gray-800/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Our Team
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
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
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-12"
            variants={fadeInUp}
          >
            Ready to bring your ideas to life? Let's create something amazing together.
          </motion.p>
          
          {/* Contact Form */}
          <motion.div 
            className="max-w-lg mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
            variants={fadeInUp}
          >
            <div className="space-y-6">
              <motion.input 
                type="text" 
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.input 
                type="email" 
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.textarea 
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
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

          {/* Social Links */}
          <motion.div 
            className="mt-12"
            variants={fadeInUp}
          >
            <p className="text-gray-400 mb-6">Connect with us</p>
            <div className="flex justify-center space-x-6">
              {[
                { name: 'GitHub', icon: '📧', href: '#' },
                { name: 'LinkedIn', icon: '💼', href: '#' },
                { name: 'Twitter', icon: '🐦', href: '#' },
                { name: 'Discord', icon: '💬', href: '#' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 text-xl"
                  title={social.name}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
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