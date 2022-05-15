# App builds

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
the following command will build the application for your current os, for more info checkout [electron builder](https://github.com/electron-userland/electron-builder)
```bash
npm run dist
```

#### Running application
application should be inside `/dist` folder, in root of project