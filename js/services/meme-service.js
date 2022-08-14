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
                strokeSize: 10,
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
        strokeSize: 10,
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

    for (let i = 0; i < gMeme.lines.length; i++) {
        const line = gMeme.lines[i]
        const { pos, textWidth, size } = line
        const rectY = pos.y - size

        if (clickedPos.x > pos.x - 10 && clickedPos.x < pos.x + textWidth + 10 && clickedPos.y > rectY && clickedPos.y < rectY + size) {
            gCurrLine = i

            return true
        }
    }
    return false
}

//
function calcRectX(line, txtWidth) {

    let x = line.pos.x - txtWidth * 0.3

    return x
}
//

function setTextDrag(isDrag) {
    gMeme.lines[gCurrLine].isDrag = isDrag
}

function moveText(dx, dy) {
    gMeme.lines[gCurrLine].pos.x += dx
    gMeme.lines[gCurrLine].pos.y += dy
}

