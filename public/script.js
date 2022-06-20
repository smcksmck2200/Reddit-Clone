const update = document.querySelector('#likevote-button')
const deleteButton = document.querySelector('#dislikevote-button')

update.addEventListener('click', _ => {
    const like = {
        muralTitle: "this is new entry",
        image: "testimage123"
    }
    fetch('/murals', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(like)
    }).then(res => {
        console.log(res)
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
    const unlike = {
        muralTitle: "this is new entry",
    }
    fetch('/murals', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(unlike)
    }).then(res => {
        console.log(res)
    })
})