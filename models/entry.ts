import Entity from "./entity";

type Entry<T = string> = Entity & {
	title: string;
	content: string;
	stateId: T;
};

export default Entry;
