// DOM Elements
const themeToggle = document.getElementById('checkbox');
const body = document.body;
const courseCards = document.querySelectorAll('.course-card');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const mobileMenuToggle = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

// Course data
const courses = {
    statistics: {
        id: 'statistics',
        title: 'Statistics for Data Science I',
        tag: 'IMPROVEMENT',
        progress: 35,
        weeks: 8,
        description: 'Learn fundamental statistical concepts and techniques for data analysis.',
        modules: [
            {
                week: 1,
                title: 'Introduction to Statistics',
                lessons: [
                    { title: 'What is Statistics?', type: 'video', completed: true },
                    { title: 'Types of Data', type: 'video', completed: true },
                    { title: 'Measures of Central Tendency', type: 'video', completed: false },
                    { title: 'Week 1 Practice Problems', type: 'pdf', completed: false }
                ]
            },
            {
                week: 2,
                title: 'Probability Basics',
                lessons: [
                    { title: 'Introduction to Probability', type: 'video', completed: false },
                    { title: 'Random Variables', type: 'video', completed: false },
                    { title: 'Probability Distributions', type: 'video', completed: false },
                    { title: 'Week 2 Practice Problems', type: 'pdf', completed: false }
                ]
            },
            {
                week: 3,
                title: 'Sampling and Estimation',
                lessons: [
                    { title: 'Sampling Methods', type: 'video', completed: false },
                    { title: 'Central Limit Theorem', type: 'video', completed: false },
                    { title: 'Confidence Intervals', type: 'video', completed: false },
                    { title: 'Week 3 Practice Problems', type: 'pdf', completed: false }
                ]
            }
        ]
    },
    mathematics: {
        id: 'mathematics',
        title: 'Mathematics for Data Science I',
        tag: 'REPEAT FULL COURSE',
        progress: 20,
        weeks: 8,
        description: 'Master the essential mathematical concepts required for data science and machine learning.',
        modules: [
            {
                week: 1,
                title: 'Linear Algebra Fundamentals',
                lessons: [
                    { title: 'Vectors and Vector Spaces', type: 'video', completed: true },
                    { title: 'Matrices and Matrix Operations', type: 'video', completed: true },
                    { title: 'Linear Transformations', type: 'video', completed: false },
                    { title: 'Week 1 Practice Problems', type: 'pdf', completed: false }
                ]
            },
            {
                week: 2,
                title: 'Calculus Review',
                lessons: [
                    { title: 'Limits and Continuity', type: 'video', completed: false },
                    { title: 'Derivatives and Gradients', type: 'video', completed: false },
                    { title: 'Integrals and Applications', type: 'video', completed: false },
                    { title: 'Week 2 Practice Problems', type: 'pdf', completed: false }
                ]
            },
            {
                week: 3,
                title: 'Optimization Techniques',
                lessons: [
                    { title: 'Unconstrained Optimization', type: 'video', completed: false },
                    { title: 'Gradient Descent', type: 'video', completed: false },
                    { title: 'Constrained Optimization', type: 'video', completed: false },
                    { title: 'Week 3 Practice Problems', type: 'pdf', completed: false }
                ]
            }
        ]
    },
    python: {
        id: 'python',
        title: 'Python Programming for Data Science',
        tag: 'NEW',
        progress: 0,
        weeks: 10,
        description: 'Learn Python programming with a focus on data analysis and manipulation.',
        modules: [
            {
                week: 1,
                title: 'Python Basics',
                lessons: [
                    { title: 'Introduction to Python', type: 'video', completed: false },
                    { title: 'Variables and Data Types', type: 'video', completed: false },
                    { title: 'Control Structures', type: 'video', completed: false },
                    { title: 'Week 1 Practice Problems', type: 'pdf', completed: false }
                ]
            },
            {
                week: 2,
                title: 'Data Structures',
                lessons: [
                    { title: 'Lists and Tuples', type: 'video', completed: false },
                    { title: 'Dictionaries and Sets', type: 'video', completed: false },
                    { title: 'Comprehensions', type: 'video', completed: false },
                    { title: 'Week 2 Practice Problems', type: 'pdf', completed: false }
                ]
            },
            {
                week: 3,
                title: 'Functions and Modules',
                lessons: [
                    { title: 'Defining Functions', type: 'video', completed: false },
                    { title: 'Lambda Functions', type: 'video', completed: false },
                    { title: 'Modules and Packages', type: 'video', completed: false },
                    { title: 'Week 3 Practice Problems', type: 'pdf', completed: false }
                ]
            }
        ]
    }
};

// Initialize theme based on local storage
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }
}

// Toggle theme
function toggleTheme() {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Filter courses by search term
function filterCourses(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    
    courseCards.forEach(card => {
        const courseTitle = card.querySelector('h3').textContent.toLowerCase();
        if (courseTitle.includes(searchTerm) || searchTerm === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Create course detail page
function createCourseDetailPage(courseId) {
    const course = courses[courseId];
    if (!course) return;
    
    // Create course detail HTML
    const courseDetailHTML = `
        <section class="course-detail">
            <div class="container">
                <div class="course-header-detail">
                    <h2>${course.title}</h2>
                    <span class="course-tag">${course.tag}</span>
                </div>
                <div class="course-progress-detail">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${course.progress}%;"></div>
                    </div>
                    <span class="progress-text">${course.progress}% Complete</span>
                </div>
                <div class="course-description">
                    <p>${course.description}</p>
                </div>
                <div class="course-content">
                    ${createModulesHTML(course.modules)}
                </div>
                <div class="course-actions">
                    <button class="btn-primary back-to-courses">Back to Courses</button>
                </div>
            </div>
        </section>
    `;
    
    // Replace main content with course detail
    document.querySelector('main').innerHTML = courseDetailHTML;
    
    // Add event listeners for modules
    document.querySelectorAll('.module-header').forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Add event listener for back button
    document.querySelector('.back-to-courses').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Add event listeners for lesson checkboxes
    document.querySelectorAll('.lesson-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateProgress(courseId);
        });
    });
}

// Create modules HTML
function createModulesHTML(modules) {
    let html = '<div class="modules-container">';
    
    modules.forEach(module => {
        html += `
            <div class="module">
                <div class="module-header">
                    <h3><span class="week-number">Week ${module.week}</span> ${module.title}</h3>
                    <span class="module-toggle"><i class="fas fa-chevron-down"></i></span>
                </div>
                <div class="module-content">
                    <ul class="lesson-list">
                        ${createLessonsHTML(module.lessons)}
                    </ul>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Create lessons HTML
function createLessonsHTML(lessons) {
    let html = '';
    
    lessons.forEach((lesson, index) => {
        const iconClass = lesson.type === 'video' ? 'fas fa-video' : 'fas fa-file-pdf';
        html += `
            <li class="lesson-item">
                <div class="lesson-checkbox-container">
                    <input type="checkbox" id="lesson-${index}" class="lesson-checkbox" ${lesson.completed ? 'checked' : ''}>
                    <label for="lesson-${index}"></label>
                </div>
                <div class="lesson-content">
                    <span class="lesson-title"><i class="${iconClass}"></i> ${lesson.title}</span>
                    <span class="lesson-type">${lesson.type === 'video' ? 'Video' : 'PDF Exercise'}</span>
                </div>
            </li>
        `;
    });
    
    return html;
}

// Update progress when lesson is completed
function updateProgress(courseId) {
    const course = courses[courseId];
    const checkboxes = document.querySelectorAll('.lesson-checkbox');
    const totalLessons = checkboxes.length;
    let completedLessons = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            completedLessons++;
        }
    });
    
    const newProgress = Math.round((completedLessons / totalLessons) * 100);
    course.progress = newProgress;
    
    // Update progress bar
    document.querySelector('.progress').style.width = `${newProgress}%`;
    document.querySelector('.progress-text').textContent = `${newProgress}% Complete`;
    
    // Save progress to local storage
    saveProgress(courseId, newProgress);
}

// Save progress to local storage
function saveProgress(courseId, progress) {
    const savedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    savedProgress[courseId] = progress;
    localStorage.setItem('courseProgress', JSON.stringify(savedProgress));
}

// Load progress from local storage
function loadProgress() {
    const savedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    
    Object.keys(savedProgress).forEach(courseId => {
        if (courses[courseId]) {
           courses[courseId].progress = savedProgress[courseId];
            const courseCard = document.querySelector(`[data-course-id="${courseId}"]`);
            if (courseCard) {
                courseCard.querySelector('.progress').style.width = `${savedProgress[courseId]}%`;
                courseCard.querySelector('.progress-text').textContent = `${savedProgress[courseId]}% Complete`;
            }
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('show');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Load progress from local storage
    loadProgress();
    
    // Theme toggle
    themeToggle.addEventListener('change', toggleTheme);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        filterCourses(this.value);
    });
    
    searchButton.addEventListener('click', function() {
        filterCourses(searchInput.value);
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Course cards click
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            if (courseId && courses[courseId]) {
                // Here, we would typically navigate to a course page
                // For the MVP, we'll dynamically create the course page
                createCourseDetailPage(courseId);
            }
        });
    });
});
