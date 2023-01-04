const categoryBtn = document.querySelector('#category-btn');
const newCategory = document.querySelector('#new-category');
const selectCategory = document.querySelector('#select-category');
const submitBtn = document.querySelector('#submit-btn');
const postForm = document.querySelector('#post-form');

categoryBtn.addEventListener('click', () => {
  if(selectCategory.classList.contains('hidden')) {
    newCategory.classList.add('hidden');
    selectCategory.classList.remove('hidden');
    categoryBtn.innerText = 'New Category';
  }
  else {
    selectCategory.classList.add('hidden');
    newCategory.classList.remove('hidden');
    categoryBtn.innerText = 'Select Category';
  }
});






submitBtn.addEventListener('click', (e) => {
  if(selectCategory.classList.contains('hidden')) {
    newCategory.name = 'category';
  }
  else {
    selectCategory.name = 'category';
  }
  postForm.submit();
})
