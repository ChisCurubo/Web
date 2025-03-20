npm init -y
npm install express
npm install ts-node ts-node-dev typescript @types/node @types/express -D

tsc --init

mkdir -p src build test database env

mkdir -p ./src/domain
mkdir -p ./src/application
mkdir -p ./src/infrastructure

mkdir -p ./src/domain/movie
echo "" > ./src/domain/movie/Movie.ts
echo "" > ./src/domain/movie/NullMovie.ts
echo "" > ./src/domain/movie/AbstractMovie.ts
mkdir -p ./src/domain/director
echo "" > ./src/domain/director/AbstractDirector.ts
echo "" > ./src/domain/director/Director.ts
echo "" > ./src/domain/director/NullDirector.ts
mkdir -p ./src/domain/producer
echo "" > ./src/domain/producer/AbstractProducer.ts
echo "" > ./src/domain/producer/Producer.ts
echo "" > ./src/domain/producer/NullProducer.ts
mkdir -p ./src/domain/imagen
echo "" > ./src/domain/imagen/AbstractImagen.ts
echo "" > ./src/domain/imagen/Imagen.ts
echo "" > ./src/domain/imagen/NullImagen.ts
mkdir -p ./src/domain/character
echo "" > ./src/domain/character/AbstractCharacter.ts
echo "" > ./src/domain/character/Character.ts
echo "" > ./src/domain/character/NullCharacter.ts
mkdir -p ./src/domain/port
mkdir -p ./src/domain/port/driver
echo "" > ./src/domain/port/driver/MovieUseCasePort.ts
mkdir -p ./src/domain/port/driven
mkdir -p ./src/domain/person
echo "" > ./src/domain/person/Person.ts
mkdir -p ./src/domain/express
echo "" > ./src/domain/express/MovieRouterExpressInterface.ts
echo "" > ./src/domain/express/MovieControllerExpressInterface.ts

mkdir -p ./src/application/usecase
echo "" > ./src/application/usecase/MovieUseCase.ts
mkdir -p ./src/application/service

mkdir -p ./src/infrastructure/express
echo "" > ./src/infrastructure/express/ServerExpress.ts
mkdir -p ./src/infrastructure/express/controller
echo "" > ./src/infrastructure/express/controller/MovieControllerExpress.ts
mkdir -p ./src/infrastructure/express/router
echo "" > ./src/infrastructure/express/router/MovieRouterExpress.ts



