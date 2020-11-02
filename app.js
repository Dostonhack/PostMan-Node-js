const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Joi = require('joi');
app.use(express.json()); 


const books =[
    {id :1, name:"boy ota kambag'al ota"},
    {id :2, name:"o'lsang kim yig'laydi"},
    {id :3, name:"ferrariysini sotgan roxib"}


]

app.get('/',(req,res) =>{
    res.send('salom men shu yerdaman')
})

app.get('/api/books',(req,res) =>{
    res.send(books)
})


app.post('/api/books',(req,res) =>{
    const {error} =validabook(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const book = {
        id: books.length +1,
        name: req.body.name
    }

    books.push(book)
    res.status(201).send(book)
})

app.get('/api/books/:id',(req,res) =>{
    const book = books.find(b =>b.id ===parseInt(req.params.id));
    if(!book) 
    return res.status(404).send("Berilgan id ga teng bulgan kitob topilmadi")

    res.send(book)

});

app.put('/api/books/:id', (req,res) =>{
    //kitobni bazadan izlab topish 
    //agar kitob bulmasa 404 xatolikni qaytarish
    const book = books.find(b =>b.id ===parseInt(req.params.id));
    if(!book) 
    return res.status(404).send("Berilgan id ga teng bulgan kitob topilmadi")

    //agar kitob topilsa, validasiya qilish
    //agar surov validasiyadan utmasa 400 xatolikni qaytarish

    const {error} =validabook(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    // kitobni yangilsh 
    book.name = req.body.name;
    //yangilangan kitibni qaytarish 
    res.send(book)

});

app.delete('/api/books/:id',(req,res) =>{

    //kitobni id buyicha topamiz
    //topilmasa 404 xatolik qaytaramiz
    const book = books.find(b =>b.id ===parseInt(req.params.id));
    if(!book) 
    return res.status(404).send("Berilgan id ga teng bulgan kitob topilmadi")
    //topilsa uni uchirib tashlaymiz
    const bookIndex = books.indexOf(book);
    books.slice(bookIndex,1)
    //topilgan kitobni qaytaramiz
    res.send(book);
});

function validabook(book) {
    const Bookschema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(book, Bookschema)

}


app.listen(port, () => console.log(`${port} Portda Server ishlayapdi`));