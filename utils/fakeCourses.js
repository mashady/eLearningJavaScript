const coursesData = {
  courses: [
    {
      ID: "1",
      Title: "Introduction to Programming",
      Image: "https://nouvil.net/wp-content/uploads/2021/08/javascript.jpg",
      Category: "Programming",
      "Instructor Name": "John Doe",
      Description:
        "Learn the fundamentals of programming with hands-on exercises.",
      Price: 49.99,
      Duration: "4 weeks",
      Content: [
        {
          lesson_id: 1,
          lesson_title: "Introduction to HTML5",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          lesson_id: 2,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
        {
          lesson_id: 3,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
        {
          lesson_id: 4,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
      ],
      completedLessons: [],
      progressPercentage: 0,
    },
    {
      ID: "2",
      Title: "Advanced Web Development",
      Image: "https://i.ytimg.com/vi/1Rs2ND1ryYc/maxresdefault.jpg",
      Category: "Web Development",
      "Instructor Name": "Jane Smith",
      Description:
        "Master advanced web development techniques including frameworks and APIs.",
      Price: 79.99,
      Duration: "6 weeks",
      Content: [
        {
          lesson_id: 1,
          lesson_title: "Introduction to HTML5",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          lesson_id: 2,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
      ],
      completedLessons: [],
      progressPercentage: 0,
    },
    {
      ID: "3",
      Title: "Data Science Essentials",
      Image: "https://i.ytimg.com/vi/_a5j7KoflTs/maxresdefault.jpg",
      Category: "Data Science",
      "Instructor Name": "Alice Johnson",
      Description:
        "A comprehensive introduction to data science, including data analysis and machine learning.",
      Price: 99.99,
      Duration: "8 weeks",
      Content: [
        {
          lesson_id: 1,
          lesson_title: "Introduction to HTML5",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          lesson_id: 2,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
      ],

      completedLessons: [],
      progressPercentage: 0,
    },
    {
      ID: "4",
      Title: "Digital Marketing Basics",
      Image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqBYGjp1QAlORuYDJIod63Df4Cc-Qd-zebMlJ6ZcPiVrotTfwpy7kV7ICDoqca5yndZI&usqp=CAU",
      Category: "Marketing",
      "Instructor Name": "Michael Brown",
      Description:
        "Learn the core concepts of digital marketing, including SEO, SEM, and social media strategies.",
      Price: 59.99,
      Duration: "5 weeks",
      Content: [
        {
          lesson_id: 1,
          lesson_title: "Introduction to HTML5",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          lesson_id: 2,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
      ],
      completedLessons: [],
      progressPercentage: 0,
    },
    {
      ID: "5",
      Title: "Graphic Design Fundamentals",
      Image:
        "https://ultimatecourses.com/assets/share/courses/angular-39a525f3720f54d3fa1cbb19fdd14bd63bb33327569b6fc650001f66dbf2c8b9.png",
      Category: "Design",
      "Instructor Name": "Emily Davis",
      Description:
        "Get started with graphic design using tools like Adobe Photoshop and Illustrator.",
      Price: 69.99,
      Duration: "6 weeks",
      Content: [
        {
          lesson_id: 1,
          lesson_title: "Introduction to HTML5",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          lesson_id: 2,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
      ],
      completedLessons: [],
      progressPercentage: 0,
    },
    {
      ID: "6",
      Title: "Photography for Beginners",
      Image:
        "https://i.ytimg.com/vi/VeNfHj6MhgA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAYLTDe6Ge1G2J4Xti9l6T6ePTWvA",
      Category: "Photography",
      "Instructor Name": "David Wilson",
      Description:
        "Learn the basics of photography, including composition, lighting, and camera settings.",
      Price: 39.99,
      Duration: "3 weeks",
      Content: [
        {
          lesson_id: 1,
          lesson_title: "Introduction to HTML5",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          lesson_id: 2,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
      ],
      completedLessons: [],
      progressPercentage: 0,
    },
    {
      ID: "7",
      Title: "Introduction to Programming",
      Image: "https://nouvil.net/wp-content/uploads/2021/08/javascript.jpg",
      Category: "Programming",
      "Instructor Name": "John Doe",
      Description:
        "Learn the fundamentals of programming with hands-on exercises.",
      Price: 49.99,
      Duration: "4 weeks",
      Content: [
        {
          lesson_id: 1,
          lesson_title: "Introduction to HTML5",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          lesson_id: 2,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
        {
          lesson_id: 3,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
        {
          lesson_id: 4,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
      ],
      completedLessons: [],
      progressPercentage: 0,
    },
    {
      ID: "8",
      Title: "Introduction to Programming",
      Image: "https://nouvil.net/wp-content/uploads/2021/08/javascript.jpg",
      Category: "Programming",
      "Instructor Name": "John Doe",
      Description:
        "Learn the fundamentals of programming with hands-on exercises.",
      Price: null,
      Duration: "4 weeks",
      Content: [
        {
          lesson_id: 1,
          lesson_title: "Introduction to HTML5",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          lesson_id: 2,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
        {
          lesson_id: 3,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
        {
          lesson_id: 4,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
      ],
      completedLessons: [],
      progressPercentage: 0,
    },
    {
      ID: "9",
      Title: "Introduction to Programming",
      Image: "https://nouvil.net/wp-content/uploads/2021/08/javascript.jpg",
      Category: "Programming",
      "Instructor Name": "John Doe",
      Description:
        "Learn the fundamentals of programming with hands-on exercises.",
      Price: null,
      Duration: "4 weeks",
      Content: [
        {
          lesson_id: 1,
          lesson_title: "Introduction to HTML5",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          lesson_id: 2,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
        {
          lesson_id: 3,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
        {
          lesson_id: 4,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
      ],
      completedLessons: [],
      progressPercentage: 0,
    },
    {
      ID: "10",
      Title: "Introduction to Programming",
      Image: "https://nouvil.net/wp-content/uploads/2021/08/javascript.jpg",
      Category: "Programming",
      "Instructor Name": "John Doe",
      Description:
        "Learn the fundamentals of programming with hands-on exercises.",
      Price: null,
      Duration: "4 weeks",
      Content: [
        {
          lesson_id: 1,
          lesson_title: "Introduction to HTML5",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          lesson_id: 2,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
        {
          lesson_id: 3,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
        {
          lesson_id: 4,
          lesson_title: "Introduction to CSS3",
          lesson_duration: "30m",
          lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
        },
      ],
      completedLessons: [],
      progressPercentage: 0,
    },
  ],
};

export default coursesData;
/**
<script type="module">
      // using windows location to get the courseID
      // and from cookies get the username fo fetch courses using it
      // first get user data ==> filter by courseID
    </script>
*/
