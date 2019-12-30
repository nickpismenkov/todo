const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Router = require('./routes/todo')
const path = require('path')

const PORT = process.env.PORT || 3000
const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.urlencoded({ extended: true }))
app.use(Router)
app.use(express.static(path.join(__dirname, 'public')))

async function start(){
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0-q8bko.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {
            console.log(`Server has been started on PORT - ${PORT}...`)
        })
    } catch(e){
        console.log(e)
    }
}

start()