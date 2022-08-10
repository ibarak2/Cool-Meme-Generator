'use strict'



const elSearchContainer = document.querySelector('.main-search-container')
const elMainGallery = document.querySelector('.main-gallery')
const elMainEdit = document.querySelector('.main-edit')

function onInit() {
    // elMainEdit.style.display = 'none'
    // elSearchContainer.style.display = 'none'
    // elMainGallery.style.display = 'none'

    console.log("hi");
    renderGallery()

}

function onImgSelect(imgId) {
    setNewMeme(imgId)
    renderMeme(imgId)

    // gCtx.font = '16px impact'
    // gCtx.fillText('Hi', gElCanvas.width / 2, gElCanvas.height / 4)





    // elSearchContainer.style.display = 'none'
    // elMainGallery.style.display = 'none'

}

function onImgUpload(ev) {
    loadImageFromInput(ev, renderImg)

}

function loadImageFromInput(ev, onImageReady) {

}


function onSearchSubmit(e) {
    e.preventDefault()
    const elSearch = document.querySelector('.search-form input')
    const searchVal = elSearch.value

    elSearch.value = ''
}