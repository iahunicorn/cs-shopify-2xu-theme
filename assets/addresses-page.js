function getContainers() {
  return document.querySelectorAll('[data-address-container]')
}

/**
 * Manages the target url of the back arrow on mobile. On the add and edit pages, you should be navigated back to /account/addresses
 * @param {'ca-overview' | 'ca-add' |  'ca-edit'} targetId
 */
function changeAccountArrowHref(targetId) {
  const acceptedArguments = ['ca-overview', 'ca-add', 'ca-edit']
  if (!targetId || !acceptedArguments.includes(targetId)) {
    console.warn('Invalid id provided at changeAccountArrowRef, targetId: ', targetId, ' accepted arguments: ', acceptedArguments)
    return
  }
  const arrowEl = document.querySelector('a.account-arrow')
  switch (targetId) {
    case 'ca-overview':
      arrowEl.href = '/account'
      return
    case 'ca-add':
    case 'ca-edit':
      arrowEl.href = '/account/addresses'
      return
    default:
      return
  }
}

/**
 * Manages visibility of address containers
 * ca here used as a prefix meaning container-address to reduce the likelihood of an id collision.
 * @param {'ca-overview' | 'ca-add' | 'ca-edit'} targetId
 */
function toggleContainerVisibility(targetId) {
  const acceptedTargetIds = ['ca-overview', 'ca-add', 'ca-edit']
  const containerEls = getContainers()
  if (!targetId || !acceptedTargetIds.includes(targetId)) {
    console.warn('Invalid id provided at toggleContainerVisibility, targetId: ', targetId, ' accepted target ids: ', acceptedTargetIds)
    return
  }
  containerEls.forEach((el) => {
    if (el.id === targetId) {
      el.classList.add('d-block')
    } else {
      el.classList.remove('d-block')
    }
  })
}

/**
 *
 * @param {'new address' | 'overview' | 'edit'} title
 */
function changeAccountTitle (title) {
  const acceptedTitles = ['new address', 'overview', 'edit']
  const titleEl = document.querySelector('.account-title')
  if (!title || !acceptedTitles.includes(title)) {
    console.warn('Invalid title provided at changeAccountTItle, title: ', title, ' accepted titles ', acceptedTitles)
  }
  switch (title) {
    case 'new address':
      titleEl.innerText = 'Add a new address'
      return
    case 'overview':
      titleEl.innerText = 'Addresses'
      return
    case 'edit':
      titleEl.innerText = 'Edit an address'
      return
    default:
      return
  }
}

/**
 * Manages the visibility of the add new address button. It should only appear on the account overview.
 * @param {boolean} hide
 */
function toggleNewAddressButtonVisibility (hide) {
  const addAddressBtn = document.querySelector('.new-address-btn')
  if (hide) {
    addAddressBtn.classList.add('d-none')
  } else {
    addAddressBtn.classList.remove('d-none')
  }
}

function addNewAddress () {
  location.hash = 'add'
}

function editAddress (addressId) {
  location.hash = 'edit'
  const addressForm = document.getElementById('modal-' + addressId)
  addressForm.classList.remove('d-none')
}

function handleHashChange () {
  switch (location.hash) {
    case !location.hash:
    case '':
      toggleContainerVisibility('ca-overview')
      toggleNewAddressButtonVisibility(false)
      changeAccountArrowHref('ca-overview')
      changeAccountTitle('overview')
      return
    case '#add':
      toggleContainerVisibility('ca-add')
      toggleNewAddressButtonVisibility(true)
      changeAccountArrowHref('ca-add')
      changeAccountTitle('new address')
      return
    case '#edit':
      toggleContainerVisibility('ca-edit')
      toggleNewAddressButtonVisibility(true)
      changeAccountArrowHref('ca-edit')
      changeAccountTitle('edit')
      return
    default:
      return
  }
}

window.addEventListener('hashchange', handleHashChange)
