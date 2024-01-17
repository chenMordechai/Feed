import gravatar from 'gravatar-api'

export function CommentPreview({ comment }) {
  
  function getGravatar(email){
    const options = {
        email
    }
    return gravatar.imageUrl(options);
  }

  return (
    <section className="comment-preview">
      <div className="img-container">
        <img src={getGravatar(comment.email)}/>
      </div>
      <div className="txt-container">
        <span className="bold">{comment.email}</span>
        <span>{comment.txt}</span>
      </div>
    </section>
  )
}