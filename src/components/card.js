import axios from 'axios'

const Card = (article) => {
  
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

    //create elements
    const card = document.createElement('div');
    const headline = document.createElement('div');
    const authorContainer = document.createElement('div');
    const imgContainer = document.createElement('div');
    const image = document.createElement('img');
    const authorName = document.createElement('span');
  
    //organize elements
    card.appendChild(headline);
    card.appendChild(authorContainer);
    authorContainer.appendChild(imgContainer);
    authorContainer.appendChild(authorName);
    imgContainer.appendChild(image);
  
    //add classes
    card.classList.add('card');
    headline.classList.add('headline');
    authorContainer.classList.add('author');
    imgContainer.classList.add('img-container');
  
    //add content
    headline.textContent = article.headline;
    image.src = article.authorPhoto
    authorName.textContent= article.authorName

    //event listener
    card.addEventListener('click', () =>{
      console.log(article.headline)
    })

    return card;

}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get(`http://localhost:5001/api/articles`)
  .then(response =>{

    const javascriptArticles = response.data.articles.javascript;  
    const bootstrapArticles = response.data.articles.bootstrap;
    const jqueryArticles = response.data.articles.jquery;
    const nodeArticles = response.data.articles.node;    
    const technologyArticles = response.data.articles.technology;

    javascriptArticles.forEach(element => {
      const jsObject = element;
      const jsContent = Card(jsObject);
      document.querySelector(selector).appendChild(jsContent);
    });

    bootstrapArticles.forEach(element => {
      const bsObject = element;
      const bsContent = Card(bsObject);
      document.querySelector(selector).appendChild(bsContent);
    });

    jqueryArticles.forEach(element => {
      const jqObject = element;
      const jqContent = Card(jqObject);
      document.querySelector(selector).appendChild(jqContent);
    });

    nodeArticles.forEach(element => {
      const nObject = element;
      const nContent = Card(nObject);
      document.querySelector(selector).appendChild(nContent);
    });

    technologyArticles.forEach(element => {
      const tObject = element;
      const tContent = Card(tObject);
      document.querySelector(selector).appendChild(tContent);
    });


  }).catch(error =>{
    console.log("this is the error:")
    console.error(error);
});

}

export { Card, cardAppender }
