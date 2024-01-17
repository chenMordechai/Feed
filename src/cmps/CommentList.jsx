import { CommentPreview } from './CommentPreview.jsx'

export function CommentList({ comments }) {
    return (
        <section className="comment-list">
            {comments.map((comment, i) =>
                <CommentPreview key={comment._id} comment={comment} />
            )}
        </section>
    )
}