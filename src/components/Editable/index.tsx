import React, { useRef, useEffect } from "react";
import { css } from "linaria";
import ContentEditable from "react-contenteditable"

const Editable = ({ value, onChange = () => {}, ...rest }: {
	value: string,
	onChange?: (value: string) => void
} & Omit<React.AllHTMLAttributes<HTMLDivElement>, "onChange">) => {
	let elem = useRef(null as HTMLElement | null);

	useEffect(() => {
		elem.current?.setAttribute("contenteditable", "plaintext-only");
	}, []);
	
	return <ContentEditable
		{...rest}
		onKeyDown={e => e.key === "Enter" && e.preventDefault()}
		onPaste={event => {
			let paste = event.clipboardData.getData("text");
			paste = paste.replace(/\n/g, "");
		
			const selection = window.getSelection();
			if (!selection?.rangeCount) return;
			selection.deleteFromDocument();
			selection.getRangeAt(0).insertNode(document.createTextNode(paste));
			

			event.preventDefault();
		}}
		spellCheck="false"
		className={css`& br { display: none; }` + " " + rest.className}
		innerRef={elem}
		html={value}
		onChange={e => onChange(e.target.value)}/>
};
export default Editable;