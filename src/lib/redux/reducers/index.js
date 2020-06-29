import journalReducer from './journal'
import chartsReducer from './charts'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    journal: journalReducer,
    charts: chartsReducer
})

export default allReducers;