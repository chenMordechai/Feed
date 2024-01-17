// import { carService } from "../services/car.service-local"
// import { Label } from './Label.jsx'

export function CommentFilter({ filterBy, onSetChangeFilter }) {
    console.log('filterBy:', filterBy)

    return (
        <section className="comment-filter">
            <form >
                <input
                    onChange={onSetChangeFilter}
                    value={filterBy.txt} 
                    type="text"
                    id="txt"
                    name="txt"
                    placeholder="Filter" />            
            </form>


        </section>
    )
}