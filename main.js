// DOM Elements
const preloader = document.querySelector('.preloader');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu-item');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitText = document.getElementById('submit-text');
const submitLoading = document.getElementById('submit-loading');
const currentYear = document.getElementById('current-year');
const projectGrid = document.getElementById('project-grid');
const frontendSkillsGrid = document.getElementById('frontend-skills');
const backendSkillsGrid = document.getElementById('backend-skills');
const mobileSkillsGrid = document.getElementById('mobile-skills');
const toolsSkillsGrid = document.getElementById('tools-skills');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const typewriterElement = document.getElementById('typewriter');
const filterButtons = document.querySelectorAll('.filter-btn');
const backToTop = document.getElementById('back-to-top');
const appScreens = document.querySelectorAll('.app-screen');
const screenDots = document.querySelectorAll('.screen-dot');
const popupMessage = document.getElementById('popup-message');

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
            
            // Start animations after preloader is hidden
            animateHero();
        }, 500);
    }, 1500);
});

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Check for saved theme preference or use system preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
    body.classList.add('dark');
    updateRgbValues();
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    
    // Update RGB values and restart particle animation
    updateRgbValues();
    initParticles();
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // Animate elements on scroll
    animateOnScroll();
});

// Back to top button
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

// Close mobile menu when clicking a menu item
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    submitText.style.display = 'none';
    submitLoading.style.display = 'block';

    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
            },
        });

        if (response.ok) {
            // Show success popup
            popupMessage.classList.remove('hidden');
            setTimeout(() => {
                popupMessage.classList.add('hidden');
            }, 5000);

            // Reset form
            contactForm.reset();
        } else {
            alert('Oops! Something went wrong. Please try again.');
        }
    } catch (error) {
        alert('Oops! Something went wrong. Please try again.');
    } finally {
        // Hide loading state
        submitText.style.display = 'block';
        submitLoading.style.display = 'none';
    }
});

// Tab Functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
        
        // Animate skill progress bars
        animateSkillProgress();
    });
});

// Project Filters
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        // Filter projects
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                project.style.display = 'flex';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

// App Showcase Screen Slider
let currentScreen = 0;

function showScreen(index) {
    appScreens.forEach(screen => screen.classList.remove('active'));
    screenDots.forEach(dot => dot.classList.remove('active'));
    
    appScreens[index].classList.add('active');
    screenDots[index].classList.add('active');
}

screenDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentScreen = index;
        showScreen(currentScreen);
    });
});

// Auto change app screens
setInterval(() => {
    currentScreen = (currentScreen + 1) % appScreens.length;
    showScreen(currentScreen);
}, 3000);

// Scroll Animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translate(0)';
            element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }
    });
};

// Hero Animation
const animateHero = () => {
    const elements = document.querySelectorAll('.animate-fade-up');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }, index * 200);
    });
    
    // Animate hero image
    setTimeout(() => {
        const heroImage = document.querySelector('.animate-fade-left');
        if (heroImage) {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
            heroImage.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }
    }, elements.length * 200);
};

// Typewriter Effect
const typewriterTexts = ["Flutter Developer", "Web Developer", "UI/UX Designer", "Backend Developer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;
let deletingDelay = 50;
let newTextDelay = 1000;

function typeWriter() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = deletingDelay;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
    }
    
    setTimeout(typeWriter, typingDelay);
}

// Particle Background
let canvas, ctx, particles = [];
const particleCount = 100;

function initParticles() {
    canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    animateParticles();
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--particle-color');
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--particle-line-color');
                ctx.globalAlpha = 0.2 - (distance / 750);
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

// Skill Progress Animation
function animateSkillProgress() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, 300);
    });
}

// Project Data
const projects = [
    {
        title: "Mandisetu",
        category: "mobile",
        description: "Mandisetu is a one-stop solution for farmers, traders, wholesalers, retailers, and mandivyaparis to seamlessly buy and sell agricultural and agro-produce commodities.",
        image: "images/projects/mandisetu.png",
        technologies: ["Flutter", "Dart" ,"Firebase", "MVVM", "API Integration"],
        button1: {
            icon: "fas fa-play", // FontAwesome or custom icon class
            text: "Play Store",
            link: "https://play.google.com/store/apps/details?id=com.mandisetu.app.mandisetu"
        },
        button2: {
            icon: "fab fa-github", // FontAwesome or custom icon class
            text: "Source Code",
            link: "https://github.com/byAtulJain"
        }
    },
    {
        title: "Passcode Vault",
        category: "mobile",
        description: "Protect your valuable credentials with Passcode Vault, a secure and encrypted vault designed to store passwords, login details, and sensitive information effortlessly.",
        image: "images/projects/passcode.png",
        technologies: ["Flutter", "Dart", "Eyncryption", "Storage Sense", "Local Storage"],
        button1: {
            icon: "fas fa-play", // FontAwesome or custom icon class
            text: "Play Store",
            link: "https://play.google.com/store/apps/details?id=com.passcode.manager"
        },
        button2: {
            icon: "fab fa-github", // FontAwesome or custom icon class
            text: "Source Code",
            link: "https://github.com/byAtulJain/Passcode-Vault"
        }
    },
    {
        title: "kalpavriksha",
        category: "mobile",
        description: "Developed a progress tracking application for Kalprakash Institute, enabling parents to monitor the detailed progress of students preparing for JEE/NEET. The app provides real-time performance reports and insights.",
        image: "images/projects/kalpavirsha.png",
        technologies: ["Flutter", "Dart" ,"Firebase", "MVVM", "API Integration","Clean Code"],

        button1: {
            icon: "fas fa-play", // FontAwesome or custom icon class
            text: "Coming Soon",
            link: "https://play.google.com/store/apps/details?id=com.kpvs.app.kpvs"
        },
        button2: {
            icon: "fab fa-github", // FontAwesome or custom icon class
            text: "Source Code",
            link: "https://github.com/byAtulJain"
        }
    },
    {
        title: "SettledIn - All You Need to Settle in Style",
        category: "mobile",
        description: "SettledIn is a comprehensive platform designed to facilitate the onboarding experience for newcomers to Indore by providing a centralized solution to connect with essential services such as accommodations, tuitions, and utilities.",
        image: "images/projects/settledin.png",
        technologies: ["Flutter", "Dart" ,"Firebase", "Google Map Integration"],
        button1: {
            icon: "fas fa-download", // FontAwesome or custom icon class
            text: "Download APK",
            link: "https://drive.google.com/file/d/1XPG_YmgLIV-22uZtAgRTK97-z_hlnsi0/view"
        },
        button2: {
            icon: "fab fa-github", // FontAwesome or custom icon class
            text: "Source Code",
            link: "https://github.com/byAtulJain/SettledIn"
        }
    },
    {
        title: "Alertify - Your Comprehensive Broadcast Destination",
        category: "mobile",
        description: "Alertify is a mobile application designed to streamline communication between college faculties and students by serving as a centralized broadcast destination for notifications, event reminders, and academic information.",
        image: "images/projects/alertify.jpg",
        technologies: ["Flutter", "Dart" ,"Firebase", "Authentication"],
        button1: {
            icon: "fas fa-download", // FontAwesome or custom icon class
            text: "Download APK",
            link: "https://drive.google.com/file/d/1cC7oN2T86mIsBh8eRka-r5eys7bfk_nR/view?usp=drive_link"
        },
        button2: {
            icon: "fab fa-github", // FontAwesome or custom icon class
            text: "Source Code",
            link: "https://github.com/byAtulJain/Alertify"
        }
    },
    {
        title: "The AC On Rent",
        category: "web",
        description: "Designed a professional AC product showcase website where clients can easily upload their AC products. Users can browse the products, explore detailed specifications, and submit inquiries directly through the website, ensuring a seamless and user-friendly experience.",
        image: "images/projects/theaconrent.png",
        technologies: ["Flutter", "Dart" ,"Firebase", "Authentication", "Firebase Storage"],
        button1: {
            icon: "fas fa-external-link", // FontAwesome or custom icon class
            text: "Live Demo",
            link: "https://theaconrent.com/"
        },
        button2: {
            icon: "fab fa-github", // FontAwesome or custom icon class
            text: "Source Code",
            link: "https://github.com/byAtulJain/AC-Rent"
        }
    },
    {
        title: "Logic Loop",
        category: "web",
        description: "Logic Loops is a web-application that's designed to assist individuals in becoming proficient in programming and competitive coding. It accomplishes this by offering easy-to-use and interactive educational materials and tools.",
        image: "images/projects/logicloop.png",
        technologies: ["HTML", "CSS" ,"Javascript", "Django", "On Compiler", "python"],
        button1: {
            icon: "fas fa-external-link", // FontAwesome or custom icon class
            text: "Live Demo",
            link: "#"
        },
        button2: {
            icon: "fab fa-github", // FontAwesome or custom icon class
            text: "Source Code",
            link: "https://github.com/byAtulJain/LopicLoop-Master"
        }
    },
    {
        title: "Acro Movie",
        category: "mobile",
        description: "Developed a movie download application that allows users to browse, search, and download movies seamlessly. Implemented a user-friendly interface with fast download speeds and secure access.",
        image: "images/projects/acromovie.png",
        technologies: ["Flutter", "Dart" ,"Firebase", "Authentication", "Firebase Storage"],
        button1: {
            icon: "fas fa-download", // FontAwesome or custom icon class
            text: "Download APK",
            link: "https://drive.google.com/file/d/1RjO080YTYxxEkH6HV4QKuVEdTiG5oOFx/view"
        },
        button2: {
            icon: "fab fa-github", // FontAwesome or custom icon class
            text: "Source Code",
            link: "https://github.com/byAtulJain/movie_app"
        }
    },
    {
        title: "BMI Calculator",
        category: "ui",
        description: "Developed a BMI calculator application that allows users to calculate their Body Mass Index (BMI) and provides health recommendations based on the results",
        image: "images/projects/bmi.png",
        technologies: ["Figma", "Flutter", "Dart"],
        button1: {
            icon: "fas fa-download", // FontAwesome or custom icon class
            text: "Download APK",
            link: "https://drive.google.com/file/d/16OyXhKXk80hRTWV_Tuu-XWXrqcSaaOFl/view"
        },
        button2: {
            icon: "fab fa-github", // FontAwesome or custom icon class
            text: "Source Code",
            link: "https://github.com/byAtulJain/bmi-calculator"
        }
    },
];

// Skills Data

const mobileSkills = [
    { name: "Flutter", level: 92, icon: "images/skills/flutter.png" },
    { name: "Dart", level: 90, icon: "images/skills/dart.png" },
];
const frontendSkills = [
    { name: "HTML5", level: 95, icon: "images/skills/html.png" },
    { name: "CSS3", level: 90, icon: "images/skills/css.png" },
    { name: "BOOTSTRAP", level: 90, icon: "images/skills/bootstrap.png" },

];

const backendSkills = [
    { name: "Firebase", level: 88, icon: "images/skills/firebase.png" },
    { name: "FastAPI", level: 88, icon: "images/skills/fastapi.png" },
    { name: "PostgresSQL", level: 80, icon: "images/skills/postgres.png" },
    { name: "Azure", level: 95, icon: "images/skills/azure.png" },
];



const toolSkills = [
    { name: "C", level: 90, icon: "images/skills/c.png" },
    { name: "C++", level: 90, icon: "images/skills/cplus.png" },
    { name: "Git", level: 90, icon: "images/skills/git.png" },
    { name: "Github", level: 90, icon: "images/skills/github.png" },
    { name: "Figma", level: 85, icon: "images/skills/figma.png" },
    { name: "VS Code", level: 95, icon: "images/skills/vscode.png" },
    { name: "Android Studio", level: 95, icon: "images/skills/android.png" },
    { name: "Docker", level: 75, icon: "images/skills/docker.png" },
    { name: "Blogger", level: 95, icon: "images/skills/blogger.png" },
    { name: "Wordpress", level: 95, icon: "images/skills/wordpress.png" },
    { name: "Postman", level: 88, icon: "images/skills/postman.png" },
    { name: "Ubuntu", level: 95, icon: "images/skills/ubuntu.png" },

];

// Render Projects
function renderProjects() {
    projectGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card reveal-up';
        projectCard.dataset.category = project.category;
        projectCard.style.transitionDelay = `${index * 0.1}s`;
        
        projectCard.innerHTML = `
            <div class="project-image">
                <div class="project-image-overlay">
                    <div class="project-overlay-links">
                        <a href="${project.button1.link}" target="_blank" rel="noopener noreferrer" class="project-overlay-link">
                            <i class="${project.button1.icon}"></i>
                        </a>
                        <a href="${project.button2.link}" target="_blank" rel="noopener noreferrer" class="project-overlay-link">
                            <i class="${project.button2.icon}"></i>
                        </a>
                    </div>
                </div>
                <span class="project-category">${getCategoryName(project.category)}</span>
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-footer">
                    <a href="${project.button1.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="${project.button1.icon}"></i> ${project.button1.text}
                    </a>
                    <a href="${project.button2.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="${project.button2.icon}"></i> ${project.button2.text}
                    </a>
                </div>
            </div>
        `;
        
        projectGrid.appendChild(projectCard);
    });
}


function getCategoryName(category) {
    switch(category) {
        case 'web': return 'Web App';
        case 'mobile': return 'Mobile App';
        case 'ui': return 'UI/UX Design';
        default: return 'Project';
    }
}

// Render Skills
function renderSkills(skills) {
    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = '';

    skills.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card reveal-up';
        skillCard.style.transitionDelay = `${index * 0.1}s`;

        skillCard.innerHTML = `
            <div class="skill-icon">
                <img src="${skill.icon}" alt="${skill.name}">
            </div>
            <h4 class="skill-name">${skill.name}</h4>
        `;

        skillsGrid.appendChild(skillCard);
    });
}

// Update RGB values for CSS variables
function updateRgbValues() {
    if (body.classList.contains('dark')) {
        document.documentElement.style.setProperty('--primary-rgb', '76, 201, 240');
        document.documentElement.style.setProperty('--primary-light-rgb', '114, 9, 183');
        document.documentElement.style.setProperty('--secondary-rgb', '247, 37, 133');
        document.documentElement.style.setProperty('--background-rgb', '18, 18, 18');
    } else {
        document.documentElement.style.setProperty('--primary-rgb', '67, 97, 238');
        document.documentElement.style.setProperty('--primary-light-rgb', '114, 9, 183');
        document.documentElement.style.setProperty('--secondary-rgb', '247, 37, 133');
        document.documentElement.style.setProperty('--background-rgb', '255, 255, 255');
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    // Update RGB values
    updateRgbValues();
    
    // Render projects and skills
    renderProjects();
    const allSkills = [...mobileSkills,...frontendSkills, ...backendSkills,  ...toolSkills];
    renderSkills(allSkills);
    
    // Start animations
    typeWriter();
    initParticles();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Add resize event listener for canvas
    window.addEventListener('resize', () => {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }
    });
    
    // Add intersection observer for skill progress bars
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillProgress();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});
