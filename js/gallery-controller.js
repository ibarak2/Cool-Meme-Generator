'use strict'

function renderGallery() {
    const elGrid = document.querySelector('.grid-container')
    const gallery = getGallery()


    let htmlStr = gallery.map(img =>
        `
    <img class="gallery-img gallery-img${img.id}" src="${img.imgURL}" alt="" onclick="onImgSelect(${img.id})">
    `
    )
    elGrid.innerHTML = htmlStr.join('')

}

