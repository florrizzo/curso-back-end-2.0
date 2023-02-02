import express from 'express';
const app = express();
import config from './config.js';
import { ProductosDaoMongoDB } from './daos/ProductosDaoMongoDB.js';
import { MensajesDaoMongoDB } from './daos/MensajesDaoMongoDB.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';
import { normalize, schema, denormalize } from 'normalizr';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Usuarios from './models/usuarios.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import routes from './routes.js';
const PORT = parseInt(process.argv[2] || 8080)
import { fork } from 'child_process';

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGO,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

//IMPLEMENTACION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

httpServer.listen(PORT, () =>
console.log('SERVER ON http://localhost:' + PORT)
);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

/* Mongo conection */

async function connectMG() {
  try {
    await mongoose.connect(config.MONGO, { useNewUrlParser: true });
    console.log('Conectado a mongo! ✅');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

await connectMG();

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log('User Not Found with username ' + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log('Error in SignUp: ' + err);
          return done(err);
        }

        if (user) {
          console.log('User already exists');
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log('Error in Saving user: ' + err);
            return done(err);
          }
          console.log(user);
          console.log('User Registration succesful');
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

app.use(passport.initialize());
app.use(passport.session());

const contenedor = new ProductosDaoMongoDB();
const messages = new MensajesDaoMongoDB();

app.get('/', routes.checkAuthentication, routes.getMain);

app.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/faillogin' }),
  routes.postLogin
);

app.get('/login', routes.getLogin);

app.get('/register', routes.getRegister);

app.post(
  '/register',
  passport.authenticate('signup', { failureRedirect: '/failRegister' }),
  routes.postSignup
);

app.get('/failLogin', (req, res) => {
  res.render('failLogin');
});

app.get('/failRegister', (req, res) => {
  res.render('failRegister');
});

app.get('/showsession', (req, res) => {
  res.json(req.session);
});

app.get('/logout', routes.getLogout);

app.get('/info', routes.getInfo);

app.get('/api/randoms', (req, res) => {
  let cant = req.query.cant;
  cant = parseInt(cant);
  let computo = fork('./childProcess.js');
  let father = { msg: 'start', cant: cant };
  computo.send(father);

  computo.on('message', (msg) => {
    const { data } = msg;
    res.send(`La suma es ${data}`);
  });
});

async function normalizarMensajes() {
  const Messages = await messages.getAll();
  const ListMessages = [];
  for (const message of Messages) {
    const mensajeNuevo = {
      author: {
        id: message.author.id,
        nombre: message.author.nombre,
        apellido: message.author.apellido,
        edad: message.author.edad,
        alias: message.author.alias,
        avatar: message.author.avatar,
      },
      text: message.text,
      _id: JSON.stringify(message._id),
    };
    ListMessages.push(mensajeNuevo);
  }

  const authorSchema = new schema.Entity('authors', { idAttribute: 'id' });
  const messageSchema = new schema.Entity(
    'message',
    {
      author: authorSchema,
    },
    { idAttribute: '_id' }
  );

  const normalizedListMessages = normalize(ListMessages, [messageSchema]);
  const cantOriginal = JSON.stringify(ListMessages).length;
  const cantNormalizada = JSON.stringify(normalizedListMessages).length;
  const respuesta = [normalizedListMessages, cantOriginal, cantNormalizada];
  return respuesta;
}
normalizarMensajes();

io.on('connection', async (socket) => {
  console.log('Usuario conectado');
  io.sockets.emit('msg-list', await normalizarMensajes());
  io.sockets.emit('product-list', await contenedor.getAll());

  socket.on('msg', async (data) => {
    await messages.saveMsg(
      data.id,
      data.nombre,
      data.apellido,
      data.edad,
      data.alias,
      data.avatar,
      data.text
    );
    io.sockets.emit('msg-list', await normalizarMensajes());
  });

  socket.on('product', async (data) => {
    await contenedor.save(data.title, data.price, data.thumbnail);
    io.sockets.emit('product-list', await contenedor.getAll());
  });
});
