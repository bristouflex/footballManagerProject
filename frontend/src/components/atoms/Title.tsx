import React from "react";

interface TitleProps {
	children: React.ReactNode;
}
const Title: React.FC<TitleProps> = ({ children }) => {
	return (
		<div style={{ margin: "10px 10px" }}>
			<h3>{children}</h3>
		</div>
	);
};

export default Title;
