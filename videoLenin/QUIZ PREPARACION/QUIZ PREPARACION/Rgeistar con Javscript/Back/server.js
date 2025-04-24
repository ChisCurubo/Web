import express, { json, urlencoded } from 'express';

const app = express();


app.use(json());
app.use(urlencoded({ extended: true }));

app.post("/contacto", async (req, res) => {
    const {  email, contraseña } = req.body;
    
    console.log('Nombre:', contraseña);
    console.log('Email:', email);
    

    
    res.send(`
          <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap Login Centered</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.4/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-DQvkBjpPgn7RC31MCQoOeC9TI2kdqa4+BSgNMNj8v77fdC77Kj5zpWFTJaaAoMbC" crossorigin="anonymous">
    <link rel="stylesheet" href="css.css">
    <style>
   
    </style>
  </head>
  <body class="d-flex justify-content-center align-items-center">

    <div class="login w-100" style="max-width: 400px;">
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Well done!</h4>
            <p>Se ha registrado con exito</p>
            <hr>
            <p class="mb-0">Exitos</p>
          </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.4/dist/js/bootstrap.bundle.min.js" integrity="sha384-YUe2LzesAfftltw+PEaao2tjU/QATaW/rOitAq67e0CT0Zi2VVRL0oC4+gAaeBKu" crossorigin="anonymous"></script>
  </body>
</html>
        `);
});


app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
