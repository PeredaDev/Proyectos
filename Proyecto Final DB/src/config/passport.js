import local from "passport-local";
import passport from "passport";
import { createHash, validatePassword } from "../utils/bcrypt.js";
import { UserManager } from "../controllers/user.js";
import GitHubStrategy from "passport-github2";
import { globalAgent } from "https";
globalAgent.options.rejectUnauthorized = false;

// User manager
const userManager = new UserManager();

//Passport is going to be a middleware
const LocalStrategy = local.Strategy;

const registerMiddleware = async (req, username, password, done) => {
  const { first_name, last_name, email, age } = req.body;
  try {
    let user = await userManager.getUserByEmail(username);
    if (user) {
      console.log("Usuario existente");
      return done(null, false);
    }
    const passwordHash = createHash(password);
    const userCreated = await userManager.addUser({
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
      password: passwordHash,
    });
    console.log("Usuario creado");
    return done(null, userCreated);
  } catch (error) {
    return done(error);
  }
};

const loginMiddleware = async (username, password, done) => {
  try {
    if (username == "admin@admin.com" && password == "1234") {
      const adminUser = {
        _id: "admin0000000",
      };
      return done(null, adminUser);
    }

    const user = await userManager.getUserByEmail(username);

    if (user && validatePassword(password, user.password)) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error);
  }
};

const githubStrategy = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  scope: ["user:email"],
  calbackURL: process.env.GITHUB_CALLBACK_URL,
  passReqToCallback: true,
};

const loginGithubMiddleware = async (req, test, x, profile, done) => {
  try {
    req.session.login = true;
    const userGithub = await userManager.getUserByEmail(
      profile.emails[0].value
    );
    if (userGithub) {
      req.session.user = userGithub;
      return done(null, userGithub);
    } else {
      let newUser = await userManager.addUser({
        first_name: profile._json.name,
        last_name: "Github",
        email: profile.emails[0].value,
        age: 18,
        password: "Github",
      });
      req.session.user = newUser;
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
};

const initializePassport = () => {
  //Define my strategies
  const registerStrategy = new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    registerMiddleware
  );
  const loginStrategy = new LocalStrategy(
    { usernameField: "email" },
    loginMiddleware
  );
  const loginGithubStrategy = new GitHubStrategy(
    githubStrategy,
    loginGithubMiddleware
  );

  // Asign strategies
  passport.use("register", registerStrategy);
  passport.use("login", loginStrategy);
  passport.use("github", loginGithubStrategy);

  // Serialize user after login/registration
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  //Delete user session
  passport.deserializeUser((id, done) => {
    const user = userManager.getUserById(id);
    done(null, user);
  });
};

export default initializePassport;
