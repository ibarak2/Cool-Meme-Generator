'use strict'

let gElCanvas;
let gCtx;

function onTypingText() {
    const elText = document.querySelector('.edit-text input').value
    console.log("som");
    setMemeText(elText, 0)
    renderMeme()

}

function renderMeme() {
    const currMeme = getMeme()
    const elImg = document.querySelector(`.gallery-img${currMeme.selectedImgId}`)
    gElCanvas = document.querySelector('.canvas-container canvas')
    gCtx = gElCanvas.getContext('2d')
    // console.log(elImg);
    gElCanvas.width = 666
    gElCanvas.height = 666
    gCtx.drawImage(elImg, 0, 0, 666, 666)
    gCtx.font = '40px impact'
    gCtx.strokeText(currMeme.lines[0].text, gElCanvas.width / 2, gElCanvas.height / 2)

}