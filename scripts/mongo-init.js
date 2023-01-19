db = db.getSiblingDB("entries");

db.createCollection("entries");
db.entries.remove({});
db.entries.insertMany([
	{
		content: "Check U tasks",
		createdAt: new Date(),
		stateId: ObjectId("63c37424fd9676c68b1f5c63"),
		title: "Check tasks",
	},
	{
		content: "See Avatar 2",
		createdAt: new Date(),
		stateId: ObjectId("63c37424fd9676c68b1f5c65"),
		title: "See a movie",
	},
	{
		content: "Learn Next on internet",
		createdAt: new Date(),
		stateId: ObjectId("63c37424fd9676c68b1f5c64"),
		title: "Learn Next",
	},
	{
		content: "Finish my sprint 3 tasks",
		createdAt: new Date(),
		stateId: ObjectId("63c37424fd9676c68b1f5c64"),
		title: "Finish my sprint tasks",
	},
	{
		content: "Re learn rxjs for work purposes",
		createdAt: new Date(),
		stateId: ObjectId("63c37424fd9676c68b1f5c64"),
		title: "Re learn rxjs",
	},
]);

db.createCollection("entry_states");
db["entry_states"].remove({});
db["entry_states"].insertMany([
	{
		_id: ObjectId("63c37424fd9676c68b1f5c63"),
		createdAt: new Date(),
		name: "To Do",
		position: 1,
	},
	{
		_id: ObjectId("63c37424fd9676c68b1f5c64"),
		createdAt: new Date(),
		name: "In Progress",
		position: 2,
	},
	{
		_id: ObjectId("63c37424fd9676c68b1f5c65"),
		createdAt: new Date(),
		name: "Completed",
		position: 3,
	},
]);
