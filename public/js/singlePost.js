const commentText = document.querySelector('#comment-text');

const postId = window.location.href.split('/')[5];

commentText.addEventListener('keyup', e => {
   
   if(e.keyCode === 13) {
      fetch(`/api/post/${postId}/comment`, {
         method: "POST",
         body: JSON.stringify({
            comment: commentText.value
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8'
         }
      })
      commentText.value = '';
   }
})

