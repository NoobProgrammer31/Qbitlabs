document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const coursesContainer = document.getElementById('coursesContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    // Render all courses on page load
    renderCourses(getCoursesData());
    
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
        const results = searchCourses(query);
        renderCourses(results);
    }
    
    // Render course cards
    function renderCourses(courses) {
        coursesContainer.innerHTML = '';
        
        if (courses.length === 0) {
            coursesContainer.innerHTML = '<p>No courses found. Try a different search term.</p>';
            return;
        }
        
        courses.forEach(course => {
            // Create course card
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            
            // Calculate progress
            const progress = calculateCourseProgress(course.id);
            
            // Create card HTML
            courseCard.innerHTML = `
                <div class="course-header">
                    <h3>${course.title}</h3>
                    <div>${course.status}</div>
                    <button class="bookmark-btn" data-id="${course.id}">
                        <i class="fas ${course.bookmarked ? 'fa-bookmark' : 'fa-bookmark-o'}"></i>
                    </button>
                </div>
                <div class="course-body">
                    <div class="progress-container">
                        <div class="progress-label">Progress: ${progress}%</div>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${progress}%"></div>
                        </div>
                    </div>
                    <ul class="assignment-list">
                        ${course.assignments.map(assignment => 
                            `<li>Week ${assignment.week} Assignment - ${assignment.score}</li>`
                        ).join('')}
                    </ul>
                    <div class="quiz-result">
                        Quiz 1 - ${course.quiz[0].score}
                    </div>
                    <div class="exam-status">
                        Allowed to take End Term Exam?<br>
                        <strong>${course.examEligible ? 'Yes' : 'No'}</strong>
                    </div>
                </div>
                <div class="course-footer">
                    <a href="course-page.html?id=${course.id}" class="course-link">Go to Course page ></a>
                </div>
            `;
            
            coursesContainer.appendChild(courseCard);
            
            // Add event listener to bookmark button
            const bookmarkBtn = courseCard.querySelector('.bookmark-btn');
            bookmarkBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const courseId = parseInt(this.getAttribute('data-id'));
                const bookmarked = toggleBookmark(courseId);
                
                // Update icon
                const icon = this.querySelector('i');
                if (bookmarked) {
                    icon.classList.remove('fa-bookmark-o');
                    icon.classList.add('fa-bookmark');
                } else {
                    icon.classList.remove('fa-bookmark');
                    icon.classList.add('fa-bookmark-o');
                }
            });
        });
    }
});
