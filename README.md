# Product Search App

This project is a simple Next.js app, that allows users to search for products on Amazon using a keyword. The app fetches product data from a server-side API that performs web scraping on Amazon. The app brings products only when you pass a keyword on input area.

## Features

- **Search for Products**: Enter a product keyword in the search bar to fetch relevant products.
- **Dark Mode**: Toggle between light and dark modes for a better user experience.
- **Product Listings**: Display a list of products with their images, titles, ratings, and number of reviews.

## Tech Stack

- **Frontend**: React(Next.js), Framer Motion, Tailwind CSS
- **Backend**: Node.js (Scraping API), Typescript
- **UI Components**: React Bootstrap (for spinner and buttons)
- **Others:** Concurrently, nodemon

## Setup

To set up the project, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/product-search-app.git
```

### 2. Install Dependencies

Go to the project directory and runs the following command on both directories (backend and zonspy):

```
cd backend
npm install

//after

cd zonspy
npm install
```


### 3. Running the App

To start the App, use the command:

```
npm run dev
```

This will start the Next app development server and you can open the app in your browser at `http://localhost:3000` . The app uses Concurrently to start the backend and front, only using de next app.


## Troubleshooting

### 1. 404 Error When Searching Products

If you're getting a 404 error when attempting to fetch product data, ensure that your backend scraping service is running on the correct endpoint (`/api/keywords`) and that it can properly handle requests.

### 2. Missing Dependencies

Make sure you've installed all the necessary dependencies using `npm install` and that you have the required versions of Node.js and npm/yarn installed.


## Status Project

**Finished ✔**

## License

This project is licensed under the MIT License - see the [LICENSE]() file for details.
