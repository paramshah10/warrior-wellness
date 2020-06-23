//TODO: add SORT_ENTRIES_DATE and SORT_ENTRIES_EDITED actions and corresponding reducers

const journalReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ENTRY':
            return Object.assign({}, state, {
                entries: [
                    ...state.entries,
                    {
                        ID: action.id,
                        Created: action.created,
                        Last_edited: action.last_edited,
                        Subject: action.subject,
                        Content: action.content
                    }
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
                        ID: action.id,
                        Subject: action.subject,
                        Content: action.content,
                        Created: action.created,
                        Last_edited: action.edited,
                    },
                ],
            });

        case 'RECEIVE_ENTRIES':
            if (!action.entries) {
                return state
            }

            return Object.assign({}, state, {
                entries: [
                    ...action.entries
                ],
            });

        default:
            return state
    }
}

export default journalReducer;