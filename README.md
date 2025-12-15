# Animals API

A RESTful API built with Node.js, Express, MongoDB, and Mongoose for managing animals.
This project provides full CRUD operations, proper error handling, and interactive API documentation using Swagger (OpenAPI 3.0).

---

## Features

* Create, read, update and delete animals
* RESTful API architecture
* MongoDB database integration
* Mongoose ODM for data modeling
* Proper HTTP status codes
* Input validation via Mongoose
* Swagger UI for API documentation and testing

---

## Technologies Used

* Node.js
* Express
* MongoDB
* Mongoose
* Swagger (swagger-jsdoc, swagger-ui-express)
* dotenv

---

## Environment Variables

Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongodb_connection_string
```

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Running the Project

Start the server:

```bash
node app.js
```

The server will run at:

```
http://localhost:3000
```

---

## API Documentation

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

The documentation allows you to:

* View all available endpoints
* Inspect request and response schemas
* Test endpoints directly from the browser

---

## API Flow

1. A client sends an HTTP request
2. Express receives and processes the request
3. Mongoose interacts with MongoDB
4. The API returns a JSON response
5. Swagger documents the endpoint automatically

---

## Endpoints Overview

### Create Animal

**POST** `/animals`

Request body:

```json
{
  "name": "Lion",
  "species": "Mammal",
  "age": 5
}
```

Responses:

* 201 Created
* 400 Bad Request

---

### Get All Animals

**GET** `/animals`

Responses:

* 200 OK
* 500 Internal Server Error

---

### Get Animal by ID

**GET** `/animals/{id}`

Responses:

* 200 OK
* 400 Bad Request
* 404 Not Found

---

### Update Animal

**PUT** `/animals/{id}`

Request body:

```json
{
  "name": "Tiger",
  "species": "Mammal",
  "age": 4
}
```

Responses:

* 200 OK
* 400 Bad Request
* 404 Not Found

---

### Delete Animal

**DELETE** `/animals/{id}`

Responses:

* 204 No Content
* 400 Bad Request
* 404 Not Found

---

## Testing

The API can be tested using tools such as Postman, Insomnia, or directly through Swagger UI.

---

## Error Handling

* Invalid MongoDB ObjectId returns 400
* Resource not found returns 404
* Validation errors return 400
* Internal server errors return 500

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by **Caio Moralez**
