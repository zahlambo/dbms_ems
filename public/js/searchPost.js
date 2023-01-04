const searchPost = document.querySelector('#search-post');
const searchResult = document.querySelector('#search-result');
const searchSuggestions = document.querySelector('#search-suggestions');

// Necessary variables.
let timeoutId;

// Necessary functions.
function addSearchResult(data) {
   // Creating Elements.
   const postContainer = document.createElement('div');
   const a = document.createElement('a');
   const title = document.createElement('h1');
   const content = document.createElement('p');
   const time = document.createElement('p');

   // Adding classes.
   postContainer.classList.add('post-container');
   content.classList.add('post-content');

   // Adding values
   a.href = `/post/showpost/${data.id}`;
   title.innerText = data.title;
   content.innerText = data.content;
   data.time = new Date(data.time);
   time.innerText = `${data.time.toDateString()}, ${data.time.getHours()}:${data.time.getMinutes()}`;
   // time.innerText = data.time;

   // Adding elements.
   a.appendChild(title);
   postContainer.appendChild(a);
   postContainer.appendChild(time)
   postContainer.appendChild(content);
   searchResult.appendChild(postContainer);
}

function clearSearchResult() {
   let i = 10;
   while(searchResult.firstChild) {
      searchResult.removeChild(searchResult.firstChild);
   }
}

// Adding suggestions on search bar.
function addSuggestion(data) {
   // Add suggestion for the first 10 data.
   data.forEach((data, index) => {
      if(index < 10) {
         // Creating elements.
         const li = document.createElement('li');
         const a = document.createElement('a');
         
         // Assigning values.
         a.href = `/post/showpost/${data.id}`;
         a.innerText = data.title;
         
         // Appending everything properly.
         li.appendChild(a);
         searchSuggestions.appendChild(li);
      }
   })
}

// Clear the suggestions on search bar.
function clearSuggestion() {
   while(searchSuggestions.firstChild) {
      searchSuggestions.removeChild(searchSuggestions.firstChild);
   }
}

// Adding events.

// Searching post with enter.
if(searchPost) {
   searchPost.addEventListener('keyup', e => {
      if(e.keyCode === 13) {
         clearSearchResult();
         clearSuggestion();
         fetch(`/api/post/${searchPost.value}`)
         .then(res => res.json())
         .then(datas => {
            datas.forEach(data => {
               addSearchResult(data);
            });
         });
      }
   });
}

// Show suggestions when searching.
if(searchPost) {
   searchPost.addEventListener('keyup', (e) => {
      if(timeoutId) {
         clearTimeout(timeoutId);
      }
      // if there is no value, search suggestions need to be cleared.
      timeoutId = setTimeout(() => {
         if(searchPost.value === '') {
            clearSuggestion();
         }
         // Need to make sure that enter, up, down, left,
         // right key was not presed
         else if(e.keyCode !== 13 && e.keyCode !== 37 && e.keyCode !== 38 && e.keyCode !== 39 && e.keyCode !== 40) {
            fetch(`/api/post/${searchPost.value}`)
            .then(res => {
               return res.json();
            })
            .then(data => {
               clearSuggestion();
               addSuggestion(data);
            })
         }
      }, 100);
   })
}

// Clear suggestions on click.
document.addEventListener('click', () => {
   if(searchSuggestions) {
      clearSuggestion();
   }
})


