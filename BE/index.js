const express = require("express")
const bcrypt = require("bcrypt")
var cors = require('cors')
const jwt = require("jsonwebtoken")
const { User, /*createInitialUsers*/ } = require('./models/user.js');
const { Proposal, Milestone } = require('./models/proposal.js');
const sequelize = require('./config/sequelize.js');

/*Used database.json file before connection to database
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("./database.json");
var db = low(adapter);
*/

// Initialize Express app
const app = express()

// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = "dsfdsfsdfdsvcsvdfgefg"

// Set up CORS and JSON middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// The auth endpoint that logs a user based on an existing record
app.post("/login", async (req, res) => {
    
    const { username, password } = req.body;

    
    //const user = db.get("users").value().filter(user => username === user.username)

    
    
    try {
        
        // Look up the user entry in the database
        const user = await User.findOne({ where: { username } });
        
        // Compare the hashed passwords and generate the JWT token for the user
        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const loginData = {
            username,
            signInTime: Date.now(),
        };

        const token = jwt.sign(loginData, jwtSecretKey);
        res.status(200).json({ message: "success", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

    //Old code that uses database.json file
        /*bcrypt.compare(password, user[0].password, function (_err, result) {
            if (!result) {
                return res.status(401).json({ message: "Invalid password" });
            } else {
                let loginData = {
                    username,
                    signInTime: Date.now(),
                };

                const token = jwt.sign(loginData, jwtSecretKey);
                res.status(200).json({ message: "success", token });
            }

        });*/


})

// The auth endpoint that creates a new user record 
app.post("/register", async (req, res) => {
    const { name, email, username, password} = req.body;
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await User.create({
            name,
            email,
            username,
            password: hashedPassword,
        });

        console.log({ username, password: hashedPassword });

        let loginData = {
            username: newUser.username,
            signInTime: Date.now(),
        };

        const token = jwt.sign(loginData, jwtSecretKey);
        res.status(200).json({ message: "success", token });
        
    } catch (error) {
        console.error('Error creating a new user:', error);
        res.status(500).json({ message: "Error creating a new user" });
    }

    //Old code that uses database.json file
    /*
    // Hash the password and add a new user to the database
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }

        const newUser = {
            username,
            password: hash, // Save the hashed password
        };

        // Save the new user to the database
        db.get("users").push(newUser).write();

        console.log({ username, password: hash })

        let loginData = {
            username,
            signInTime: Date.now(),
        };

        const token = jwt.sign(loginData, jwtSecretKey);
        res.status(200).json({ message: "success", token });
    });*/
});


// The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req, res) => {
    const tokenHeaderKey = "jwt-token";
    const authToken = req.headers[tokenHeaderKey];
    try {
      const verified = jwt.verify(authToken, jwtSecretKey);
      if (verified) {
        return res
          .status(200)
          .json({ status: "logged in", message: "success" });
      } else {
        // Access Denied
        return res.status(401).json({ status: "invalid auth", message: "error" });
      }
    } catch (error) {
      // Access Denied
      return res.status(401).json({ status: "invalid auth", message: "error" });
    }

})


app.post('/check-account', async (req, res) => {
    const { username } = req.body

    console.log(req.body)

    //Old code that uses database.json file
    /*const user = db.get("users").value().filter(user => username === user.username)
    console.log(user)
    res.status(200).json({
        status: user.length === 1 ? "User exists" : "User does not exist", userExists: user.length === 1
    })
    */
    try{
        const user = await User.findOne({ where: { username } });
        console.log(user)
    
    if (user) {
        res.status(200).json({
            status: "User exists",
            userExists: true
        });
    } else {
        res.status(200).json({
            status: "User does not exist",
            userExists: false
        });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error checking user account",
            userExists: false
        });
    }
});


app.post('/get-role', async (req, res) => {
    const tokenHeaderKey = "jwt-token";
    const authToken = req.headers[tokenHeaderKey];
  
    try {
      const verified = jwt.verify(authToken, jwtSecretKey);
      if (verified) {
        // Fetch the user entry in the database
        const user = await User.findOne({
            where: { username: verified.username },
            attributes: ['role']
        });
        if (user) {
          res.status(200).json({ role: user.role || "user" }); // Assume 'user' as default role
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } else {
        // Access Denied
        res.status(401).json({ status: "invalid auth", message: "error" });
      }
    } catch (error) {
      // Access Denied
      res.status(401).json({ status: "invalid auth", message: "error" });
    }
  });
  
app.get('/stats', async (req, res) => {
    try {
        const userCount = await User.count();
        const proposalCount = await Proposal.count();
        console.log(userCount)
        res.json({ stats:{userCount, proposalCount} });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

sequelize.sync({ force: false }).then(async () => {
    //await createInitialUsers();
    console.log('Database synced');
  });

app.listen(3080)