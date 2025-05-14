const courses = [
  {
    id: 1,
    header: "Interactive Lessons",
    courses: [
      {
        courseName: "Interactive Math Learning",
        id: "Interactive-Math-Learning",
        feeStructure: {
          monthly: "$19.99",
          annual: "$199.99",
          discount: "Save 20% on annual"
        },
        keyFeatures: [
          "Fun quizzes and interactive activities",
          "Self-paced learning",
          "Includes videos and hands-on challenges",
          "Tracks progress and achievements"
        ],
        rating: 4.5,
        numberOfUsersEnrolled: 1500,
        teacherType: "Experienced Educators & Interactive Content Creators",
        courseType: "Self-paced",
        enrollButtonEnabled: false
      },
      {
        courseName: "Interactive Science Exploration",
        id: "Interactive-Science-Exploration",
        feeStructure: {
          monthly: "$22.99",
          annual: "$229.99",
          discount: "Save 15% on annual"
        },
        keyFeatures: [
          "Interactive experiments and quizzes",
          "Real-world scientific examples",
          "Video tutorials and progressive learning",
          "Self-paced with feedback"
        ],
        rating: 4.7,
        numberOfUsersEnrolled: 1200,
        teacherType: "Qualified Science Educators",
        courseType: "Self-paced",
        enrollButtonEnabled: false
      },
      {
        courseName: "Interactive Language Arts",
        id: "Interactive-Language-Arts",
        feeStructure: {
          monthly: "$18.99",
          annual: "$179.99",
          discount: "Save 10% on annual"
        },
        keyFeatures: [
          "Comprehensive language arts curriculum",
          "Interactive grammar and writing exercises",
          "Progressive learning paths",
          "Worksheets and quizzes"
        ],
        rating: 4.3,
        numberOfUsersEnrolled: 2000,
        teacherType: "Certified Language Arts Educators",
        courseType: "Instructor-led",
        enrollButtonEnabled: false
      }
    ]
  },
  {
    id: 2,
    header: "Virtual Educational Games",
    courses: [
      {
        courseName: "Math Games Adventure",
        id: "Math-Games-Adventure",
        feeStructure: {
          monthly: "$14.99",
          annual: "$149.99",
          discount: "Save 10% on annual"
        },
        keyFeatures: [
          "Math games that build skills in arithmetic, algebra, and geometry",
          "Designed for ages 7-12",
          "Interactive challenges and rewards system",
          "Self-paced learning with progress tracking"
        ],
        rating: 4.6,
        numberOfUsersEnrolled: 800,
        teacherType: "Interactive Content Creators",
        courseType: "Self-paced",
        enrollButtonEnabled: false
      },
      {
        courseName: "Science Quiz Master",
        id: "Science-Quiz-Master",
        feeStructure: {
          monthly: "$17.99",
          annual: "$179.99",
          discount: "Save 15% on annual"
        },
        keyFeatures: [
          "Science-based quiz games covering biology, physics, and chemistry",
          "Fun and engaging quizzes",
          "Perfect for all ages",
          "Tracks user performance"
        ],
        rating: 4.8,
        numberOfUsersEnrolled: 650,
        teacherType: "Game-Based Learning Creators",
        courseType: "Self-paced",
        enrollButtonEnabled: false
      }
    ]
  },
  {
    id: 3,
    header: "Language Learning",
    courses: [
      {
        courseName: "Spanish for Kids",
        id: "Spanish-for-Kids",
        feeStructure: {
          monthly: "$19.99",
          annual: "$199.99",
          discount: "Save 20% on annual"
        },
        keyFeatures: [
          "Learn Spanish with interactive videos and quizzes",
          "Beginner to intermediate level",
          "Fun activities and language immersion",
          "Cultural experiences included"
        ],
        rating: 4.7,
        numberOfUsersEnrolled: 1300,
        teacherType: "Native Spanish Speakers",
        courseType: "Instructor-led",
        enrollButtonEnabled: false
      },
      {
        courseName: "French Fun Learning",
        id: "French-Fun-Learning",
        feeStructure: {
          monthly: "$21.99",
          annual: "$219.99",
          discount: "Save 10% on annual"
        },
        keyFeatures: [
          "Interactive French lessons for beginners",
          "Cultural immersion activities",
          "Vocabulary building and listening exercises",
          "Self-paced with periodic assessments"
        ],
        rating: 4.5,
        numberOfUsersEnrolled: 900,
        teacherType: "Certified French Educators",
        courseType: "Instructor-led",
        enrollButtonEnabled: false
      }
    ]
  }
];

export default courses;