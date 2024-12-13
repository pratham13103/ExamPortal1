require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3333;  // Use port from .env or default to 3333

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS to allow cross-origin requests (useful for development with React frontend)
app.use(cors());

// Create MySQL connection pool using environment variables
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Test the database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);  // Exit the process if the connection fails
  }
  console.log('Connected to the MySQL database!');
  connection.release();  // Release the connection back to the pool
});

// Route to get admin details
app.get('/admin', (_, res) => {
  // Query to fetch admin details
  db.query('SELECT * FROM admin', (err, results) => {
    if (err) {
      console.error('Error fetching admin data:', err);
      return res.status(500).send('Internal server error');
    }
    if (results.length === 0) {
      return res.status(404).send('Admin not found');
    }
    res.json(results);  // Send the admin data to the frontend
  });
});

// Route to login user
app.post('/login', (req, res) => {
  const { user_email, user_password } = req.body;

  db.query('SELECT * FROM user WHERE user_email = ?', [user_email], (err, results) => {
    if (err) {
      console.error('Error querying user data:', err);
      return res.status(500).send('Internal server error');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];

    // Compare the password
    bcrypt.compare(user_password, user.user_password, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Error comparing passwords');
      }

      if (isMatch) {
        res.json({ message: 'Login successful', user });
      } else {
        res.status(401).send('Invalid password');
      }
    });
  });
});

// Route to get all subjects
app.get('/subjects', (_, res) => {
  db.query('SELECT * FROM subject', (err, results) => {
    if (err) {
      console.error('Error fetching subjects:', err);
      return res.status(500).send('Internal server error');
    }
    res.json(results);  // Send the subjects to the frontend
  });
});

// Route to get all exams
app.get('/exams', (_, res) => {
  db.query('SELECT * FROM exam', (err, results) => {
    if (err) {
      console.error('Error fetching exams:', err);
      return res.status(500).send('Internal server error');
    }
    res.json(results);  // Send the exams to the frontend
  });
});

// Route to get all questions
app.get('/questions', (_, res) => {
  db.query('SELECT * FROM question', (err, results) => {
    if (err) {
      console.error('Error fetching questions:', err);
      return res.status(500).send('Internal server error');
    }
    res.json(results);  // Send the questions to the frontend
  });
});

// Route to get users
app.get('/users', (_, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Internal server error');
    }
    res.json(results);  // Send the users to the frontend
  });
});

// Route to get questions for a specific exam
app.get('/exam/:examId/questions', (req, res) => {
  const { examId } = req.params;  // Using req to get the examId parameter

  db.query('SELECT * FROM question WHERE exam_id = ?', [examId], (err, results) => {
    if (err) {
      console.error('Error fetching questions for exam:', err);
      return res.status(500).send('Internal server error');
    }
    res.json(results);  // Send the questions for the specific exam
  });
});

// Route to submit a result
app.post('/results', (req, res) => {
  const { user_id, exam_id, score, total_questions } = req.body;

  db.query('INSERT INTO result (user_id, exam_id, score, total_questions) VALUES (?, ?, ?, ?)', 
    [user_id, exam_id, score, total_questions], 
    (err, results) => {
      if (err) {
        console.error('Error saving result:', err);
        return res.status(500).send('Internal server error');
      }
      res.status(201).send('Result saved successfully');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
