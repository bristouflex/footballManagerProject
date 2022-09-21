import React from "react";
import { useDispatch } from "react-redux";
import { fetchFootballers, modifyFootballer } from "../../../redux";
import { FootballerService } from "../../../services/FootballerService";
import { Footballer } from "../../../types/Footballer";
import { Button } from "../../atoms/Button";
import Line from "../../atoms/Line";
import Title from "../../atoms/Title";

interface FootballerCardProps {
	footballer: Footballer;
}

export const FootballerCard: React.FC<FootballerCardProps> = ({ footballer }) => {
	const { firstname, lastname, birthdate, image, role, clubs } = footballer;
	const dispatch = useDispatch();
	const handleModify = () => {
		dispatch(modifyFootballer(footballer));
	};

	const handleDelete = async () => {
		await FootballerService.deleteFootballer(footballer._id);
		dispatch(fetchFootballers(await FootballerService.getFootballers()))
	}

	const handleShowMostInCommon = async () => {
		const footballerSimilar = await FootballerService.getMostCommonClubFootballer(footballer._id);
		if(footballerSimilar){
			alert(`footballer which has the more clubs in common with ${footballer.firstname} ${footballer.lastname} is ${footballerSimilar.player.firstname} ${footballerSimilar.player.lastname} (${footballerSimilar.count} clubs)`);
		}
		else{
			alert(`no match found`);
		}
	}

	return (
		<div style={{ maxWidth: "200px", overflow: "hidden", border: "1px solid black" }}>
			<img src={image} alt="footballer view" style={{ width: "200px", height: "150px" }} />
			<Title>{firstname + " " + lastname}</Title>
			<Line>{new Date(birthdate).toDateString()}</Line>
			<Line> {role} </Line>
			<Line>{clubs.join(", ")}</Line>
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
				<Button onClick={handleModify}>Modify</Button>
				<Button onClick={handleDelete}>Delete</Button>
			</div>
			<Button onClick={handleShowMostInCommon}>Similar players</Button>
		</div>
	);
};
