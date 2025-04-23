# Crear carpeta principal
New-Item -ItemType Directory -Path "build" -Force

# Crear subcarpetas dentro de build
New-Item -ItemType Directory -Path "build\css" -Force
New-Item -ItemType Directory -Path "build\database" -Force
New-Item -ItemType Directory -Path "build\img" -Force
New-Item -ItemType Directory -Path "build\js" -Force

# Contenido del index.html
$htmlContent = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/app.css">
  <link rel="stylesheet" href="./css/index.css">
  <link rel="stylesheet" href="./css/movies.css">
  <title>Rental Movies UPB</title>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-camera-reels"
          viewBox="0 0 16 16">
          <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
          <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm6 8.73V7.27l-3.5 1.555v4.35zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1" />
          <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6M7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
        </svg>
      </div>
      <h1>RENTAL</h1>
      <h3>MOVIES UPB</h3>
    </header>
    <nav>
      <div class="nav-btn-left">
        <menu></menu>
      </div>
      <div class="nav-btn-right">
        <form id="search">
          <input type="text" placeholder="Search">
          <button type="submit" title="Search"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg></button>
        </form>
      </div>
    </nav>
    <main></main>
    <footer>
      <h1>Challenge</h1>
      <h3>2024-20 Web Applications Development</h3>
    </footer>
  </div>
  <script src="./js/index.js" type="module"></script>
</body>
</html>
"@

# Escribir el contenido en index.html
Set-Content -Path "build\index.html" -Value $htmlContent

# Crear carpeta css si no existe
$cssPath = ".\build\css"
if (-not (Test-Path $cssPath)) {
    New-Item -ItemType Directory -Path $cssPath
}

# Crear archivos CSS
$files = @("app.css", "index.css", "movies.css")
foreach ($file in $files) {
    $filePath = Join-Path $cssPath $file
    if (-not (Test-Path $filePath)) {
        New-Item -ItemType File -Path $filePath
    }
}

# Contenido de app.css
$appCss = @"
:root {
  --main-color: #e0a31d;
  --main-color-dark: #201b13;
  --main-color-light: #4b4d4e;
  --main-color-gradient: linear-gradient(
    90deg,
    rgba(32, 27, 19, 1) 0%,
    rgba(51, 51, 51, 1) 47%,
    rgba(75, 77, 78, 1) 100%
  );
  --text-color-dark: #201b13;
  --text-color-light: #f5f5f5;
  --btn-hover: #4b5fd4;
}
"@
Set-Content -Path "$cssPath\app.css" -Value $appCss

# Contenido de index.css
$indexCss = @"
body {
  font-family: Arial, sans-serif;
  margin: 0px;
  padding: 0px;
}

header {
  background: var(--main-color-gradient);
  color: var(--text-color-light);
  text-align: center;
  padding: 20px;
}

footer {
  background: var(--main-color-gradient);
  color: var(--text-color-light);
  text-align: center;
  padding: 20px;
}

header h1,
footer h1,
header h3,
footer h3 {
  margin: 0px;
  padding: 0px;
  font-weight: bold;
}

nav {
  display: flex;
  background-color: var(--main-color);
  color: var(--text-color-light);
  padding: 10px;
}

nav div {
  flex-grow: 1;
}

nav menu {
  padding: 0px;
  margin: 0px;
}

nav .nav-btn-left {
  text-align: left;
}

nav .nav-btn-right {
  text-align: right;
}

nav .nav-btn-right form {
  display: flex;
  justify-content: flex-end;
}

nav .nav-btn-right form input {
  width: 40%;
  border: none;
  padding: 10px;
  margin: 0px;
  color: var(--text-color-dark);
}

nav .nav-btn-right form button {
  background: var(--main-color-gradient);
  color: var(--text-color-light);
  border: none;
  padding: 10px;
  margin: 0px;
  cursor: pointer;
}

nav ul {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}

nav li {
  display: inline;
  margin: 1px;
  padding: 0px;
}

nav a,
nav span {
  display: inline-block;
  color: var(--text-color-light);
  text-decoration: none;
  padding: 10px;
}

nav a:hover {
  background-color: var(--main-color-light);
}

nav span:hover {
  background-color: var(--main-color-light);
  cursor: pointer;
}

.active {
  background-color: var(--main-color-light);
}

@media screen and (max-width: 600px) {
  nav {
    flex-direction: column;
  }

  nav .nav-btn-right form {
    flex-direction: column;
    margin-top: 5px;
  }

  nav .nav-btn-right form input {
    width: auto;
    margin-bottom: 5px;
  }

  nav .nav-btn-right form button {
    width: 100%;
  }

  nav ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  nav li {
    width: 100%;
    display: block;
  }

  nav a {
    display: block;
    text-align: center;
  }

  footer {
    position: relative;
  }
}
"@
Set-Content -Path "$cssPath\index.css" -Value $indexCss

# Contenido de movies.css
$moviesCss = @"
.movies {
  display: grid;
  width: 90%;
  margin: auto;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 10px;
  padding: 10px;
}

.movie {
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 10px;
  border-radius: 5px;
  color: var(--text-color-light);
  background: var(--main-color-gradient);
}

.movie-poster {
  color: var(--main-color);
}

.movie-poster img {
  width: 100px;
  height: 150px;
}

.movie-poster img:hover {
  cursor: pointer;
}

.movie-info {
  margin-left: 10px;
  padding: 10px;
}

.movie-info h2 {
  margin: 0px;
  padding: 0px;
}

.movie-info .text-info {
  padding-right: 10px;
  margin-bottom: 10px;
  height: 200px;
  overflow-y: auto;
  font-size: 14px;
}

.movie-info .text-info p {
  margin: 0px;
  padding: 0px;
}

.movie-btn-rental {
  text-align: center;
}

.movie-poster ul {
  list-style-type: square;
  padding: 0px 20px;
  margin: 0px;
}

.movie-poster ul li {
  text-decoration-line: underline;
  padding: 0px;
  color: var(--main-color);
}

.movie-btn-rental button {
  background: var(--main-color);
  color: var(--text-color-light);
  font-weight: bold;
  font-size: medium;
  border: none;
  padding: 16px;
  margin: 0px;
  cursor: pointer;
  width: 100%;
}

.movie-btn-rental button:hover {
  background: var(--btn-hover);
}

.movie-not-fount {
  text-align: center;
  color: var(--main-color);
}

.pagination {
  display: flex;
  justify-content: right;
  align-items: center;
  margin: auto;
  padding: 5px;
  width: 90%;
}

.pagination div {
  padding: 10px;
}

.pagination .page {
  padding: 15px;
}

.pagination button {
  cursor: pointer;
  border: none;
  color: var(--main-color);
  padding: 0px;
  margin: 0px;
}

.pagination button:hover {
  color: var(--main-color-dark);
}

@media screen and (max-width: 600px) {
  .movies {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .pagination {
    justify-content: center;
  }
}
"@
Set-Content -Path "$cssPath\movies.css" -Value $moviesCss

Write-Output "Archivos CSS creados y llenados correctamente."


Write-Host "Estructura y archivo index.html creados correctamente."
