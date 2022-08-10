'use strict'


let gGallery = [
    {
        id: 1,
        imgURL: 'imgs/gallery-imgs/1.jpg',
        keywords: ['trump', 'facts']
    },
    {
        id: 2,
        imgURL: 'imgs/gallery-imgs/2.jpg',
        keywords: ['puppys', 'cute', 'love']
    },
    {
        id: 3,
        imgURL: 'imgs/gallery-imgs/3.jpg',
        keywords: ['baby', 'puppy', 'sleepy']
    },
]

function getGallery() {
    const gallery = gGallery
    return gallery
}

function getImgById(imgId) {
    const gallery = gGallery
    let img = gallery.find(element => element.id === imgId)
    return img
}

