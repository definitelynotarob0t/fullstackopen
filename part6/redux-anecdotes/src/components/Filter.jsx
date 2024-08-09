import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const filter_input = event.target.value
        dispatch(filterChange(filter_input))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        Filter: <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter