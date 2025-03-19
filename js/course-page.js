document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));
    
    // Get DOM elements
    const courseTitle = document.getElementById('courseTitle');
    const weeksList = document.getElementById('weeksList');
    const courseInfo = document.getElementById('courseInfo');
    const contentArea = document.getElementById('contentArea');
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    // Check if course ID is valid
    if (!courseId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Get course data
    const course = getCourseById(courseId);
    
    // Check if course exists
    if (!course) {
        window.location.href = 'index.html';
        return;
    }
    
    // Render course data
    renderCourse(course);
    
    // Add event listeners
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Search function
    function handleSearch() {
        const query = searchInput.value.trim();
        const results = searchInCourse(courseId, query);
        renderSearchResults(results);
    }
    
    // Render course data
    function renderCourse(course) {
        // Set course title
        courseTitle.textContent = course.title;
        
        // Update progress bar
        updateProgress(course);
        
        // Render weeks list
        renderWeeksList(course);
        
        // Render course info
        renderCourseInfo(course);
    }
    
    // Update progress bar
    function updateProgress(course) {
        const progress = calculateCourseProgress(courseId);
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${progress}%`;
    }
    
    // Render weeks list
    function renderWeeksList(course) {
        weeksList.innerHTML = '';
        
        course.weeks.forEach(week => {
            const weekItem = document.createElement('div');
            weekItem.className = 'week-item';
            
            // Create week header
            const weekHeader = document.createElement('div');
            weekHeader.className = 'week-header';
            weekHeader
