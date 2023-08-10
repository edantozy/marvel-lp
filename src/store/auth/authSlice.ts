import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IMiniCharacter, IMiniComic } from '../../fake-auth';
import { IThumbnail } from '../../interfaces';

type loginInfo = {
   id: string | null;
   name: string | null;
   email: string | null;
   date_of_birth: string | null;
   created_at: string | null;
   favorites: {
      characters: IMiniCharacter[];
      comics: IMiniComic[];
   }
};

interface AuthState {
   status: 'checking' | 'not-authenticated' | 'authenticated',
   loginInfo: loginInfo,
   errorMessage: string | null,
}

const initialState: AuthState = {
   status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
   loginInfo: {
      id: null,
      name: null,
      email: null,
      date_of_birth: null,
      created_at: null,
      favorites: {
         characters: [],
         comics: [],
      }
   },
   errorMessage: null,
}

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      login: (state, action: PayloadAction<{ loginInfo: loginInfo }>) => {
         state.status = 'authenticated' // 'checking', 'not-authenticated', 'authenticated'
         state.loginInfo = {
            id: action.payload.loginInfo.id,
            email: action.payload.loginInfo.email,
            name: action.payload.loginInfo.name,
            date_of_birth: action.payload.loginInfo.date_of_birth,
            created_at: action.payload.loginInfo.created_at,
            favorites: action.payload.loginInfo.favorites,
         }
         state.errorMessage = null
      },
      logout: (state, action: PayloadAction<{ errorMessage: string }>) => {
         state.status = 'not-authenticated' // 'checking', 'not-authenticated', 'authenticated'
         state.loginInfo = {
            id: null,
            email: null,
            name: null,
            date_of_birth: null,
            created_at: null,
            favorites: {
               characters: [],
               comics: [],
            }
         }
         state.errorMessage = action.payload.errorMessage
      },
      addFavoriteComic: (state, action: PayloadAction<{ id: number, title: string, thumbnail: IThumbnail }>) => {
         state.loginInfo.favorites.comics.push({
            id: action.payload.id,
            title: action.payload.title,
            thumbnail: action.payload.thumbnail,
         })
      },
      addFavoriteCharacter: (state, action: PayloadAction<{ id: number, name: string, thumbnail: IThumbnail }>) => {
         state.loginInfo.favorites.characters.push({
            id: action.payload.id,
            name: action.payload.name,
            thumbnail: action.payload.thumbnail,
         })
      },
      removeFavoriteComic: (state, action: PayloadAction<{ id: number }>) => {
         state.loginInfo.favorites.comics = state.loginInfo.favorites.comics.filter((comic) => comic.id !== action.payload.id)
      },
      removeFavoriteCharacter: (state, action: PayloadAction<{ id: number }>) => {
         state.loginInfo.favorites.characters = state.loginInfo.favorites.characters.filter((character) => character.id !== action.payload.id)
      },
      checkingCredentials: (state) => {
         state.status = 'checking'
      },
   }
})

// Action creators are generated for each case reducer function
export const {
   login,
   logout,
   checkingCredentials,
   addFavoriteComic,
   addFavoriteCharacter,
   removeFavoriteComic,
   removeFavoriteCharacter,
} = authSlice.actions