<h1 align="center">cinebingo 🎥</h1>

**Cinebingo** is a movie-themed bingo web app featuring daily rankings to fuel player competitiveness. Coded with **[React](https://react.dev/)** and generated with **[Vite](https://vite.dev/)**.

## 🚀 Technical Features
- Integration with **[TMDB API](https://developer.themoviedb.org/docs/getting-started)**
- Real-time global ranking built with **[Fluid Framework](https://fluidframework.com/)**
- Centralized global states with **[Context API](https://react.dev/reference/react/createContext)**

## 🛠️ Installation and Setup

Follow the steps below to set up the project locally:

### 1. Prerequisites
Before starting, make sure you have the following installed/created:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Fluid Framework](https://fluidframework.com/) instance running on [Azure Fluid Relay](https://azure.microsoft.com/en-us/products/fluid-relay)
- [TMDB API](https://developer.themoviedb.org/docs/getting-started) tokens created

### 2. Clone the repository
Clone this repository to your local machine using:

```bash
git clone https://github.com/schutz-luca/cinebingo.git
```

### 3. Navigate to the project folder
Move into the project's directory:

```bash
cd cinebingo
```

### 4. Install dependencies
Install all required dependencies for the project.

```bash
npm install
```

or

```bash
yarn
```

### 5. Create environment file
Create a `.env` file in the root directory of the project and configure the required variables. Use the provided `.env.example` file as a reference:

```bash
cp .env.example .env
```

### 6. Start the Development Server
Run the development server to start the application.

```bash
npm run dev
```

or

```bash
yarn dev
```

## 📄 License

The MIT License (MIT)