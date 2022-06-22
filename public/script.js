function addToCount() {
    let countAsString = document.querySelector('#count').innerHTML
    let countAsInteger = parseInt(countAsString)
    let newCount = countAsInteger += 1
    document.querySelector('#count').innerHTML = newCount

}

function subtractFromCount() {
    let countAsString = document.querySelector('#count').innerHTML
    let countAsInteger = parseInt(countAsString)
    let newCount = countAsInteger -= 1
    document.querySelector('#count').innerHTML = newCount
}

const likeButton = document.querySelector('#like-button')
const dislikeButton = document.querySelector('#dislike-button')

likeButton.addEventListener('click', _ => {

    fetch('/murals', {
        method: 'put',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify()
    }).then(response => {
        console.log(response)
        window.location.reload(true)
    })
})
dislikeButton.addEventListener('click', _ => {

    fetch('/murals', {
        method: 'put',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify()
    }).then(response => {
        console.log(response)
        window.location.reload(true)
    })
})