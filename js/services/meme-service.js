'use strict'

let gMeme
let gCurrLine

function setNewMeme(imgId, pos) {
    gCurrLine = 0
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: gCurrLine,
        lines: [
            {
                text: '',
                size: 40,
                color: 'white',
                strokeColor: 'black',
                strokeSize: 8,
                pos,
                isDrag: false,
                textWidth: 0
            }
        ]
    }
}

// CRUDL functions //

function getMeme() {
    const meme = gMeme

    return meme
}

function newTextLine(pos) {
    let newText = {
        text: '',
        size: 40,
        strokeSize: 8,
        color: 'white',
        strokeColor: 'black',
        pos,
        isDrag: false,
        textWidth: 0
    }

    gMeme.lines.push(newText)
    gCurrLine = gMeme.lines.length - 1
}

function setMemeText(memeText, lineIdx) {
    gMeme.lines[lineIdx].text = memeText
}

function setTextWidth(width) {
    gMeme.lines[gCurrLine].textWidth = width
}


function changeLine() {
    if (gCurrLine === (gMeme.lines.length - 1)) {
        gCurrLine = 0
    } else {
        gCurrLine++
    }
}

function deleteText(pos) {
    if (gMeme.lines.length === 1) {
        gMeme.lines[gCurrLine].text = ''
        gMeme.lines[gCurrLine].pos = pos
        document.querySelector('.edit-text input').value = ''
        return
    }

    gMeme.lines.splice(gCurrLine, 1)
    if (gCurrLine === 0) return
    gCurrLine--
}

function fontSizeUp() {
    gMeme.lines[gCurrLine].size += 2
}

function fontSizeDown() {
    if (gMeme.lines[gCurrLine].size === 10) return
    gMeme.lines[gCurrLine].size -= 2
}

function strokeSizeUp() {
    gMeme.lines[gCurrLine].strokeSize += 1
}

function strokeSizeDown() {
    if (gMeme.lines[gCurrLine].strokeSize === 0) return
    gMeme.lines[gCurrLine].strokeSize -= 1
}

function fontColorChange(fontColor) {
    gMeme.lines[gCurrLine].color = fontColor
}

function strokeColorChange(strokeColor) {
    gMeme.lines[gCurrLine].strokeColor = strokeColor
}


// Handle text dragging //

function isTextClicked(clickedPos) {
    const { pos } = gMeme.lines[gCurrLine]
    const { textWidth } = gMeme.lines[gCurrLine]
    const { size } = gMeme.lines[gCurrLine]

    const distance = Math.sqrt(((pos.x + textWidth / 2) - clickedPos.x) ** 2 + ((pos.y - size / 2) - clickedPos.y) ** 2)

    return distance <= textWidth / 2
}

function setTextDrag(isDrag) {
    gMeme.lines[gCurrLine].isDrag = isDrag
}

function moveText(dx, dy) {
    gMeme.lines[gCurrLine].pos.x += dx
    gMeme.lines[gCurrLine].pos.y += dy
}

