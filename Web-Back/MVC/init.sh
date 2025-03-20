npm init -y
npm install express
npm install nodemon typescript ts-node @types/node @types/express -D

tsc --init

# Para https
openssl genrsa -out key.pem 2048
openssl req -new -key key.pem -out cert.csr
openssl x509 -req -in cert.csr -signkey key.pem -out cert.pem -days 365
