'use strict'

// Main Variables //

const elSearchContainer = document.querySelector('.main-search-container')
const elMainGallery = document.querySelector('.main-gallery')
const elMainEdit = document.querySelector('.main-edit')
const elMainSaved = document.querySelector('.saved-gallery')
const elMainAbout = document.querySelector('.main-about')
const elBlank = document.querySelector('.blank')
const elSearch = document.querySelector('#search-input')
const elNav = document.querySelector('.main-nav')
const elBlackScreen = document.querySelector('.black-screen')

let fontSizes


// Init //

function onInit() {
    // cleans search input
    elSearch.value = ''

    // set displays of html sections
    elSearchContainer.style.display = 'flex'
    elMainGallery.style.display = 'grid'
    elMainSaved.style.display = 'none'
    elMainAbout.style.display = 'none'
    elMainEdit.style.display = 'none'

    // create and render keywords
    createKeyWords()
    renderKeywords()

    // render gallery
    renderGallery()
    removeMenu()
}

// Create Canvas //

function createCanvas() {
    gElCanvas = document.querySelector('.canvas-container canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
}

function resizeCanvas() {
    gElCanvas.width = gElCanvasContainer.offsetWidth
    gElCanvas.height = gElCanvasContainer.offsetHeight
}

// Render Gallery // 

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
        `<img class="gallery-img gallery-img${img.id}" src="${img.imgURL}" alt="" onclick="onImgSelect(${img.id})">`
    )
    elGrid.innerHTML = htmlStr.join('')
}


// Search bar //

function onSearchInput() {
    renderGallery()
}


// Pick or Upload a meme image //

function onImgSelect(imgId) {
    // set displays
    elSearchContainer.style.display = 'none'
    elMainGallery.style.display = 'none'
    elMainEdit.style.display = 'flex'

    // create the currect canvas size and set center pos
    createCanvas()
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

    // set new meme and renders the selected meme image to the edit section
    setNewMeme(imgId, center)
    renderMeme()

    // cleans edit text input value
    document.querySelector('.text-input').value = ''
}

function onImgUpload(ev) {
    // set displays 
    elSearchContainer.style.display = 'none'
    elMainGallery.style.display = 'none'
    elMainEdit.style.display = 'flex'

    // create the currect canvas size and set center pos
    createCanvas()
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

    // set new meme and render the uploaded image to the edit section
    setNewMeme(0, center)
    loadImageFromInput(ev, renderImg)

    // cleans edit text input value
    document.querySelector('.text-input').value = ''
}


// Keywords Function //


function createKeyWords() {
    let newFontSizes = loadFromStorage('keywordsDB') || null
    if (!newFontSizes) {
        newFontSizes = { 'spongbob': 45, 'sad': 15, 'facts': 50, 'wtf': 30 }
    }
    fontSizes = newFontSizes
    saveToStorage('keywordsDB', fontSizes)
}

function onWordClick(ev) {
    elSearch.value = (ev.innerHTML).toString()
    onSearchInput()

    const fontSizesLength = Object.keys(fontSizes).length
    for (let i = 0; i < fontSizesLength; i++) {
        const currKeyName = Object.keys(fontSizes)[i]
        if ((ev.innerHTML).toString() === (currKeyName).toString()) {

            if (fontSizes[currKeyName] >= 60) return
            fontSizes[currKeyName] += Object.keys(fontSizes).length - 1
        } else {

            if (fontSizes[currKeyName] <= 16) return
            fontSizes[currKeyName] -= 1
        }
    }
    saveToStorage('keywordsDB', fontSizes)
    renderKeywords()
}

function renderKeywords() {
    let htmlStr = ``

    const fontSizesKeys = Object.keys(fontSizes)
    for (let i = 0; i < fontSizesKeys.length; i++) {
        htmlStr += `<span onclick="onWordClick(this)" class="keyword keyword${i + 1}">${fontSizesKeys[i]}</span><span>   </span>`
    }

    document.querySelector('.search-keywords').innerHTML = htmlStr

    for (let i = 0; i < fontSizesKeys.length; i++) {
        const word = fontSizesKeys[i]
        document.querySelector(`.keyword${i + 1}`).style.fontSize = `${fontSizes[word]}px`
    }
}


// Save Memes //

// this function handles navbar "saved memes" click
function onSavedClick() {
    renderSavedMemes()
    removeMenu()
}

// this function renders saved memes from local storage
function renderSavedMemes() {
    elMainSaved.style.display = 'grid'
    elMainEdit.style.display = 'none'
    elSearchContainer.style.display = 'none'
    elMainGallery.style.display = 'none'

    let savedMemes = loadFromStorage('memesDB') || []

    let htmlStr = savedMemes.map(meme =>
        `
        <img onclick="onSavedMemeClick(this)" src="${meme}" alt="">
    `)
    document.querySelector('.main-saved').innerHTML = htmlStr.join('')
}

// handle saved meme click
function onSavedMemeClick(ev) {
    window.open(ev.src)
}

// About //

// this function handles navbar "About" click
function openAbout() {
    elMainAbout.style.display = 'flex'
    elMainAbout.classList.add('open-about')
    document.querySelector('.black').classList.add('black-open')
    removeMenu()
}

// this function closes the About modal
function closeAbout() {
    // elMainAbout.style.display = 'none'
    elMainAbout.classList.remove('open-about')
    document.querySelector('.black').classList.remove('black-open')
}

// Navbar Menu //

function toggleMenu() {
    elNav.classList.toggle('navbar-open')
    elBlackScreen.classList.toggle('black-screen-open')
}

function removeMenu() {
    elNav.classList.remove('navbar-open')
    elBlackScreen.classList.remove('black-screen-open')
}
