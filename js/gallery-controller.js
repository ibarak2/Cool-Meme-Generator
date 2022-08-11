'use strict'

function renderGallery() {
    const elGrid = document.querySelector('.grid-container')
    const currSearchValue = document.getElementById('search-input').value
    let gallery
    if (!currSearchValue) {
        gallery = getGalleryForDisplay()
    } else {
        gallery = getGallerySearch(currSearchValue)
    }

    let htmlStr = gallery.map(img =>
        `
    <img class="gallery-img gallery-img${img.id}" src="${img.imgURL}" alt="" onclick="onImgSelect(${img.id})">
    `
    )
    elGrid.innerHTML = htmlStr.join('')

}

function onSearchInput() {
    renderGallery()
}