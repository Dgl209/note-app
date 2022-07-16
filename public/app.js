document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === 'edit') {
        const res = prompt('Hello')
        if (res) {
            const id = event.target.dataset.id
            const li = event.target.closest('li')
            edit(id, res).then(() => {
                li.firstChild.remove()
                li.prepend(res)
            })
        }
    }
})

async function remove(id) {
   await fetch(`/${id}`, {
       method: 'DELETE'
   })
}

async function edit(id, title) {
    await fetch(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
}