const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const courses = require('./database');

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
});

server.get('/', (req, res) => {
  const about = {
    avatar_url:
      'https://rocketseat.gallerycdn.vsassets.io/extensions/rocketseat/rocketseatreactnative/3.0.1/1588456740326/Microsoft.VisualStudio.Services.Icons.Default',
    name: 'Rocketseat',
    description:
      'Nossa missão é capacitar pessoas que buscam se profissionalizar na programação independente do seu momento ou nível de conhecimento.',
    links: [
      {
        name: 'Facebook',
        url: '',
      },
      {
        name: 'Instagram',
        url: '',
      },
      {
        name: 'Linkedin',
        url: '',
      },
      {
        name: 'Github',
        url: '',
      },
    ],
  };
  return res.render('about', { about });
});

server.get('/courses', (req, res) => {
  return res.render('courses', { items: courses });
});

server.get('/courses/:id', function (req, res) {
  const id = req.params.id;

  const course = courses.find(function (course) {
    return course.id == id;
  });
  if (!course) {
    return res.render('not-found');
  }
  return res.render('course', { item: course });
});

server.use(function (req, res) {
  res.status(404).render('not-found');
});

server.listen(3000, function () {
  console.log('Server is running in port 3000');
});
