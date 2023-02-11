import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        addVote: (state, action) => {
            const id = action.payload.id
            const anecdoteToChange = state.find(a => a.id === id)
            anecdoteToChange.votes += 1
        },
        appendAnecdote: (state, action) => {
            state.push(action.payload)
        }
    },
})

export const { addVote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        anecdotes.forEach(anecdote => dispatch(appendAnecdote(anecdote)))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const giveVote = (content) => {
    return async dispatch => {
        await anecdoteService.addVote(content)
        dispatch(addVote(content))
    }
}

export default anecdoteSlice.reducer