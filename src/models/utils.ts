import { Patch } from "mobx-keystone";
import set from "lodash.set";

export const partialPatch = (patches: Patch[]): object =>
	patches.reduce((patched, patch) => {
		set(patched, patch.path, patch.op === "remove" ? null : patch.value);
		return patched;
	}, {})