import React from "react";
import RootStore from "../../models/RootStore";
import { css } from "linaria";

const Authorizer = ({ rootStore }: { rootStore: RootStore | null }) => {
	return <div className={css`
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;
		padding: 15px;
	`}>
		<h1 className={css`
			font-size: 40px;
			line-height: 1;
			margin-bottom: 2px;
		`}>
			basic-do
		</h1>
		<h2 className={css`
			font-size: 16px;
			line-height: 1;
			margin-bottom: 10px;
		`}>
			Less features. Less headache.
		</h2>
		{rootStore === null
			? <p className={css`
					margin-top: 10px;
					font-size: 16px;
				`}>
					Loading...
				</p>
			: <button
				disabled={rootStore === null}
				onClick={() => rootStore?.user.signIn()}
				className={css`
					padding: 6px 12px;
					font-size: 14px;
					background: hsl(0, 0%, 90%);
					border: none;
					border-radius: 4px;
					cursor: pointer;
					transition: all ease .2s;

					&:hover {
						background: hsl(0, 0%, 80%);
					}
				`}>
					Connect with Google Tasks
			</button>
		}
	</div>;
}
export default Authorizer;