const passport = require("passport");
const passportJWT = require("passport-jwt");
const { User } = require("../db/models/user");
const { secretJwt } = require("../config");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretJwt,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id).select("-password");

        if (!user) {
          return done(null, false, { message: "Not authorized" });
        }

        return done(null, user);
      } catch (error) {
        console.error("Auth error:", error);
        return done(error, false);
      }
    }
  )
);

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
