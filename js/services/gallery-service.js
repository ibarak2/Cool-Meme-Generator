'use strict'


let gGallery = [
    {
        id: 1,
        imgURL: 'imgs/good-memes/1.jpg',
        keywords: ['kanye', 'facts', 'ye']
    },
    {
        id: 2,
        imgURL: 'imgs/good-memes/2.jpg',
        keywords: ['spongbob', 'facts', 'wtf']
    },
    {
        id: 3,
        imgURL: 'imgs/good-memes/3.jpg',
        keywords: ['wth', 'meme', 'wtf', 'weird']
    },
    {
        id: 4,
        imgURL: 'imgs/good-memes/4.jpg',
        keywords: ['buttons', 'choices', 'red']
    },
    {
        id: 5,
        imgURL: 'imgs/good-memes/5.jpeg',
        keywords: ['pills', 'facts', 'hard to swallow',]
    },
    {
        id: 6,
        imgURL: 'imgs/good-memes/6.jpg',
        keywords: ['chad', 'facts', 'sad', 'megachad']
    },
    {
        id: 7,
        imgURL: 'imgs/good-memes/7.png',
        keywords: ['spongbob', 'facts', 'nope', 'note']
    },
    {
        id: 8,
        imgURL: 'imgs/good-memes/8.jpg',
        keywords: ['ok', 'umm', 'rolling eyes', 'wtf']
    },
    {
        id: 9,
        imgURL: 'imgs/good-memes/9.png',
        keywords: ['oh', 'yeah', 'damn']
    },
    {
        id: 10,
        imgURL: 'imgs/good-memes/10.png',
        keywords: ['friends', 'meme', 'ross']
    },
    {
        id: 11,
        imgURL: 'imgs/good-memes/11.jpg',
        keywords: ['arthur', 'fist', 'mad']
    },
    {
        id: 12,
        imgURL: 'imgs/good-memes/12.jpg',
        keywords: ['doge', 'strong', 'gen z']
    },
    {
        id: 13,
        imgURL: 'imgs/good-memes/13.jpg',
        keywords: ['winnie the pooh', 'gentelman', 'bear']
    },
    {
        id: 14,
        imgURL: 'imgs/good-memes/14.jpg',
        keywords: ['change my mind', 'facts']
    },
    {
        id: 15,
        imgURL: 'imgs/good-memes/15.png',
        keywords: ['spongbob', 'good idea', 'plan']
    },
    {
        id: 16,
        imgURL: 'imgs/good-memes/16.jpg',
        keywords: ['me', 'facts', 'corona', 'gun']
    },
    {
        id: 17,
        imgURL: 'imgs/good-memes/17.jpg',
        keywords: ['butterfly', 'pigeon', '']
    },
    {
        id: 18,
        imgURL: 'imgs/good-memes/18.jpeg',
        keywords: ['pikachu', 'shock']
    },
    {
        id: 19,
        imgURL: 'imgs/good-memes/19.jpg',
        keywords: ['angry', 'facts', 'note', 'study', 'class']
    },
    {
        id: 20,
        imgURL: 'imgs/good-memes/20.jpg',
        keywords: ['kid', 'nerd']
    },


]

function getGalleryForDisplay() {
    const gallery = gGallery
    return gallery
}

function getImgById(imgId) {
    const gallery = gGallery
    let img = gallery.find(element => element.id === imgId)
    return img
}

function getGallerySearch(val) {
    let gallery = gGallery.filter(img => img.keywords.find(element => {
        if (element.includes(val)) {
            return true
        }
    }))
    return gallery



}