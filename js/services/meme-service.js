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
                isDrag: false
            }
        ]
    }
    console.log(gMeme);
}

function getMeme() {
    const meme = gMeme
    return meme
}

function setMemeText(memeText, lineIdx) {
    gMeme.lines[lineIdx].text = memeText
}

function newTextLine(pos) {
    let newText = {
        text: '',
        size: 40,
        strokeSize: 8,
        color: 'white',
        strokeColor: 'black',
        pos,
        isDrag: false
    }

    gMeme.lines.push(newText)
    console.log("Add new Text");
    gCurrLine++
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

// handle text dragging //
function isTextClicked(clickedPos) {
    const { pos } = gMeme.lines[gCurrLine]
    // console.log(pos);
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= 50
}

function setTextDrag(isDrag) {
    gMeme.lines[gCurrLine].isDrag = isDrag
}

function moveText(dx, dy) {
    gMeme.lines[gCurrLine].pos.x += dx
    gMeme.lines[gCurrLine].pos.y += dy
}

