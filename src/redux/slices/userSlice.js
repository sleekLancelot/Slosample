import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authHeader } from '../../utils/_helpers/authHeaders';
import { AppUrl } from '../../utils/_helpers/_globalServices';

const initialState = {
  details : null,

  tasks: [],
  taskStatus: 'IDLE',
  taskError: '',

  isAuthenticated: null,
  loading: false,
};

export const getTasks = createAsyncThunk( 'getAllCreatedTasks', async ( _, { getState , rejectWithValue, fulfillWithValue } ) => {
  const { details: {company_id} } = getState()?.user

    const resp = await axios.get(
      `${AppUrl}?company_id=${company_id}`,
      {
        method: "GET",
        headers: authHeader(),
      },
    );

    if ( resp.data?.status === 'success' ) {
      const response = resp.data?.results 
      
      if ( Array.isArray( response ) && response.length )
      {
        return fulfillWithValue( response );
      }

      return fulfillWithValue( [] );
    }
    else
    {
      return rejectWithValue( resp.error || resp?.data?.message );
    }

} );

export const UserSlice = createSlice( {
  name: 'user',
  initialState,
  reducers: {
    setProfile: ( state, action ) => {
      state.details = action.payload;
    },
    setAuthentication: ( state, action ) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( getTasks.pending, ( state ) =>
      {
        state.taskStatus = 'PENDING';
        state.taskError = "";
      } )
      .addCase( getTasks.fulfilled, ( state, action ) =>
      {
        state.taskStatus = 'RESOLVED';
        state.tasks = action.payload;
        state.taskError = "";
      } )
      .addCase( getTasks.rejected, ( state, action ) =>
      {
        state.taskStatus = 'REJECTED';
        state.taskError = action.payload;
      } )
  }
} )

export const { setProfile, setAuthentication } = UserSlice.actions;

export const UserReducer = UserSlice.reducer;