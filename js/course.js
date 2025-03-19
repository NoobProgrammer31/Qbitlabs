// DOM Elements
const courseContent = document.getElementById('course-content');
const themeToggle = document.getElementById('checkbox');
const body = document.body;
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const mobileMenuToggle = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

// Get course ID from URL
function getCourseIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

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

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('show');
}

// Load course details
function loadCourseDetails(courseId) {
    // In a real application, you would fetch this from a server
    // For this MVP, we'll use the sample data
    const course = courses[courseId];
    
    if (!course) {
        courseContent.innerHTML = `
            <div class="container">
                <div class="error-message">
                    <h2>Course Not Found</h2>
                    <p>The course you're looking for doesn't exist.</p>
                    <a href="index.html" class="btn-primary">Back to Home</a>
                </div>
            </div>
        `;
        return;
    }
    
    document.title = `${course.title} | EduMaster`;
    
    courseContent.innerHTML = `
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
                    <div class="modules-container">
                        ${course.modules.map((module, index) => `
                            <div class="module">
                                <div class="module-header" data-module="${index}">
                                    <h3><span class="week-number">Week ${module.week}</span> ${module.title}</h3>
                                    <span class="module-toggle"><i class="fas fa-chevron-down"></i></span>
                                </div>
                                <div class="module-content">
                                    <ul class="lesson-list">
                                        ${module.lessons.map((lesson, lessonIndex) => `
                                            <li class="lesson-item">
                                                <div class="lesson-checkbox-container">
                                                    <input type="checkbox" id="lesson-${index}-${lessonIndex}" class="lesson-checkbox" data-lesson="${index}-${lessonIndex}" ${lesson.completed ? 'checked' : ''}>
                                                    <label for="lesson-${index}-${lessonIndex}"></label>
                                                </div>
                                                <div class="lesson-content">
                                                    <span class="lesson-title"><i class="${lesson.type === 'video' ? 'fas fa-video' : 'fas fa-file-pdf'}"></i> ${lesson.title}</span>
                                                    <span class="lesson-type">${lesson.type === 'video' ? 'Video' : 'PDF Exercise'}</span>
                                                </div>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="course-actions">
                    <a href="index.html" class="btn-primary">Back to Courses</a>
                </div>
            </div>
        </section>
    `;
    
    // Add event listeners for module headers
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
    
    // Add event listeners for lesson checkboxes
    document.querySelectorAll('.lesson-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateLessonStatus(courseId, this.getAttribute('data-lesson'), this.checked);
        });
    });
    
    // Open first module by default
    const firstModuleHeader = document.querySelector('.module-header');
    if (firstModuleHeader) {
        firstModuleHeader.click();
    }
}

// Update lesson status
function updateLessonStatus(courseId, lessonId, completed) {
    // In a real application, you would update this on the server
    // For this MVP, we'll update the local data
    const [moduleIndex, lessonIndex] = lessonId.split('-').map(Number);
    courses[courseId].modules[moduleIndex].lessons[lessonIndex].completed = completed;
    
    // Update progress
    updateProgress(courseId);
    
    // Save to local storage
    saveLessonStatus(courseId);
}

// Update course progress
function updateProgress(courseId) {
    const course = courses[courseId];
    let totalLessons = 0;
    let completedLessons = 0;
    
    course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
            totalLessons++;
            if (lesson.completed) {
                completedLessons++;
            }
        });
    });
    
    const progress = Math.round((completedLessons / totalLessons) * 100);
    course.progress = progress;
    
    // Update UI
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    if (progressBar && progressText) {
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}% Complete`;
    }
    
    // Save progress to local storage
    saveProgress(courseId, progress);
}

// Save lesson status to local storage
function saveLessonStatus(courseId) {
    const course = courses[courseId];
    localStorage.setItem(`course_${courseId}_lessons`, JSON.stringify(course.modules));
}

// Save progress to local storage
function saveProgress(courseId, progress) {
    const savedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    savedProgress[courseId] = progress;
    localStorage.setItem('courseProgress', JSON.stringify(savedProgress));
}

// Load lesson status from local storage
function loadLessonStatus(courseId) {
    const savedLessons = localStorage.getItem(`course_${courseId}_lessons`);
    if (savedLessons) {
        courses[courseId].modules = JSON.parse(savedLessons);
    }
}

// Filter lessons by search term
function filterLessons(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    
    const lessonItems = document.querySelectorAll('.lesson-item');
    lessonItems.forEach(item => {
        const lessonTitle = item.querySelector('.lesson-title').textContent.toLowerCase();
        if (lessonTitle.includes(searchTerm) || searchTerm === '') {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Also expand all modules when searching
    if (searchTerm !== '') {
        document.querySelectorAll('.module-header:not(.active)').forEach(header => {
            header.click();
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Theme toggle
    themeToggle.addEventListener('change', toggleTheme);
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        filterLessons(this.value);
    });
    
    searchButton.addEventListener('click', function() {
        filterLessons(searchInput.value);
    });
    
    // Load course details
    const courseId = getCourseIdFromUrl();
    if (courseId) {
        loadLessonStatus(courseId);
        loadCourseDetails(courseId);
    } else {
        window.location.href = 'index.html';
    }
});
