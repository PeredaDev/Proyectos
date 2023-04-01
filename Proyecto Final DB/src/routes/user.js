import { Router } from "express";
import passport from "passport";
import { UserManager } from "../controllers/user.js";

// User manager
const  userManager = new UserManager();
const userRouter = Router();


//Mostrar el login en navegador
userRouter.post('/register', passport.authenticate('register'), userManager.returnHome)
userRouter.post('/login', passport.authenticate('login'), userManager.createSession)
userRouter.post('/logout', userManager.destroySession)

userRouter.get('/loginHandlebars', async (req, res) => {
    res.render("login")
})

export default userRouter;

