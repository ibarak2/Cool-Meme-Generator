'use strict'

// Main variables settings //
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const gElCanvasContainer = document.querySelector('.canvas-container')

let gElCanvas;
let gCtx;
let gStartPos
let gUserImage

// this function handles user text input 
function onTypingText() {
    // set current text input value to relevant gMeme text line
    const elText = document.querySelector('.edit-text input').value
    setMemeText(elText, gCurrLine)

    // sets current text width value
    const currMeme = getMeme()
    let txtWidth = gCtx.measureText(currMeme.lines[gCurrLine].text)
    setTextWidth(txtWidth.width)

    // handle mouse and touch events, then renders the meme
    addListeners()
    renderMeme()
}

//  this function checks if images was uploaded by the user or picked from the website gallery 
//  then renders the user text
function renderMeme() {
    const currMeme = getMeme()
    const elImg = document.querySelector(`.gallery-img${currMeme.selectedImgId}`)

    if (!elImg) {
        renderImg(gUserImage)
    } else {
        renderWebsiteImg(elImg)
    }

    renderText()
}

// render images functions //

function renderImg(img) {
    gUserImage = img

    const hRatio = gElCanvas.width / img.width
    const vRatio = gElCanvas.height / img.height
    const ratio = Math.min(hRatio, vRatio)
    var centerShift_x = (gElCanvas.width - img.width * ratio) / 2;
    var centerShift_y = (gElCanvas.height - img.height * ratio) / 2;
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = (event) => {
        var img = new Image()
        // console.log(img.height);
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }

    reader.readAsDataURL(ev.target.files[0])
}


function renderWebsiteImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


// render text functions //

function renderText() {
    const meme = getMeme()

    for (let i = 0; i < meme.lines.length; i++) {
        const newText = meme.lines[i]
        drawText(newText.pos.x, newText.pos.y, newText.color, newText.strokeColor, newText.size, newText.strokeSize, newText.text)
    }
}

function drawText(x, y, color, strokeColor, size, strokeSize, text) {

    gCtx.beginPath()
    gCtx.font = `${size}px Impact `
    gCtx.lineJoin = "miter";
    gCtx.miterLimit = 2;
    gCtx.fillStyle = color
    gCtx.strokeStyle = strokeColor
    gCtx.lineWidth = strokeSize;


    gCtx.strokeText(text, x, y)
    gCtx.fill()
    gCtx.fillText(text, x, y)
    gCtx.closePath()

}

// handle eventListeners //

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Getting the clicked position
    const pos = getEvPos(ev)

    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.querySelector('.canvas-container canvas').style.cursor = 'grabbing'
}

function onMove(ev) {
    let meme = getMeme();

    if (!meme.lines[gCurrLine].isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    gStartPos = pos
    renderMeme()
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function onUp() {
    setTextDrag(false)
    gElCanvas.style.cursor = 'auto'
    renderMeme()
}

// Edit Buttons //

function onAddNewText() {
    const elCanvas = document.querySelector('.canvas-container canvas')
    const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
    newTextLine(center)
    document.querySelector('.edit-text input').value = ''
}

function onChangeLine() {
    changeLine()
    const currTextLine = getMeme().lines[gCurrLine].text
    document.querySelector('.edit-text input').value = currTextLine
}

function onDeleteText() {
    const elCanvas = document.querySelector('.canvas-container canvas')
    const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
    deleteText(center)
    renderMeme()
    const currTextLine = getMeme().lines[gCurrLine].text
    document.querySelector('.edit-text input').value = currTextLine
}

function onFontSizeUp() {
    fontSizeUp()
    renderMeme()
}

function onFontSizeDown() {
    fontSizeDown()
    renderMeme()
}

function onStrokeSizeUp() {
    strokeSizeUp()
    renderMeme()
}

function onStrokeSizeDown() {
    strokeSizeDown()
    renderMeme()
}

function onFontColorChange() {
    const elFontColorVal = document.getElementById('font-color').value
    fontColorChange(elFontColorVal)
    renderMeme()
}

function onStrokeColorChange() {
    const elStrokeColorVal = document.getElementById('stroke-color').value
    strokeColorChange(elStrokeColorVal)
    renderMeme()
}

function onDownload() {
    const elDownload = document.querySelector('.edit-download button a')
    elDownload.download = 'meme.jpg'
    elDownload.href = gElCanvas.toDataURL()
}

function onSave() {
    saveImg()
    flashMsg('Saved to "Saved Memes"')
}

function onShareToFacebook() {
    shareImg()
}

// saved meme small massege //

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}