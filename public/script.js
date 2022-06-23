function addToCount(button) {
    let imageId = button.value
    fetch(`/upvote/${imageId}`, { method: 'PUT' })
    console.log(imageId)
}