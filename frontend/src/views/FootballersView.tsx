import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FootballerCard } from "../components/organisms/FootballerCard/FootballerCard";
import { FootballerForm } from "../components/organisms/FootballerForm/FootballerForm";
import { fetchFootballers } from "../redux";
import { FootballerService } from "../services/FootballerService";
import { Footballer } from "../types/Footballer";

export const FootballersView = () => {
	//const [footballers, setFootballers] = useState<Footballer[]>([]);
	const dispatch = useDispatch();
	const footballers = useSelector((state: any) => state.footballersList) as Footballer[];

	React.useEffect(() => {
		(async () => {
			const footballersList = await FootballerService.getFootballers();
			dispatch(fetchFootballers(footballersList));
		})();
	}, [dispatch]);

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginBottom: "10px" }}>
				{footballers.map((footballer) => (
					<FootballerCard key={footballer._id} footballer={footballer} />
				))}
			</div>

			<FootballerForm />
		</div>
	);
};
