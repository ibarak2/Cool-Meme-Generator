'use strict'

const elSearchContainer = document.querySelector('.main-search-container')
const elMainGallery = document.querySelector('.main-gallery')
const elMainEdit = document.querySelector('.main-edit')
const elMainSaved = document.querySelector('.main-saved')
const elMainAbout = document.querySelector('.main-about')
const elBlank = document.querySelector('.blank')
const elSearch = document.querySelector('#search-input')
const elNav = document.querySelector('.main-nav')
const elBlackScreen = document.querySelector('.black-screen')


let fontSizes


// Init //

function onInit() {
    console.log("hi");

    elSearch.value = ''

    elSearchContainer.style.display = 'flex'
    elMainGallery.style.display = 'grid'
    elMainSaved.style.display = 'none'
    elMainAbout.style.display = 'none'
    elMainEdit.style.display = 'none'

    createKeyWords()
    renderKeywords()

    renderGallery()
    removeMenu()
}

// Create Canvas //

function createCanvas() {
    gElCanvas = document.querySelector('.canvas-container canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
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
        `
    <img class="gallery-img gallery-img${img.id}" src="${img.imgURL}" alt="" onclick="onImgSelect(${img.id})">
    `
    )
    elGrid.innerHTML = htmlStr.join('')

}

function onSearchInput() {
    renderGallery()
}


// Pick or Upload a meme //

function onImgSelect(imgId) {
    elSearchContainer.style.display = 'none'
    elMainGallery.style.display = 'none'
    elMainEdit.style.display = 'flex'

    createCanvas()

    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

    setNewMeme(imgId, center)
    renderMeme()

    document.querySelector('.text-input').value = ''

}

function onImgUpload(ev) {
    elSearchContainer.style.display = 'none'
    elMainGallery.style.display = 'none'
    elMainEdit.style.display = 'flex'

    createCanvas()

    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

    setNewMeme(0, center)
    loadImageFromInput(ev, renderImg)

    document.querySelector('.text-input').value = ''



}


// Keywords Function //

function onWordClick(ev) {
    document.getElementById('search-input').value = (ev.innerHTML).toString()
    onSearchInput()
    for (let i = 0; i < Object.keys(fontSizes).length; i++) {


        if ((ev.innerHTML).toString() === (Object.keys(fontSizes)[i]).toString()) {
            if (fontSizes[Object.keys(fontSizes)[i]] >= 60) return
            fontSizes[Object.keys(fontSizes)[i]] += Object.keys(fontSizes).length - 1
        } else {
            if (fontSizes[Object.keys(fontSizes)[i]] <= 16) return
            fontSizes[Object.keys(fontSizes)[i]] -= 1
        }
    }
    saveToStorage('keywordsDB', fontSizes)
    renderKeywords()

}

function renderKeywords() {
    let htmlStr = ``

    for (let i = 0; i < Object.keys(fontSizes).length; i++) {
        htmlStr += `<span onclick="onWordClick(this)" class="keyword keyword${i + 1}">${Object.keys(fontSizes)[i]}</span><span>   </span>`
    }

    document.querySelector('.search-keywords').innerHTML = htmlStr

    for (let i = 0; i < Object.keys(fontSizes).length; i++) {
        const word = Object.keys(fontSizes)[i]

        document.querySelector(`.keyword${i + 1}`).style.fontSize = `${fontSizes[word]}px`

    }
}

function createKeyWords() {
    let newFontSizes = loadFromStorage('keywordsDB') || null
    if (!newFontSizes) {
        newFontSizes = { 'spongbob': 45, 'sad': 15, 'facts': 50, 'wtf': 30 }
    }
    fontSizes = newFontSizes
    saveToStorage('keywordsDB', fontSizes)
}


// Save Memes //

function onSavedClick() {
    renderSavedMemes()
    removeMenu()
}

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

function onSavedMemeClick(ev) {
    console.log(ev.src);
    window.open(ev.src)

}

// About //

function openAbout() {
    elMainAbout.style.display = 'flex'
    elMainAbout.classList.add('open-about')
    document.querySelector('.black').classList.add('black-open')
    removeMenu()
}

function closeAbout() {
    // elMainAbout.style.display = 'none'
    elMainAbout.classList.remove('open-about')
    document.querySelector('.black').classList.remove('black-open')
}

// navbar menu // 
function toggleMenu() {
    elNav.classList.toggle('navbar-open')
    elBlackScreen.classList.toggle('black-screen-open')

}

function removeMenu() {
    elNav.classList.remove('navbar-open')
    elBlackScreen.classList.remove('black-screen-open')

}
