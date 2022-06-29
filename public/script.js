function postIdLike(button) {
    //console.log(postId)
    let postId = (button.value);
    fetch(`/like/${postId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
    })
}

function postIdDislike(button) {
    let postId = (button.value);
    fetch(`/dislike/${postId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
    })
}