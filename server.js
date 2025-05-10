require('dotenv').config();
const express = require('express');
const cors = require('cors');
const httpModule = require('http');
const { Server } = require('socket.io');
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

const server = httpModule.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',             // or your mobile app’s bundle ID / domain
        methods: ['GET', 'POST'],
        allowedHeaders: ['authorization', 'Content-Type'],
    }
});

// Get all rooms
app.get('/chatRooms', async (req, res) => {
    const { rows } = await pool.query('SELECT id,name_en,name_ro FROM chat_rooms');
    res.json(rows);
});

// Get last 100 messages for a room
app.get('/chatRooms/:roomId/messages', async (req, res) => {
    const { roomId } = req.params;
    const { rows } = await pool.query(
        `SELECT
       m.id,
       m.text,
       m.created_at,
       u.username,
       u.photouri AS "photoUri"
     FROM chat_messages m
     JOIN users u ON u.id=m.user_id
     WHERE room_id=$1
     ORDER BY created_at ASC
     LIMIT 100;`,
        [roomId]
    );
    res.json(rows);
});

io.on('connection', socket => {
    // subscribe this socket to room “room_<roomId>”
    socket.on('joinRoom', roomId => {
        socket.join(`room_${roomId}`);
    });

    // when a client posts a new message
    socket.on('newMessage', async ({ roomId, userId, text }) => {
        // 1) persist in DB
        const { rows } = await pool.query(
            `INSERT INTO chat_messages (room_id, user_id, text)
       VALUES ($1,$2,$3)
       RETURNING id, created_at;`,
            [roomId, userId, text]
        );
        const { id, created_at } = rows[0];
        // 2) look up the sender’s username
        const u = await pool.query(
            'SELECT username FROM users WHERE id=$1',
            [userId]
        );
        const username = u.rows[0].username;
        // 3) broadcast to everyone in that room
        io.to(`room_${roomId}`).emit('message', {
            id, roomId, userId, username, text, created_at
        });
    });
});

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
        // Return token to client
        // res.header('auth-token', token).json({ token });
        res.header('auth-token', token).json({ token, userId: user.id });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Database error' });
    }
});
function authenticateToken(req, res, next) {
    // we expect the client to send it either as 'auth-token' or 'authorization: Bearer <token>'
    const token =
        req.header('auth-token') ||
        (req.header('authorization')?.startsWith('Bearer ')
            ? req.header('authorization').split(' ')[1]
            : null);

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // verify and decode
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}

app.get('/getProfile', authenticateToken, async (req, res) => {
    try {
        const { username } = req.user;
        const { rows } = await pool.query(
            `SELECT
        username,
        email,
        photouri    AS "photoUri",
        height,
        weight,
        sex,
        dob,
        age,
        activitylevel   AS "activityLevel",
        objective,
        experience,
        trainingdays    AS "trainingDays",
        calories,
        protein,
        carbs,
        fats
      FROM users
      WHERE username = $1;`,
            [username]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// Update User Profile API
app.post('/updateProfile', async (req, res) => {
    try {
        const { username, height, weight, sex, dob, age, activityLevel, objective, experience, trainingDays, calories, protein, carbs, fats, photoUri } = req.body;

        if (!username || !height || !weight || !sex || !dob || !age || !activityLevel || !objective || !experience) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const result = await pool.query(
            `UPDATE users 
            SET height = $1, weight = $2, sex = $3, dob = $4, age = $5, activityLevel = $6, objective = $7, experience = $8, trainingDays = $9, calories = $10, protein = $11, carbs = $12, fats = $13, photoUri = $14
            WHERE username = $15;`,
            [height, weight, sex, dob, age, activityLevel, objective, experience, trainingDays, calories, protein, carbs, fats, photoUri, username]
        );

        const uRes = await pool.query(
            'SELECT id FROM users WHERE username = $1;',
            [username]
        );
        const userId = uRes.rows[0].id;

        await pool.query(
            `INSERT INTO weight_history (user_id, weight)
                       VALUES ($1, $2);`,
            [userId, weight]
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

app.get('/getWeightHistory', async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'username is required' });

    try {
        // look up the user_id
        const uRes = await pool.query(
            'SELECT id FROM users WHERE username = $1;',
            [username]
        );
        if (uRes.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userId = uRes.rows[0].id;

        // fetch their history
        const hRes = await pool.query(
            `SELECT recorded_at AS date, weight
           FROM weight_history
          WHERE user_id = $1
          ORDER BY recorded_at ASC;`,
            [userId]
        );
        res.json(hRes.rows);
    } catch (err) {
        console.error('Error fetching weight history:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Fetch all meals (with foods) by username & date
app.get('/getUserMeals', async (req, res) => {
    const { username, date } = req.query;
    if (!username || !date) {
        return res.status(400).json({ error: 'username and date are required' });
    }
    try {
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
                    `SELECT
                   uf.*,
                   f.foodname_ro,
                   f.category_ro
                 FROM user_foods uf
                   LEFT JOIN foods f
                     ON uf.foodname = f.foodname
                    AND uf.category = f.category
                 WHERE uf.mealid = $1
                 ORDER BY uf.foodid ASC;`,
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

app.get('/getCategories', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT DISTINCT category, category_ro FROM foods;
    `);
        const categories = result.rows.map(row => ({
            category: row.category,
            category_ro: row.category_ro,
        }));
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

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

app.post('/addMeal', async (req, res) => {
    const { username, date } = req.body;
    if (!username || !date) {
        return res
            .status(400)
            .json({ error: 'username and date are required' });
    }
    try {
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
        const mInfo = await pool.query(
            'SELECT user_id, date FROM user_meals WHERE mealid = $1;',
            [mealid]
        );
        if (mInfo.rows.length === 0) {
            return res.status(404).json({ error: 'Meal not found' });
        }
        const { user_id, date } = mInfo.rows[0];

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
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
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

app.post('/getExercisesByNames', async (req, res) => {
    const { names } = req.body;
    if (!Array.isArray(names) || names.length === 0) {
        return res.status(400).json({ error: 'names array required' });
    }
    try {
        const result = await pool.query(
            `SELECT *
       FROM exercises
       WHERE name = ANY($1);`,
            [names]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching exercises by names:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/getExerciseDetail', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'name query parameter is required' });
    }
    try {
        const result = await pool.query(
            `SELECT *
       FROM exercises
       WHERE name = $1
       LIMIT 1;`,
            [name]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching exercise detail:', err);
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

server.listen(port, () => console.log('Server running on http://10.0.2.2:3000'));
