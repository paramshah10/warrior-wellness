const initialState = {
    fetchedChartsData: false
}

const chartsReducer = (state = initialState, action) => {
    switch(action.type) {
        case "FETCHED_CHARTS_DATA":
            return Object.assign({}, state, {
                fetchedChartsData: true
            })

        default:
            return state
    }
}

export default chartsReducer