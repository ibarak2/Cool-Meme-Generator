'use strict'

const gSavedMemesDB = 'memesDB'

let gSavedMeme = loadFromStorage(gSavedMemesDB) || []


function saveImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        const newImgUrl = getImgUrl(uploadedImgUrl)
        gSavedMeme.push(newImgUrl)
        saveToStorage(gSavedMemesDB, gSavedMeme)
        console.log(gSavedMeme);

    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function shareImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    function onSuccessFacebook(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

    }

    doUploadImgFacebook(imgDataUrl, onSuccessFacebook);
}

function doUploadImgFacebook(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function getImgUrl(uploadedImgUrl) {
    const newStr = uploadedImgUrl.split('id=')
    let newUrl = 'http://ca-upload.com/here/img/' + newStr[newStr.length - 1] + '.jpg'
    console.log(newUrl);

    return newUrl

}
