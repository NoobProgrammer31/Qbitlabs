// Sample course data
const coursesData = [
    {
        id: 1,
        title: "Statistics for Data Science I",
        status: "IMPROVEMENT",
        bookmarked: false,
        assignments: [
            { week: 1, score: "Absent" },
            { week: 2, score: 27 },
            { week: 3, score: 50 },
            { week: 4, score: 64 },
            { week: 5, score: 3 },
            { week: 6, score: 70 },
            { week: 7, score: "Absent" },
            { week: 8, score: "Absent" }
        ],
        quiz: [
            { id: 1, score: 53 }
        ],
        examEligible: true,
        weeks: [
            {
                weekNumber: 1,
                title: "Week 1",
                lessons: [
                    {
                        id: "l1-1",
                        title: "Introduction and types of Data - Basic definitions",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/video1",
                        completed: false,
                        resources: [
                            { title: "Practice Problems PDF", url: "#" }
                        ]
                    },
                    {
                        id: "aq1-1",
                        title: "Activity Questions 1",
                        type: "assignment",
                        completed: false,
                        pdfUrl: "#"
                    },
                    {
                        id: "l1-2",
                        title: "Introduction and types of Data - Understanding data",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/video2",
                        completed: false,
                        resources: [
                            { title: "Practice Problems PDF", url: "#" }
                        ]
                    },
                    {
                        id: "aq1-2",
                        title: "Activity Questions 2",
                        type: "assignment",
                        completed: false,
                        pdfUrl: "#"
                    },
                    {
                        id: "l1-3",
                        title: "Introduction and types of Data - Classification of data",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/video3",
                        completed: false,
                        resources: [
                            { title: "Practice Problems PDF", url: "#" }
                        ]
                    }
                ]
            },
            {
                weekNumber: 2,
                title: "Week 2",
                lessons: [
                    {
                        id: "l2-1",
                        title: "Measures of Central Tendency",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/video4",
                        completed: false,
                        resources: [
                            { title: "Practice Problems PDF", url: "#" }
                        ]
                    },
                    {
                        id: "aq2-1",
                        title: "Activity Questions 1",
                        type: "assignment",
                        completed: false,
                        pdfUrl: "#"
                    }
                ]
            }
        ],
        courseInfo: {
            faculty: "Prof. Usha Mohan, Department of Management Studies, IIT Madras",
            instructors: [
                "Prashant Sharma (M.Sc. Statistics, University of Delhi)",
                "Prerna Gupta (M.Sc. Statistics, University of Delhi)",
                "Swathy Sajeev (M.Sc. Statistics, University of Delhi)"
            ],
            textbooks: [
                "Introductory Statistics (4th Edition) - by Sheldon M. Ross",
                "Introductory Statistics (10th Edition) - ISBN 9780321989178, by Neil A. Weiss published by Pearson"
            ]
        }
    },
    {
        id: 2,
        title: "Mathematics for Data Science I",
        status: "REPEAT FULL COURSE",
        bookmarked: true,
        assignments: [
            { week: 1, score: "Absent" },
            { week: 2, score: 54 },
            { week: 3, score: 52 },
            { week: 4, score: 38 },
            { week: 5, score: 44 },
            { week: 6, score: 47 },
            { week: 7, score: "Absent" },
            { week: 8, score: "Absent" }
        ],
        quiz: [
            { id: 1, score: 46 }
        ],
        examEligible: true,
        weeks: [
            {
                weekNumber: 1,
                title: "Week 1",
                lessons: [
                    {
                        id: "ml1-1",
                        title: "Introduction to Linear Algebra",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/video5",
                        completed: false,
                        resources: [
                            { title: "Practice Problems PDF", url: "#" }
                        ]
                    },
                    {
                        id: "maq1-1",
                        title: "Activity Questions 1",
                        type: "assignment",
                        completed: false,
                        pdfUrl: "#"
                    }
                ]
            },
            {
                weekNumber: 2,
                title: "Week 2",
                lessons: [
                    {
                        id: "ml2-1",
                        title: "Matrices and Vectors",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/video6",
                        completed: false,
                        resources: [
                            { title: "Practice Problems PDF", url: "#" }
                        ]
                    },
                    {
                        id: "maq2-1",
                        title: "Activity Questions 1",
                        type: "assignment",
                        completed: false,
                        pdfUrl: "#"
                    }
                ]
            }
        ],
        courseInfo: {
            faculty: "Prof. Janakiraman K, Department of Mathematics, IIT Madras",
            instructors: [
                "Dr. Arun Kumar (Ph.D. Mathematics, IISc Bangalore)",
                "Meera Nair (M.Sc. Mathematics, IIT Bombay)"
            ],
            textbooks: [
                "Linear Algebra and Its Applications (5th Edition) - by David C. Lay",
                "Calculus: Early Transcendentals (8th Edition) - by James Stewart"
            ]
        }
    }
];

// Local storage functions
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Init courses data if not already in local storage
function initCoursesData() {
    if (!getFromLocalStorage('courses')) {
        saveToLocalStorage('courses', coursesData);
    }
}

// Get courses from local storage or initial data
function getCoursesData() {
    return getFromLocalStorage('courses') || coursesData;
}

// Get a specific course by ID
function getCourseById(id) {
    const courses = getCoursesData();
    return courses.find(course => course.id === parseInt(id));
}

// Update a course in local storage
function updateCourse(updatedCourse) {
    const courses = getCoursesData();
    const index = courses.findIndex(course => course.id === updatedCourse.id);
    
    if (index !== -1) {
        courses[index] = updatedCourse;
        saveToLocalStorage('courses', courses);
    }
}

// Toggle bookmark status
function toggleBookmark(courseId) {
    const course = getCourseById(courseId);
    
    if (course) {
        course.bookmarked = !course.bookmarked;
        updateCourse(course);
        return course.bookmarked;
    }
    
    return false;
}

// Mark a lesson as completed
function markLessonCompleted(courseId, lessonId, completed = true) {
    const course = getCourseById(courseId);
    
    if (course) {
        // Find the lesson in any week
        for (const week of course.weeks) {
            const lessonIndex = week.lessons.findIndex(lesson => lesson.id === lessonId);
            
            if (lessonIndex !== -1) {
                week.lessons[lessonIndex].completed = completed;
                updateCourse(course);
                return true;
            }
        }
    }
    
    return false;
}

// Calculate course progress
function calculateCourseProgress(courseId) {
    const course = getCourseById(courseId);
    
    if (course) {
        let totalLessons = 0;
        let completedLessons = 0;
        
        for (const week of course.weeks) {
            for (const lesson of week.lessons) {
                totalLessons++;
                if (lesson.completed) {
                    completedLessons++;
                }
            }
        }
        
        return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    }
    
    return 0;
}

// Search courses
function searchCourses(query) {
    if (!query) return getCoursesData();
    
    const courses = getCoursesData();
    const lowercaseQuery = query.toLowerCase();
    
    return courses.filter(course => 
        course.title.toLowerCase().includes(lowercaseQuery)
    );
}

// Search within a course
function searchInCourse(courseId, query) {
    if (!query) return [];
    
    const course = getCourseById(courseId);
    const lowercaseQuery = query.toLowerCase();
    const results = [];
    
    if (course) {
        for (const week of course.weeks) {
            for (const lesson of week.lessons) {
                if (lesson.title.toLowerCase().includes(lowercaseQuery)) {
                    results.push({
                        weekNumber: week.weekNumber,
                        lessonId: lesson.id,
                        title: lesson.title,
                        type: lesson.type
                    });
                }
            }
        }
    }
    
    return results;
}

// Initialize the data on script load
initCoursesData();
