# 📜 Bit Wallet
A simple commercial single page application made with React. Fetches data from the backend and visualizes list of products available for customers to buy, as well as some other information (e.g. reviews, articles). The idea & design were taken from a project I've found on freelance site. 

 **Functionality**:
+ Adding and removing products to/from cart, favorites;
+ Searching for products and viewing results after redirecting to page with the result;
+ Creating account via Firebase through e-mail and password;
+ Viewving placed orders (after signing up);
+ Setting up total price of items added to the cart;

👉 **Live Demo**: https://xeiton8.github.io/BitWallet

## 🚀 Stack
+ Frontend: React;
+ Backend: Firebase Firestore;
+ Auth: Firebase Authentication;
+ Testing: Jest;
+ Libraries: React Router, React Device Detect;
+ Additional: SASS, BEM;

## 🌠 Motivation
Used this project to improve my skills with JavaScript and React, BEM naming, 3d-applications APIs and problems solving.

What have I learned:

**1. Creating simple custom hook and using it instead of functions with mostly repetitve actions**.

For example, I've had to fetch some data from Firebase Firestore (such as: categories of products, products themselves, brands and reviews) and then display it to a user.

Before I was using fetch function for each data:
```async function fetchCategories() {
            try {
            await getDocs(collection(db, categories))
            .then((snapshot) => {
              const categoriesData = snapshot.docs.map((doc) => ({...doc.data()}));
              setCategories([...categoriesData])}) 
             } catch(e) {
            console.error(e)
            }}
```

Such solution was creating a lot of almost same code with small differences. After moving fetch function into a <a href="https://github.com/XeiTon8/BitWallet/blob/main/src/hooks/useFetch.js">custom hook</a>, fetching could be done with shorter and more simple code:

```const [categories] = useFetch("categories")```

**2. Exploring and using APIs to solve problems**.

Sometimes I was struggling with Firebase and getting different problems. Foe example, deleting a product from backend required getting document ID of the current product that will be deleted. To get an ID, I've had to fetch it via Firebase API first and then add it to an existing product's document through updating the document itself.

**3. Creating unit tests**.

Although not the whole app is covered with tests yet, I've learned how to create and use some unit tests (e.g. for routing, event handling, checking state of elements). 

## 🔨 To-Do
- [x] Rewrite the project with TypeScript;

- [ ] Add Redux and use it instead of handling state in components;

- [ ] Create filtering for products;

- [ ] Create an admin role and CRUD operations for it;

- [ ] Write more tests for components;

- [ ] Learn useRef hook and start using refs instead of document.getElementByID in some functions.
