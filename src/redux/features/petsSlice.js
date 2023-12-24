import { createSlice } from "@reduxjs/toolkit";

const petsSlice = createSlice({
  name: "pet",
  initialState: {
    pets: {
      isFetching: false,
      allPets: null,
      allPetsDeleted: null,
      currentPet: null,
      error: false,
    },
    message: "",
  },
  reducers: {
    getPetStart: (state) => {
      state.pets.isFetching = true;
    },
    getPetSuccess: (state, action) => {
      state.pets.isFetching = false;
      state.pets.allPets = action.payload;
    },
    getPetFailed: (state) => {
      state.pets.isFetching = false;
      state.pets.error = true;
    },
    getPetDeletedStart: (state) => {
      state.pets.isFetching = true;
    },
    getPetDeletedSuccess: (state, action) => {
      state.pets.isFetching = false;
      state.pets.allPetsDeleted = action.payload;
    },
    getPetDeletedFailed: (state) => {
      state.pets.isFetching = false;
      state.pest.error = true;
    },
    createPetStart: (state) => {
      state.pets.isFetching = true;
    },
    createPetSuccess: (state, action) => {
      state.pets.isFetching = false;
    },
    createPetFailed: (state) => {
      state.pets.isFetching = false;
      state.pets.error = true;
    },
    updatePetStart: (state) => {
      state.pets.isFetching = true;
    },
    updatePetSuccess: (state, action) => {
      state.pets.isFetching = false;
      state.pets.currentPet = action.payload;
    },
    updatePetFailed: (state) => {
      state.pets.isFetching = false;
      state.pets.error = true;
    },
    deletePetStart: (state) => {
      state.pets.isFetching = true;
    },
    deletePetSuccess: (state, action) => {
      state.pets.isFetching = false;
      state.message = action.payload;
    },
    deletePetFailed: (state, action) => {
      state.pets.isFetching = false;
      state.pets.error = true;
      state.message = action.payload;
    },
    restorePetStart: (state) => {
      state.pets.isFetching = true;
    },
    restorePetSuccess: (state, action) => {
      state.pets.isFetching = false;
      state.message = action.payload;
    },
    restorePetFailed: (state, action) => {
      state.pets.isFetching = false;
      state.pets.error = true;
    },
  },
});

export const {
  getPetStart,
  getPetSuccess,
  getPetFailed,
  getPetDeletedStart,
  getPetDeletedSuccess,
  getPetDeletedFailed,
  createPetStart,
  createPetSuccess,
  createPetFailed,
  updatePetStart,
  updatePetSuccess,
  updatePetFailed,
  deletePetStart,
  deletePetSuccess,
  deletePetFailed,
  restorePetStart,
  restorePetSuccess,
  restorePetFailed,
} = petsSlice.actions;
export default petsSlice.reducer;
