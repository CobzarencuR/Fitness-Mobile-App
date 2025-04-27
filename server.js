require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const port = 3000;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));

// Register User API
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const checkUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (checkUser.rows.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        // Hash the password with bcrypt before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, hashedPassword]
        );

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Login API using bcrypt and JWT
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const user = result.rows[0];
        // Compare provided password with hashed password in database.
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        // Generate a JWT token; expires in 1 hour.
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        // Return token to client (also set as header if desired).
        res.header('auth-token', token).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update User Profile API
app.post('/updateProfile', async (req, res) => {
    try {
        const { username, height, weight, sex, dob, age, activityLevel, objective, experience, trainingDays, calories, protein, carbs, fats } = req.body;
        // Ensure all required fields are provided
        if (!username || !height || !weight || !sex || !dob || !age || !activityLevel || !objective || !experience) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Update the user profile in PostgreSQL
        const result = await pool.query(
            `UPDATE users 
            SET height = $1, weight = $2, sex = $3, dob = $4, age = $5, activityLevel = $6, objective = $7, experience = $8, trainingDays = $9, calories = $10, protein = $11, carbs = $12, fats = $13
            WHERE username = $14;`,
            [height, weight, sex, dob, age, activityLevel, objective, experience, trainingDays, calories, protein, carbs, fats, username]
        );

        if (result.rowCount > 0) {
            res.json({ message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating profile in PostgreSQL:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
});

// Fetch all meals (with foods) by username & date
app.get('/getUserMeals', async (req, res) => {
    const { username, date } = req.query;
    if (!username || !date) {
        return res.status(400).json({ error: 'username and date are required' });
    }
    try {
        // find the Postgres user_id
        const uRes = await pool.query(
            'SELECT id FROM users WHERE username = $1;',
            [username]
        );
        if (uRes.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user_id = uRes.rows[0].id;

        // load that user’s meals
        const mRes = await pool.query(
            'SELECT * FROM user_meals WHERE user_id = $1 AND date = $2;',
            [user_id, date]
        );

        // for each meal load its foods
        const withFoods = await Promise.all(
            mRes.rows.map(async (meal) => {
                const fRes = await pool.query(
                    'SELECT * FROM user_foods WHERE mealid = $1 ORDER BY foodid ASC;',
                    [meal.mealid]
                );
                return { ...meal, foods: fRes.rows };
            })
        );
        res.json(withFoods);
    } catch (err) {
        console.error('Error fetching user meals:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/addMeal', async (req, res) => {
    const { username, date } = req.body;
    if (!username || !date) {
        return res
            .status(400)
            .json({ error: 'username and date are required' });
    }
    try {
        // Look up the Postgres user_id by username
        const uRes = await pool.query(
            'SELECT id FROM users WHERE username = $1;',
            [username]
        );
        if (uRes.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userId = uRes.rows[0].id;

        // Count existing meals on that date
        const countRes = await pool.query(
            'SELECT COUNT(*) FROM user_meals WHERE user_id = $1 AND date = $2;',
            [userId, date]
        );
        const nextIndex = parseInt(countRes.rows[0].count, 10) + 1;
        const name = `Meal ${nextIndex}`;

        // Insert the new meal with the computed name
        const insertRes = await pool.query(
            `INSERT INTO user_meals (user_id, name, date)
       VALUES ($1, $2, $3)
       RETURNING *;`,
            [userId, name, date]
        );
        res.json(insertRes.rows[0]);
    } catch (err) {
        console.error('Error adding meal:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.delete('/deleteMeal', async (req, res) => {
    const mealid = parseInt(req.query.mealid, 10);
    if (!mealid) {
        return res.status(400).json({ error: 'mealid query parameter is required' });
    }
    try {
        // Grab the user_id and date for this meal
        const mInfo = await pool.query(
            'SELECT user_id, date FROM user_meals WHERE mealid = $1;',
            [mealid]
        );
        if (mInfo.rows.length === 0) {
            return res.status(404).json({ error: 'Meal not found' });
        }
        const { user_id, date } = mInfo.rows[0];

        // Delete the meal
        await pool.query('DELETE FROM user_meals WHERE mealid = $1;', [mealid]);

        // Renumber all remaining meals for that user+date
        await pool.query(`WITH ordered AS (
        SELECT mealid,
               ROW_NUMBER() OVER (ORDER BY mealid) AS rn
          FROM user_meals
         WHERE user_id = $1
           AND date    = $2
      )
      UPDATE user_meals
         SET name = concat('Meal ', ordered.rn)
        FROM ordered
       WHERE user_meals.mealid = ordered.mealid;`,
            [user_id, date]
        );

        res.json({ message: 'Meal deleted and renumbered successfully' });
    } catch (err) {
        console.error('Error deleting & renumbering meals:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/addFood', async (req, res) => {
    const { mealid, foodname, grams, category, calories, protein, carbs, fats } = req.body;
    if (!mealid || !foodname || grams == null || !category) {
        return res.status(400).json({ error: 'mealid, foodname, grams and category are required' });
    }
    try {
        const result = await pool.query(
            `INSERT INTO user_foods
         (mealid, foodname, grams, category, calories, protein, carbs, fats)
       VALUES
         ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *;`,
            [mealid, foodname, grams, category, calories, protein, carbs, fats]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error adding food:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.put('/updateFood', async (req, res) => {
    const { foodid, foodname, grams, category, calories, protein, carbs, fats } = req.body;
    if (!foodid || !foodname || grams == null || !category) {
        return res.status(400).json({ error: 'foodid, foodname, grams and category are required' });
    }
    try {
        //update the food in the database
        const result = await pool.query(
            `UPDATE user_foods
         SET foodname = $1,
             grams     = $2,
             category  = $3,
             calories  = $4,
             protein   = $5,
             carbs     = $6,
             fats      = $7
       WHERE foodid = $8
       RETURNING *;`,
            [foodname, grams, category, calories, protein, carbs, fats, foodid]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Food not found' });
        }
        const updatedRow = result.rows[0];

        // now fetch all foods for that meal, in stable order
        const foodsRes = await pool.query(
            'SELECT * FROM user_foods WHERE mealid = $1 ORDER BY foodid ASC;',
            [updatedRow.mealid]
        );

        // return both the single updated row (if you still need it) and the full list
        res.json({
            updatedFood: updatedRow,
            foods: foodsRes.rows,
        });
    } catch (err) {
        console.error('Error updating food:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.delete('/deleteFood', async (req, res) => {
    const foodid = parseInt(req.query.foodid, 10);
    if (!foodid) {
        return res.status(400).json({ error: 'foodid query parameter is required' });
    }
    try {
        const result = await pool.query(
            'DELETE FROM user_foods WHERE foodid = $1;',
            [foodid]
        );
        if (result.rowCount > 0) {
            res.json({ message: 'Food deleted successfully' });
        } else {
            res.status(404).json({ error: 'Food not found' });
        }
    } catch (err) {
        console.error('Error deleting food:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.put('/moveFood', async (req, res) => {
    const { foodid, destinationMealId } = req.body;
    if (!foodid || !destinationMealId) {
        return res.status(400).json({ error: 'foodid and destinationMealId are required' });
    }
    try {
        const result = await pool.query(
            `UPDATE user_foods
         SET mealid = $1
       WHERE foodid = $2
       RETURNING *;`,
            [destinationMealId, foodid]
        );
        if (result.rowCount > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Food not found' });
        }
    } catch (err) {
        console.error('Error moving food:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get distinct food categories from the foods table
app.get('/getCategories', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT DISTINCT category FROM foods;
    `);
        const categories = result.rows.map(row => row.category);
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get foods by category (assuming foods table has a "category" column)
app.get('/getFoodsByCategory', async (req, res) => {
    const { category } = req.query;
    if (!category) {
        return res.status(400).json({ error: 'Category is required' });
    }
    try {
        const result = await pool.query(
            'SELECT * FROM foods WHERE category = $1',
            [category]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all exercises by primary muscle group
app.get('/getExercisesByPrimaryMuscle', async (req, res) => {
    try {
        const { muscles } = req.query;
        if (!muscles) {
            return res.status(400).json({ error: 'muscles query required' });
        }
        const muscleArr = (muscles).split(',');
        const result = await pool.query(
            `SELECT *
         FROM exercises
        WHERE primary_muscle_group = ANY($1)
        ORDER BY exerciseid;`,
            [muscleArr]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching exercises by primary muscle:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// FETCH a saved plan
app.get('/getWorkoutPlan', async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'username is required' });
    try {
        const result = await pool.query(
            'SELECT plan FROM workout_plans WHERE username = $1',
            [username]
        );
        if (result.rows.length === 0) {
            return res.json({ plan: null });
        }
        res.json({ plan: result.rows[0].plan });
    } catch (err) {
        console.error('Error fetching workout plan:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// SAVE (or update) a plan
app.post('/saveWorkoutPlan', async (req, res) => {
    const { username, plan } = req.body;
    if (!username || !plan) {
        return res.status(400).json({ error: 'username and plan are required' });
    }
    try {
        await pool.query(
            `INSERT INTO workout_plans (username, plan)
   VALUES ($1, $2::jsonb)
   ON CONFLICT (username)
   DO UPDATE SET plan = EXCLUDED.plan, updated_at = NOW();`,
            [username, JSON.stringify(plan)]
        );

        res.json({ message: 'Workout plan saved' });
    } catch (err) {
        console.error('Error saving workout plan:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(port, () => console.log('Server running on http://10.0.2.2:3000'));
