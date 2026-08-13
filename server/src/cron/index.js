import { CronJob } from 'cron';
import { Appointment } from '../models/appointment.model.js';
import { Relationship } from '../models/relationship.model.js';
import { Reminder } from '../models/reminder.model.js';

const job =  new CronJob(
	"*/30 * * * * *", // cronTime
async function () {
		await Appointment.updateMany(
			{
				time: { $lt: new Date() },
				status: "active"
			},
			{
				$set: { status: "completed" }
			}
		)

	    await Relationship.updateMany(
			{
				type: "caretaker",
				endDate: { $lt: new Date() },
				status: "active"
			},
			{
				$set: { status: "completed" }
			}
		)

		 await Reminder.updateMany(
			{
				endDate: { $lt: new Date() },
				status: "active"
			},
			{
				$set: { status: "completed" }
			}
		)
	}, // onTick
	null, // onComplete
	true, // start
);