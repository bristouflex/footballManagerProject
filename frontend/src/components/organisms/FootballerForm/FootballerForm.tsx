import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FootballClubs } from "../../../enums/FootballClubs";
import { FootballerRoles } from "../../../enums/FootballerRoles";
import { fillInfoFootballer, resetFootballer, fetchFootballers } from "../../../redux";
import { FootballerService } from "../../../services/FootballerService";
import { Footballer } from "../../../types/Footballer";
import { Button } from "../../atoms/Button";
import Line from "../../atoms/Line";

export const FootballerForm = () => {
	const dispatch = useDispatch();
	const newFootballer = useSelector((state: any) => state.footballer) as Footballer;
	const [clubsChecked, setClubChecked] = useState<{ [club in FootballClubs]: boolean }>({
		"AC Milan je fais le bilan": false,
		barcelone: false,
		"olympique de marseille": false,
		"olympique Lyonnais": false,
		"club du qatar": false,
	});
	const [dateValue, setDateValue] = useState<string>("");
	const handleSubmit = async () => {
		if(newFootballer._id !== ''){
			await FootballerService.modifyFootballer(newFootballer);
		}
		else {
			await FootballerService.addFootballer(newFootballer);
		}
		dispatch(resetFootballer());

		(async () => {
			const footballersList = await FootballerService.getFootballers();
			dispatch(fetchFootballers(footballersList));
		})()
	};

	const handleCancel = () => {
		dispatch(resetFootballer());
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		if (e.target.type !== "checkbox") {
			dispatch(fillInfoFootballer({ type: e.target.type, name: e.target.name, value: e.target.value }));
		} else {
			dispatch(fillInfoFootballer({ type: e.target.type, name: e.target.name, value: (e.target as HTMLInputElement).checked }));
		}
	};

	useEffect(() => {
		if (newFootballer) {
			setDateValue(new Date(newFootballer.birthdate).toISOString().split("T")[0]);
			let newClubsChecked: { [club in FootballClubs]: boolean } = {
				"AC Milan je fais le bilan": false,
				barcelone: false,
				"olympique de marseille": false,
				"olympique Lyonnais": false,
				"club du qatar": false,
			};
			Object.values(FootballClubs).forEach((club) => {
				newClubsChecked[club] = newFootballer.clubs.includes(club);
			});
			setClubChecked(newClubsChecked);
		}
	}, [newFootballer]);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="hidden" name="_id" value={newFootballer._id} />
				<input type="text" placeholder="firstname" name="firstname" value={newFootballer.firstname} onChange={handleChange} />
				<input type="text" placeholder="lastname" name="lastname" value={newFootballer.lastname} onChange={handleChange} />
				<input type="text" placeholder="image url" name="image" value={newFootballer.image} onChange={handleChange} />
				<input type="date" name="birthdate" value={dateValue} onChange={handleChange} />
				<select name="role" value={newFootballer.role} onChange={handleChange}>
					{(Object.keys(FootballerRoles) as Array<keyof typeof FootballerRoles>).map((role) => {
						return (
							<option key={role} value={role}>
								{role}
							</option>
						);
					})}
				</select>
				<Line>Clubs:</Line>
				{(Object.keys(FootballClubs) as Array<keyof typeof FootballClubs>).map((club) => {
					return (
						<label key={club}>
							{club}
							<input type="checkbox" name={FootballClubs[club]} checked={clubsChecked && clubsChecked[FootballClubs[club]]} onChange={handleChange} value={FootballClubs[club]} />
						</label>
					);
				})}
			</form>
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
				<Button onClick={handleSubmit}>Valider</Button>
				<Button onClick={handleCancel}>Annuler</Button>
			</div>
		</div>
	);
};
