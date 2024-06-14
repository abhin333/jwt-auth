import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import './passport.js';
import session from 'express-session'
import jwt from 'jsonwebtoken';
import { Cookie } from 'express-session';
import google from '../models/googleuser_models.js';

dotenv.config();
mongoose.connect(process.env.mongodb_url).then(() => {
    console.log("connected successfuly ");
}).catch((error) => {
    throw error;
})
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'vytft%$$#^dhuyiaysuyfw4wfgsu',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.json({ message: "You are not logged in" })
})

app.get("/failed", (req, res) => {
    res.status(401).json({
        error: "Unauthorized",
        message: "Failed"
    });
});
app.get("/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "successfuly loged in",
            user: req.user
        });
    }
    else {
        res.status(401).json({
            error: "Unauthorized",
            message: "Failed"
        })
    }
})

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }
    ));

app.get('/api/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Error logging out');
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Error logging out');
            }
            console.log("Session destroyed successfully");
            res.redirect('http://localhost:5173/signin');
        });
    });
});


app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/' }),
    (req, res) => {
        const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("authtoken", token);
        res.redirect('http://localhost:5173/about');
    }
);


app.get('/api/current_user', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            res.json(user);
            if (user) {
                const googleuser = await google.findOne({ email: user._json.email })
                if (!googleuser) {
                    const newuser = new google({ username: user.displayName, email: user._json.email });
                    await newuser.save();
                    res.status(201).json({ message: "Useris logedin" });
                    console.log("goodddddd");
                }
            }

        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.listen(3000, () => {
    console.log("connected server port =3000");
})




app.use("/api/user", userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/signin', authRoutes);



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || " inrernal server error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
