import { FOOTBALLER_DEFAULT } from "./constants/FootballerDefault";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Footballer } from "./types/Footballer";
import { FootballClubs } from "./enums/FootballClubs";

const initialStateFootballer: Footballer = FOOTBALLER_DEFAULT;
const initialStateFootballerList: Footballer[] = [];

const footballerSlice = createSlice({
	name: "footballer",
	initialState: initialStateFootballer,
	reducers: {
		resetFootballer: (state) => {
			state = FOOTBALLER_DEFAULT;
			return state;
		},
		modifyFootballer: (state, action) => {
			state = action.payload;
			return state;
		},
		fillInfoFootballer: (state, action) => {
			if (action.payload.type === "date") {
				state = { ...state, [action.payload.name]: new Date(action.payload.value) };
				return state;
			} else if (action.payload.type !== "checkbox") {
				state = { ...state, [action.payload.name]: action.payload.value };
				return state;
			} else {
				let newClubs = state.clubs;
				if (action.payload.value) {
					newClubs.push(action.payload.name as FootballClubs);
				} else {
					newClubs = newClubs.filter((club) => club !== action.payload.name);
				}
				state = { ...state, clubs: newClubs };
			}
		},
	},
});

const footballersListSlice = createSlice({
	name: "footballersList",
	initialState: initialStateFootballerList,
	reducers: {
		fetchFootballers: (state, action) => {
			state.length = 0;
			state.push(...action.payload)
		}
	},
});


export const { resetFootballer, modifyFootballer, fillInfoFootballer } = footballerSlice.actions;

export const { fetchFootballers } = footballersListSlice.actions;

export const store = configureStore({
	reducer: {
		footballer: footballerSlice.reducer,
		footballersList: footballersListSlice.reducer,
	},
});
