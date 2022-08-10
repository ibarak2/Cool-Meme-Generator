'use strict'

let gMeme

function setNewMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                text: '',
                size: 16,
                align: "center",
                color: 'white'
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

