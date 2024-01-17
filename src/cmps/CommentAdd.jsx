

export function CommentAdd ({commentToAdd , onSubmitForm,onSetChangeComment}){
    
   

    return(
        <section className="comment-add">
            <form onSubmit={onSubmitForm}>
                <input onChange={onSetChangeComment} value={commentToAdd.email} placeholder="Email" type="email" id="email" name="email" />
                <input onChange={onSetChangeComment} value={commentToAdd.txt} placeholder="Message" type="text" id="txt" name="txt" />
                <button>SUBMIT</button>
            </form>
        </section>
    )
}