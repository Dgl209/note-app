let editModeInput
let inputValue

const handleListener = (type, id, event) => {
  switch (type) {
    case 'remove': 
      remove(id).then(() => event.target.closest('li').remove())
      break
    case 'update':
      getEditMode(event, id)
      break
    case 'save': {
      update(id, editModeInput.value)
      resetEditMode(id, 'save')
      break
    }
    case 'cancel':
      resetEditMode(id, 'cancel')
      break 
  } 
}

document.addEventListener('click', event => {
    const dataType = event.target.dataset.type
    const id = event.target.dataset.id
    handleListener(dataType, id, event) 
})

async function remove(id) {
   await fetch(`/${id}`, {
       method: 'DELETE'
   })
}

async function update(id) {
    await fetch(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: editModeInput.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
}

function resetEditMode(id, type = 'cancel') {
  const closestDiv = event.target.closest('div')
  const closestLi = event.target.closest('li')
  
  closestDiv.innerHTML = `
  <button class='btn btn-primary' data-type='update' data-id=${id}>Update</button>
  <button class='btn btn-danger' data-type='remove' data-id=${id}>&times;</button>
  `
  const newValue = closestLi.firstChild.value
  closestLi.firstChild.remove()
  if(type === 'save') {
    closestLi.prepend(newValue)
  } else {
    closestLi.prepend(inputValue)
  }
}

function getEditMode(event, id) {
      const closestDiv = event.target.closest('div')
      const closestLi = event.target.closest('li')
      inputValue = closestLi.firstChild.textContent.trim()

      const editModeBtns = getEditModeBtns(id)
      editModeInput = getEditModeInput()
      closestLi.firstChild.remove()
      closestDiv.innerHTML = editModeBtns
      closestLi.prepend(editModeInput)
}

function getEditModeInput() {
  const input = document.createElement('input')
  input.type = 'text'
  input.name = 'title'
  input.value = inputValue
  return input
}

function getEditModeBtns(id) {
  return `
  <button class='btn btn-primary' data-type='save' data-id='${id}'>Save</button>
  <button class='btn btn-danger' data-type='cancel'>Cancel</button>
  `
}
