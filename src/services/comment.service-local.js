import axios from 'axios'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'commentDB'
const PAGE_SIZE = 1

export const commentService = {
    query,
    getById,
    save,
    getDefaultFilter,
    queryWishList,
    saveToWishList,
    removeFromWishList,
    getCommentsFromApi,
    getCommentToAdd
}


async function query(filterBy = {}) {
    let comments =  await storageService.query(STORAGE_KEY)
    if(!filterBy.txt) return comments
    return comments.filter(comment => comment.txt.includes(filterBy.txt))
}

function getById(commentId) {
    return storageService.get(STORAGE_KEY, commentId)
}

function save(comment) {
    return storageService.post(STORAGE_KEY, comment)
        .then((savedComment) => {
            return savedComment
        })
}


function queryWishList(sortBy = {}) {
    return storageService.query('wishListDB')
        .then(comments => {
            if (sortBy.type) {
                if (sortBy.type === 'title') {
                    comments.sort(((b1, b2) => b1.title.localeCompare(b2.title)))
                } else {
                    comments.sort(((b1, b2) => (b1[sortBy.type] - b2[sortBy.type])))
                }
            }
            return comments
        })
}

function saveToWishList(comment) {
    return storageService.post('wishListDB', comment)
        .then((savedComment) => {
            return savedComment
        })
}


function removeFromWishList(commentId) {
    return storageService.remove('wishListDB', commentId)
}

function getDefaultFilter() {
    return { email: '', txt: '' }
}

function getCommentToAdd(){
    return { email: '', txt: '' }
}

function getCommentsFromApi() {
    console.log('hi')
    const search = 'a'
    const api = `https://www.googleapis.com/comments/v1/volumes?printType=comments&q=effective%2520${search}`

    return axios.get(api)
        .then(res => res.data)
        .then(data => data.items)

    // return fetch(api)
    //     .then(res => res.json())
    //     .then(data => data.items)
}

// (async function () {
//     const comments = [
//         {
//             email: 'chen100030@gmail.com',
//             txt: 'Hello there. How are you?',
//         },
//         {
//             email: 'yechiel.my2@gmail.com',
//             txt: 'Goood!!!',
//         },
//         {
//             email: 'office@mrmashkanta.co.il',
//             txt: 'Gooodbye :)',
//         }
//     ]

//     for (var i = 0; i < comments.length; i++) {
//         await save(comments[i])
//     }
// }())
