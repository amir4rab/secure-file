# Self Hosting

## 🖥️ Node Application

### Requirements:

- [Node.js](https://nodejs.org)
- [Npm](https://www.npmjs.com/)

### Steps:

#### Cloning
```bash
git clone https://github.com/amir4rab/secure-file
cd ./secure-file
```

#### Installing dependencies 
```bash
npm install
```

#### Installing the Application
```bash
npm run install
```

#### Hosting the Application
```bash
npm run start
```

---

## 🐋 Building Docker Application

### Requirements:

- [Docker](https://docker.com)

### Steps:

#### Cloning
```bash
git clone https://github.com/amir4rab/secure-file
cd ./secure-file
```

#### Building the container
```bash
docker build -t secure-file .
```

#### Run your container
```bash
docker run -p 3000:3000 secure-file
```