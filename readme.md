# API Documentation

## Base URL

```
https://api.yourdomain.com
```

## Endpoints

### Authentication Guide

To obtain an authentication token, make a `POST` request to the following endpoint:

**Endpoint:**

```
POST /User/signin
```

**Request Body:**

```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

**Response:**

```json
{
  "message": "Successfully signed in",
  "token": "your_auth_token",
  "email": "your_email@example.com"
}
```

### Create User (Signup)

Creates a new user account.

**Endpoint:**

```
POST /User/signup
```

**Request Body:**

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "user_password",
  "type": "student"
}
```

**Response:**

```json
{
  "message": "User registered successfully"
}
```

### List Courses by User

Retrieve courses associated with a specific user.

**Endpoint:**

```
GET /Course/courses/:userId
```

**Parameters:**

- `userId` (required): The ID of the user.

**Response:**

```json
[
  {
    "id": "course_id",
    "name": "Course Name",
    "description": "Course Description",
    // ... other fields
  },
  // ... other courses
]
```

### Search Courses

Search for courses based on a search query.

**Endpoint:**

```
GET /Course/searchCourses?query=search_term
```

**Parameters:**

- `query` (optional): The search query.

**Response:**

```json
[
  {
    "id": "course_id",
    "name": "Course Name",
    "description": "Course Description",
    // ... other fields
  },
  // ... other courses
]
```

### Get Course Details

Retrieve details of a specific course.

**Endpoint:**

```
GET /Course/course/:id
```

**Parameters:**

- `id` (required): The ID of the course.

**Response:**

```json
{
  "id": "course_id",
  "name": "Course Name",
  "description": "Course Description",
  // ... other fields
}
```

### Enroll Course

Enroll a student in a course.

**Endpoint:**

```
PUT /Course/enrollcourse/:id
```

**Parameters:**

- `id` (required): The ID of the course.

**Request Body:**

```json
{
  "studentEmail": "student@example.com"
}
```

**Response:**

```json
{
  "message": "Course is successfully enrolled."
}
```

### Add Course for Instructor

Add a course for an instructor.

**Endpoint:**

```
PUT /Course/addcourse/:id
```

**Parameters:**

- `id` (required): The ID of the course.

**Request Body:**

```json
{
  "instructorEmail": "instructor@example.com"
}
```

**Response:**

```json
{
  "message": "Course is successfully added."
}
```

## Error Handling

In case of errors, the API will return appropriate HTTP status codes along with error details in the response body.

- `400 Bad Request`: Invalid request format or missing required fields.
- `401 Unauthorized`: Authentication token is missing or invalid.
- `403 Forbidden`: Access to the resource is not allowed.
- `404 Not Found`: The requested resource does not exist.
- `500 Internal Server Error`: An unexpected error occurred on the server.

# Example API Calls
Of course! I've included example codes for each endpoint in the documentation. Here's the updated documentation in Markdown format with the example codes:

```markdown
# API Documentation

Welcome to the documentation for the **Course Management API**. This guide provides detailed information on how to use the API endpoints. It is intended for frontend developers to integrate the API into their applications seamlessly.

## Base URL

```
https://api.yourdomain.com
```

## Endpoints

### Authentication Guide

To obtain an authentication token, make a `POST` request to the following endpoint:

**Endpoint:**

```
POST /User/signin
```

**Request Body:**

```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

**Example API Call using JavaScript Fetch:**

```javascript
const signInData = {
  email: "user@example.com",
  password: "user_password"
};

fetch('<your_base_url>/User/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(signInData)
})
.then(response => response.json())
.then(data => {
  const authToken = data.token;
  console.log('Authentication token:', authToken);
})
.catch(error => {
  console.error('Error:', error);
});
```

### Create User (Signup)

Creates a new user account.

**Endpoint:**

```
POST /User/signup
```

**Request Body:**

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "user_password",
  "type": "student"
}
```

**Example API Call using JavaScript Fetch:**

```javascript
const signUpData = {
  name: "User Name",
  email: "user@example.com",
  password: "user_password",
  type: "student"
};

fetch('<your_base_url>/User/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(signUpData)
})
.then(response => response.json())
.then(data => {
  console.log('Response:', data.message);
})
.catch(error => {
  console.error('Error:', error);
});
```

# Example API Calls
1. **Authentication: Sign In**

```javascript
const signInData = {
  email: "user@example.com",
  password: "user_password"
};

fetch('<your_base_url>/User/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(signInData)
})
.then(response => response.json())
.then(data => {
  const authToken = data.token;
  console.log('Authentication token:', authToken);
})
.catch(error => {
  console.error('Error:', error);
});
```

2. **Create User (Signup)**

```javascript
const signUpData = {
  name: "User Name",
  email: "user@example.com",
  password: "user_password",
  type: "student"
};

fetch('<your_base_url>/User/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(signUpData)
})
.then(response => response.json())
.then(data => {
  console.log('Response:', data.message);
})
.catch(error => {
  console.error('Error:', error);
});
```

3. **List Courses by User**

```javascript
const userId = 'user_id'; // Replace with the actual user ID

fetch(`<your_base_url>/Course/courses/${userId}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer <your_auth_token>`
  }
})
.then(response => response.json())
.then(courses => {
  console.log('Courses:', courses);
})
.catch(error => {
  console.error('Error:', error);
});
```

4. **Search Courses**

```javascript
const searchTerm = 'programming';

fetch(`<your_base_url>/Course/searchCourses?term=${searchTerm}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer <your_auth_token>`
  }
})
.then(response => response.json())
.then(courses => {
  console.log('Courses:', courses);
})
.catch(error => {
  console.error('Error:', error);
});
```

5. **Get Course Details**

```javascript
const courseId = 'course_id'; // Replace with the actual course ID

fetch(`<your_base_url>/Course/course/${courseId}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer <your_auth_token>`
  }
})
.then(response => response.json())
.then(course => {
  console.log('Course:', course);
})
.catch(error => {
  console.error('Error:', error);
});
```

These examples demonstrate how to use the `fetch` function to make API calls to each of the provided endpoints. Remember to handle the responses and errors appropriately in your application.