const express = require('express');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const PhotoController = require('./controllers/photoControllers');
const PageController = require('./controllers/pageControllers');
const app = express();

//CONNECT TO DB
mongoose.connect(
  'mongodb+srv://cihangonen:D4uYTospHilaKarH@cluster0.qegjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get('/', PhotoController.getAllPhotos);
app.get('/photos/:id', PhotoController.getPhoto);
app.post('/photos', PhotoController.createPhoto);
app.put('/photos/:id', PhotoController.updatePhoto);
app.delete('/photos/:id', PhotoController.deletePhoto);

app.get('/about', PageController.getAboutPage);
app.get('/add', PageController.getAddPage);
app.get('/photos/edit/:id', PageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
