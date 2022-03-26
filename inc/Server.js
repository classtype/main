/*────────────────────────────────────────────────────────────────────────────────────────────────*/

const express = require('express');
const app = express();

/*┌──────────────┐
  │ Шаблонизатор │
  └──────────────┘*/
app.set('view engine', 'ejs');
app.set('views', $.__path('static/tpl'));

/*┌─────────┐
  │ Статика │
  └─────────┘*/
app.use('/dist', express.static($.__path('static/dist')));

/*┌─────────┐
  │ Главная │
  └─────────┘*/
app.get('/', (req, res) => {
    return res.render('layout', {
        page: 'home',
        name: 'Вася',
        age: 18
    });
});

/*┌──────┐
  │ Test │
  └──────┘*/
app.get('/add', (req, res) => {
    return res.render('layout', {
        page: 'add'
    });
});

/*┌────────┐
  │ Сервер │
  └────────┘*/
app.listen(process.env.PORT, function() {
    console.log('Server -> http://' + process.env.IP + ':' + process.env.PORT);
});

/*────────────────────────────────────────────────────────────────────────────────────────────────*/