import Entity from "./entity";

type Entry = Entity & {
	title: string;
	content: string;
	stateId: string;
};

export default Entry;
