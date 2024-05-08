import { useEffect, useId, useState } from "react";

const Resizer = ({ children, parentId }) => {
	const resizerId = useId();

	useEffect(() => {
		var resize = document.getElementById(resizerId);
		var child = document.getElementById(children?.props?.id);
		var container = document.getElementById(parentId);
        var drag = false;
		var moveX = 
			child.getBoundingClientRect().width +
				resize.getBoundingClientRect().width / 2
		;

		resize.addEventListener("mousedown", function (e) {
			drag = true;
			moveX = e.x;
		});

		container.addEventListener("mousemove", function (e) {
			moveX = e.x;
			if (drag) {
				child.style.width =
					moveX - resize.getBoundingClientRect().width / 2 + "px";
			}
		});

		container.addEventListener("mouseup", function (e) {
			drag = false;
		});
	}, []);

	return (
		<>
			{children}
			<div id={resizerId} className="resizer"/>
		</>
	);
};

export default Resizer;
