import userModel from "../schemas/user.js";

export class UserManager {
  async createSession(req, res) {
    if (req.user._id == "admin0000000") {
      req.session.user = {
        first_name: "EL PODEROSISIMO ADMIN",
        last_name: "",
        age: "",
        email: "",
      };
      req.session.login = true
      return res.redirect("/home");
    }
    try {
      console.log(req.user)
      if (!req.user) {
        return res
          .status(401)
          .send({ status: "error", error: "Invalidate User" });
      }
      console.log(req.user)
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
      };
      req.session.login = true;
      return res.redirect("/home");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  
  async destroySession(req, res) {
    req.session.destroy();
    res.status(401).render("login");
  }

  async returnHome(req, res) {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    req.session.login = true
    res.redirect("/home")
  }

  async getUserByEmail(email) {
    try {
      let user = await userModel.findOne({ email: email });
      return user;
    } catch (error) {
      console.log("Falla al obtener el usuario", error);
      return false;
    }
  }

  async getUserById(id) {
    try {
      let user = await userModel.findById(id);
      return user;
    } catch (error) {
      console.log("Falla al obtener el usuario", error);
      return false;
    }
  }

  async addUser(user) {
    const newUser = new userModel({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      password: user.password,
    });
    try {
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      console.log("Falla en la insercion en la base datos", error.toString());
      return false;
    }
  }
}
