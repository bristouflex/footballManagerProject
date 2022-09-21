import axios from "axios";
import { config } from "../config/config";
import { Footballer } from "../types/Footballer";

const getFootballers = async (): Promise<Footballer[] | undefined> => {
	try {
		const response = await axios.get(`${config.server.url}/footballers`);       
		return response.data.footballers as Footballer[];
	} catch (err) {
		alert("an error occured");
		console.error(err);
	}
};

const deleteFootballer = async (footballerId: string): Promise<string | undefined> => {
	try {
		const response = await axios.delete(`${config.server.url}/footballers/delete/${footballerId}`);
		return response.data.message;
	} catch (err) {
		alert("an error occured");
		console.error(err);
	}
};

const addFootballer = async (footballer: Footballer): Promise<Footballer | undefined> => {
	try {
		const response = await axios.post(`${config.server.url}/footballers`, JSON.stringify(footballer), {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",				
			},
		});
		return response.data.footballer as Footballer;
	} catch (err) {
		alert("an error occured");
		console.error(err);
	}
};

const modifyFootballer = async (footballer: Footballer): Promise<Footballer | undefined> => {
	try {
		const response = await axios.put(`${config.server.url}/footballers/patch/${footballer._id}`, JSON.stringify(footballer), {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		return response.data.footballer as Footballer;
	} catch (err) {
		alert("an error occured");
		console.error(err);
	}
};

const getMostCommonClubFootballer = async (footballerId: string): Promise<{player: Footballer, count: number} | undefined> => {
	try {
		const response = await axios.get(`${config.server.url}/footballers/mostClubs/${footballerId}`);
			return response.data.mostInCommon;
	} catch (err) {
		alert("an error occured");
		console.error(err);
	}
};


export const FootballerService = { getFootballers, addFootballer, modifyFootballer, deleteFootballer, getMostCommonClubFootballer };
