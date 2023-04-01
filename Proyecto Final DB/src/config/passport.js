import local from "passport-local";
import passport from "passport";
import { createHash, validatePassword } from "../utils/bcrypt.js";
import { UserManager } from "../controllers/user.js";

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
        _id: "admin0000000"
      }
      return done(null, adminUser);
    }
    console.log("123123asd")

    const user = await userManager.getUserByEmail(username);
    console.log(user)

    if (user && validatePassword(password, user.password)) {
    console.log(user)

      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error + "123123asd")
    return done(error);
  }
};

const initializePassport = () => {
  //Define my strategies
  const registerStrategy = new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, registerMiddleware);
  const loginStrategy = new LocalStrategy({ usernameField: "email" }, loginMiddleware);

  // Asign strategies
  passport.use("register", registerStrategy);
  passport.use("login", loginStrategy);

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
