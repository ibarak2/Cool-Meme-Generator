'use strict'

const elSearchContainer = document.querySelector('.main-search-container')
const elMainGallery = document.querySelector('.main-gallery')
const elMainEdit = document.querySelector('.main-edit')
const elMainSaved = document.querySelector('.main-saved')
const elMainAbout = document.querySelector('.main-about')
const elBlank = document.querySelector('.blank')
const elSearch = document.querySelector('#search-input')


let fontSizes


// Init //

function onInit() {
    console.log("hi");
    elSearch.value = ''
    gElCanvas = document.querySelector('.canvas-container canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    elSearchContainer.style.display = 'flex'
    elMainGallery.style.display = 'grid'
    elMainSaved.style.display = 'none'
    elMainAbout.style.display = 'none'
    elMainEdit.style.display = 'none'
    // elSearchContainer.style.display = 'none'
    // elMainGallery.style.display = 'none'
    createKeyWords()
    renderKeywords()

    renderGallery()

}


// Pick or Upload a meme //

function onImgSelect(imgId) {
    gElCanvas = document.querySelector('.canvas-container canvas')
    gCtx = gElCanvas.getContext('2d')
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
    gElCanvas = document.querySelector('.canvas-container canvas')
    gCtx = gElCanvas.getContext('2d')
    const elCanvas = document.querySelector('.canvas-container canvas')
    const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
    setNewMeme(0, center)
    loadImageFromInput(ev, renderImg)

    elSearchContainer.style.display = 'none'
    elMainGallery.style.display = 'none'
    elMainEdit.style.display = 'flex'

}


// Search Function //

function onSearchSubmit(e) {
    e.preventDefault()
    const elSearch = document.querySelector('.search-form input')
    const searchVal = elSearch.value

    elSearch.value = ''
}


// Keywords Function //

function onWordClick(ev) {
    document.getElementById('search-input').value = (ev.innerHTML).toString()
    onSearchInput()
    renderKeywords()
    for (let i = 0; i < Object.keys(fontSizes).length; i++) {


        if ((ev.innerHTML).toString() === (Object.keys(fontSizes)[i]).toString()) {
            if (fontSizes[Object.keys(fontSizes)[i]] >= 100) return
            fontSizes[Object.keys(fontSizes)[i]] += Object.keys(fontSizes).length - 1
        } else {
            if (fontSizes[Object.keys(fontSizes)[i]] <= 10) return
            fontSizes[Object.keys(fontSizes)[i]] -= 1
        }
    }
    saveToStorage('keywordsDB', fontSizes)

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
        newFontSizes = { 'spongbob': 55, 'sad': 15, 'facts': 60, 'wtf': 30 }
    }
    fontSizes = newFontSizes
    saveToStorage('keywordsDB', fontSizes)
}


// Save Memes //

function onSavedClick() {
    renderSavedMemes()
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
}

function closeAbout() {
    elMainAbout.style.display = 'none'
    elMainAbout.classList.remove('open-about')

}
