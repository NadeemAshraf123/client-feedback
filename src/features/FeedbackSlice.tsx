import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Feedback {
  id: number
  clientName: string
  message: string
  rating: number
  date: string
}

interface FeedbackState {
  data: Feedback[]
  loading: boolean
  error: string | null
}

const initialState: FeedbackState = {
  data: [],
  loading: false,
  error: null,
}


export const fetchFeedback = createAsyncThunk(
  'feedback/fetchFeedback',
  async () => {
    const response = await axios.get<Feedback[]>('http://localhost:3001/feedback')
    return response.data
  }
)


export const addFeedback = createAsyncThunk(
  'feedback/addFeedback',
  async (newFeedback: Omit<Feedback, 'id'>) => {
    const response = await axios.post<Feedback>('http://localhost:3001/feedback', newFeedback)
    return response.data
  }
)


export const deleteFeedback = createAsyncThunk(
  'feedback/deleteFeedback',
  async (id: number) => {
    await axios.delete(`http://localhost:3001/feedback/${id}`)
    return id 
  }
)

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeedback.fulfilled, (state, action: PayloadAction<Feedback[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch feedback'
      })
      .addCase(addFeedback.fulfilled, (state, action: PayloadAction<Feedback>) => {
        state.data.push(action.payload)
      })
    
      .addCase(deleteFeedback.fulfilled, (state, action: PayloadAction<number>) => {
        state.data = state.data.filter((item) => item.id !== action.payload)
      })
  },
})

export default feedbackSlice.reducer
