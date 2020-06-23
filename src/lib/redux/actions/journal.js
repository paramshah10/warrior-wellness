export const addEntry = (id, subject, content, created) => {
    return {
        type: 'ADD_ENTRY',
        id,
        subject,
        content,
        created,
        last_edited: created,
    };
}

export const updateEntry = (id, subject, content, created, edited) => {
    return {
        type: 'UPDATE_ENTRY',
        id,
        subject,
        content,
        created,
        last_edited: edited,
    };
}

export const removeEntry = (id) => {
    return {
        type: 'DELETE_ENTRY',
        id,
    };
}

export const receiveEntries = (entries) => {
    return {
        type: 'RECEIVE_ENTRIES',
        entries
    };
}