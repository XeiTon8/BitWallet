# 📜 Bit Wallet
An e-commerce SPA built with React & Redux (front-end) and firebase (back-end, auth). Displays available products from the database to visitors. Users may use Create (add products), Read (search for products) and Delete (delete products from cart/favorites list) operations. 

 **Functionality**:
+ Busket;
+ Searching;
+ Authentication;
+ Viewving placed orders (after signing up);
+ Setting up total price of items added to the cart;
+ Routing.

👉 **Live Demo**: https://xeiton8.github.io/BitWallet

## 🚀 Stack
+ Frontend: React, Redux;
+ Backend: Firebase Firestore;
+ Auth: Firebase Authentication;
+ Testing: Jest;
+ Libraries: React Router, React Device Detect;
+ Additional: SASS, BEM;

## 🌠 Motivation
Used this project to improve my skills with JavaScript and React, BEM naming, 3d-applications APIs and problems solving.

What have I learned:

**1. DRY principle and creating simple custom hooks and using it instead of functions with mostly repetitve actions**.

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

I've learned how to create and use some unit tests (e.g. for routing, event handling, checking state of elements). 

## Building process
Summary:

+ Created a custom hook to fetch data from Firebase and set it to state. As a result, replaced 5 almost the same functions for fetching with the custom hook and reduced the quantity of lines of code.

+ Developed adding/removing items to cart/favorites with React-Redux and Firebase API.

+ Added pages (checkout, favorites, orders, catalog) and routing with React router. 

+ Included searching for products. Users can search for goods in lower or upper case, after clicking the button they’ll be redirected to a catalog page containing searched products.

+ Used firebase to create authentication. After visiting the site for the first time, a client gets an anonymous account which allows to have his own cart and favorites. The client can get a permanent account either after confirming an order or signing up via popup form, after which they can view placed orders.


## 🔨 To-Do
- [x] Rewrite the project with TypeScript;

- [x] Add Redux and use it instead of handling state in components;

- [x] Learn useRef hook and start using refs instead of document.getElementByID.
