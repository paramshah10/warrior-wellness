//TODO: add SORT_ENTRIES_DATE and SORT_ENTRIES_EDITED actions and corresponding reducers
const initialState = {
    fetchedInitial: false,
    entries: [],
  };

const journalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ENTRY':
            return Object.assign({}, state, {
                entries: [
                    {
                        id: action.id,
                        date_created: action.created,
                        date_edited: action.last_edited,
                        subject: action.subject,
                        content: action.content
                    },
                    ...state.entries
                ],
            });

        case 'REMOVE_ENTRY':
            const filtered = state.entries.filter(entry => entry.id != action.id)

            return Object.assign({}, state, {
                entries: filtered,
            });

        case 'UPDATE_ENTRY':
            const excluded = state.entries.filter(entry => entry.id != action.id)

            return Object.assign({}, state, {
                entries: [
                    ...excluded,
                    {
                        id: action.id,
                        subject: action.subject,
                        content: action.content,
                        date_created: action.created,
                        date_edited: action.edited,
                    },
                ],
            });

        case 'RECEIVE_ENTRIES':
            if (!action.entries) {
                return state
            }

            return Object.assign({}, state, {
                fetchedInitial: true,
                entries: [
                    ...action.entries.reverse()
                ],
            });

        default:
            return state
    }
}

export default journalReducer;