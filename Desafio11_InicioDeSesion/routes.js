function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

function getMain(req, res) {
    const { username, password } = req.user;
      res.render('productslists', { usuario: username });
  }

function postSignup(req, res) {
  const { username, password } = req.user;
  res.render('productslists', { usuario: username });
}

function getLogin(req, res) {
  res.render('login');
}

function getRegister(req, res) {
  res.render('register');
}

function postLogin(req, res) {
    const { username, password } = req.user;
    res.render('productslists', { usuario: username });
  }

  function getLogout(req, res){
        const { username, password } = req.user
        console.log(username)
        req.session.destroy((err) => {
          if (err) {
            res.send('No se pudo deslogear');
          } else {
            res.render('logout', { usuario: username });
          }
        });
      }


//     if (req.user){
//         const { username, password } = req.user;
//         req.logout();
//         return username
//     } else {
//         const username = '';
//         return username
//     }
//     res.render("logout", { usuario: username });
//   }

export default { checkAuthentication, postSignup, getLogin, getRegister, postLogin, getMain, getLogout};
