import LocalStrategy from 'passport-local'
import bcrypt from 'bcryptjs' 

function initializePassword(passport, getUsuarioByEmail, getUsuarioById) {

  const authenticateUser = async (email, password, done) => {

    const user = await getUsuarioByEmail(email, done)
    try {
      if(await bcrypt.compare(password, user.Contrasena)){
        return done(null, user)
      } else {
        return done(null, false, 'Password incorrect')
      }

    } catch (error) {
      return done(error)
    }
  } 

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.Id))
  passport.deserializeUser((id, done) => getUsuarioById(id, done))
}

module.exports = initializePassword