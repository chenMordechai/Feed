import { useState, useEffect } from 'react'
import { CommentList } from '../cmps/CommentList.jsx'
import { CommentFilter } from '../cmps/CommentFilter.jsx'
import { CommentAdd } from '../cmps/CommentAdd.jsx'
import { commentService } from "../services/comment.service-local.js"

export function CommentIndex() {

    const [comments, setComments] = useState(null)
    const [filterBy, setFilterBy] = useState(commentService.getDefaultFilter())
    const [commentToAdd, setCommentToAdd] = useState(commentService.getCommentToAdd())
    
    
    useEffect(() => {
        commentService.query(filterBy)
            .then((data => {
                setComments(data)
                return comments
            }))

    }, [filterBy])


    function onSubmitForm(ev){
        ev.preventDefault()
        commentService.save(commentToAdd)
        .then(newComment=>{
            setComments(prevComments => [...prevComments , newComment])
        })
    }

    function onSetChangeComment(ev) {
        let { name, value } = ev.target
        setCommentToAdd(prevComment => ({...prevComment , [name]:value}))
    }

    function onSetChangeFilter(ev) {
        console.log('onSetChangeFilter')
        let { name, value } = ev.target
        setFilterBy(prevFilter => ({...prevFilter , [name]:value}))
    }

    if (!comments) return ''
    return (
        <section className="comment-index">
            <div className="add-comment-container">
                <CommentAdd commentToAdd={commentToAdd} onSubmitForm={onSubmitForm} onSetChangeComment={onSetChangeComment}/>
            </div>

            <div className="comment-container">
            <CommentFilter filterBy={filterBy} onSetChangeFilter={onSetChangeFilter} />
            <CommentList comments={comments} />
            </div>
        </section>
    )
}