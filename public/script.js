function postIdLike(button) {
    //console.log(postId)
    let postId = (button.value);
    fetch(`/like/${postId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
    }).then((_) => {
        let count = button.getAttribute("data-count");
        count++
        button.setAttribute("data-count", count)
        button.innerHTML = `Like ${count}`
    })

}

function postIdDislike(button) {
    let postId = (button.value);
    fetch(`/dislike/${postId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
    }).then((_) => {
        let count = button.getAttribute("data-count");
        count++
        button.setAttribute("data-count", count)
        button.innerHTML = `Dislike ${count}`
    })
}