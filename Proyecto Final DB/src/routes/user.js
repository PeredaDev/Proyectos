import { Router } from "express";
import passport from "passport";
import { UserManager } from "../controllers/user.js";

// User manager
const userManager = new UserManager();
const userRouter = Router();

const githubConfig = {
  successRedirect: "/home",
  failureRedirect: "/loginHandlebars",
  passReqToCallback: true,
  failureFlash: true,
  scope: ["user: email"]
};

//Mostrar el login en navegador
userRouter.post("/register", passport.authenticate("register"), userManager.returnHome);
userRouter.post("/login", passport.authenticate("login"), userManager.createSession);
userRouter.get("/loginGithub", passport.authenticate("github", githubConfig));
userRouter.post("/logout", userManager.destroySession);

userRouter.get("/loginHandlebars", async (req, res) => {
  res.render("login");
});

export default userRouter;
