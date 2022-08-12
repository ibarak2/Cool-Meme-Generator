'use strict'

let gElCanvas;
let gCtx;
let gStartPos
let gUserImage

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const gElCanvasContainer = document.querySelector('.canvas-container')

function onTypingText() {
    const elText = document.querySelector('.edit-text input').value
    console.log("som");
    setMemeText(elText, gCurrLine)
    addListeners()
    renderMeme()
    console.log(gMeme);

}

function renderMeme() {
    const currMeme = getMeme()
    const elImg = document.querySelector(`.gallery-img${currMeme.selectedImgId}`)
    // console.log(elImg);
    if (!elImg) {
        renderImg(gUserImage)
    } else {
        renderWebsiteImg(elImg)
    }


    renderText()

}

function resizeCanvas() {
    gElCanvas.width = gElCanvasContainer.offsetWidth
    gElCanvas.height = gElCanvasContainer.offsetHeight
}

function renderText() {
    const meme = getMeme()
    for (let i = 0; i < meme.lines.length; i++) {
        const newText = meme.lines[i]
        drawText(newText.pos.x, newText.pos.y, newText.color, newText.strokeColor, newText.size, newText.strokeSize, newText.text)

    }

}

function renderWebsiteImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
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
    // { x: 15, y : 15 }
    if (!isTextClicked(pos)) return
    console.log("Clicked");
    setTextDrag(true)
    gStartPos = pos
    document.querySelector('.canvas-container canvas').style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme();

    // console.log(ev);
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
    gElCanvas.style.cursor = 'grab'
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

// saved massege //

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}