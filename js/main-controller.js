'use strict'

const elSearchContainer = document.querySelector('.main-search-container')
const elMainGallery = document.querySelector('.main-gallery')
const elMainEdit = document.querySelector('.main-edit')

function onInit() {
    gElCanvas = document.querySelector('.canvas-container canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    elMainEdit.style.display = 'none'

    console.log("hi");
    renderGallery()

}

function onImgSelect(imgId) {
    const elCanvas = document.querySelector('.canvas-container canvas')
    const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
    // console.log(center);

    setNewMeme(imgId, center)
    renderMeme()



    elSearchContainer.style.display = 'none'
    elMainGallery.style.display = 'none'
    elMainEdit.style.display = 'flex'


}

function onImgUpload(ev) {
    const elCanvas = document.querySelector('.canvas-container canvas')
    const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
    setNewMeme(0, center)
    loadImageFromInput(ev, renderImg)

    elSearchContainer.style.display = 'none'
    elMainGallery.style.display = 'none'
    elMainEdit.style.display = 'flex'

}





function onSearchSubmit(e) {
    e.preventDefault()
    const elSearch = document.querySelector('.search-form input')
    const searchVal = elSearch.value

    elSearch.value = ''
}