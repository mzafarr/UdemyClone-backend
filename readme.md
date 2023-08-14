### 1. Create Course
**Endpoint:** POST `/Course/createcourse`

**Description:** This API is used to create a new course and associate it with an instructor.

**Request Body:**
- `name`: Name of the course.
- `id`: Unique identifier for the course.
- `instructorEmail`: Email of the instructor associated with the course.
- `category`: Category of the course.

**Example Request:**
```json
POST /Course/createcourse
{
  "name": "Introduction to Programming",
  "id": "course123",
  "instructorEmail": "instructor@example.com",
  "category": "Programming"
}
```

**Response:**
- 200 OK: Course created successfully.
- 400 Bad Request: Instructor not found.

**Example Response:**
```json
{
  "message": "Course is successfully added."
}
```

### 2. Enroll Course 
**Endpoint:** PUT `/Course/enrollcourse/:id`

**Description:** This API allows a student to enroll in a course.

**URL Parameters:**
- `id`: The ID of the course to enroll in.

**Request Body:**
- `studentEmail`: Email of the student enrolling in the course.

**Example Request:**
```json
PUT /Course/enrollcourse/course123
{
  "studentEmail": "student@example.com"
}
```

**Response:**
- 200 OK: Enrollment successful.
- 400 Bad Request: Course or student not found, or student is already enrolled.

**Example Response:**
```json
{
  "message": "Course is successfully enrolled."
}
```

### 3. View Course Authentication API
**Endpoint:** GET `/Course/course/:id`

**Description:** This API checks if a student is authorized to view a specific course.

**URL Parameters:**
- `id`: The ID of the course to check authorization for.

**Request Body:**
- `userEmail`: Email of the student.

**Example Request:**
```json
GET /Course/course/course123
{
  "userEmail": "student@example.com"
}
```

**Response:**
- 200 OK: Student authorized to view the course.
- 200 OK: Student not authorized to view the course.

**Example Response (Authorized):**
```json
{
  "authorized": true
}
```

### 4. Show User's Courses API
**Endpoint:** GET `/Course/courses/:userId`

**Description:** This API fetches the courses that a specific user is enrolled in.

**URL Parameters:**
- `userId`: The ID of the user whose courses are to be retrieved.

**Response:**
- 200 OK: List of courses the user is enrolled in.

**Example Response:**
```json
[
  {
    "_id": "course123",
    "name": "Introduction to Programming",
    "category": "Programming",
    "instructor": "instructorId"
  },
  // Other course objects
]
```

### 5. Search Courses API
**Endpoint:** GET `/Course/searchCourses`

**Description:** This API allows searching for courses based on a search term.

**Query Parameter:**
- `term`: The search term to match courses against.

**Response:**
- 200 OK: List of courses matching the search term.

**Example Request:**
```json
GET /Course/searchCourses?term=Programming
```

**Example Response:**
```json
[
  {
    "_id": "course123",
    "name": "Introduction to Programming",
    "category": "Programming",
    "instructor": "instructorId"
  },
  // Other course objects
]
```

### 6. Show Courses by Category API
**Endpoint:** GET `/Course/courses/:category`

**Description:** This API fetches courses based on a selected category.

**URL Parameters:**
- `category`: The category of courses to retrieve.

**Response:**
- 200 OK: List of courses in the specified category.

**Example Request:**
```json
GET /Course/courses?category=Programming
```

**Example Response:**
```json
[
  {
    "_id": "course123",
    "name": "Introduction to Programming",
    "category": "Programming",
    "instructor": "instructorId"
  },
  // Other course objects
]
```
