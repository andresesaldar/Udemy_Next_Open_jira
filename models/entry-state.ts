import Entity from "./entity";

type EntryState = Entity & {
	name: string;
	position: number;
};

export default EntryState;
