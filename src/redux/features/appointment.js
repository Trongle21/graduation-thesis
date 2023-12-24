import { createSlice } from "@reduxjs/toolkit";

const appointmentsSlice = createSlice({
  name: "appointment",
  initialState: {
    appointments: {
      isFetching: false,
      allAppointments: null,
      allAppointmentsDeleted: null,
      currentAppointment: null,
      error: false,
    },
    message: "",
  },
  reducers: {
    getAppointmentStart: (state) => {
      state.appointments.isFetching = true;
    },
    getAppointmentSuccess: (state, action) => {
      state.appointments.allAppointments = action.payload;
    },
    getAppointmentFailed: (state) => {
      state.appointments.error = true;
    },
    getAppointmentDeletedStart: (state) => {
      state.appointments.isFetching = true;
    },
    getAppointmentDeletedSuccess: (state, action) => {
      state.appointments.isFetching = false;
      state.appointments.allAppointmentsDeleted = action.payload;
    },
    getAppointmentDeletedFailed: (state) => {
      state.appointments.isFetching = false;
      state.appointments.error = true;
    },
    createAppointmentStart: (state) => {
      state.appointments.isFetching = true;
    },
    createAppointmentSuccess: (state, action) => {
      state.appointments.isFetching = false;
    },
    createAppointmentFailed: (state) => {
      state.appointments.isFetching = false;
      state.appointments.error = true;
    },
    updateAppointmentStart: (state) => {
      state.appointments.isFetching = true;
    },
    updateAppointmentSuccess: (state, action) => {
      state.appointments.isFetching = false;
      state.appointments.currentAppointment = action.payload;
    },
    updateAppointmentFailed: (state) => {
      state.appointments.isFetching = false;
      state.appointments.error = true;
    },
    deleteAppointmentStart: (state) => {
      state.appointments.isFetching = true;
    },
    deleteAppointmentSuccess: (state, action) => {
      state.appointments.isFetching = false;
      state.message = action.payload;
    },
    deleteAppointmentFailed: (state, action) => {
      state.appointments.isFetching = false;
      state.appointments.error = true;
      state.message = action.payload;
    },
    restoreAppointmentStart: (state) => {
      state.appointments.isFetching = true;
    },
    restoreAppointmentSuccess: (state, action) => {
      state.appointments.isFetching = false;
      state.message = action.payload;
    },
    restoreAppointmentFailed: (state, action) => {
      state.appointments.isFetching = false;
      state.appointments.error = true;
    },
  },
});

export const {
  getAppointmentStart,
  getAppointmentSuccess,
  getAppointmentFailed,
  getAppointmentDeletedStart,
  getAppointmentDeletedSuccess,
  getAppointmentDeletedFailed,
  createAppointmentStart,
  createAppointmentSuccess,
  createAppointmentFailed,
  updateAppointmentStart,
  updateAppointmentSuccess,
  updateAppointmentFailed,
  deleteAppointmentStart,
  deleteAppointmentSuccess,
  deleteAppointmentFailed,
  restoreAppointmentStart,
  restoreAppointmentSuccess,
  restoreAppointmentFailed,
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
