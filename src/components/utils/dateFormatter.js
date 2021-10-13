import { DateTime } from 'luxon';

const dateFormatter = (date) => {
	const currentDate = DateTime.now();
	const pastDate = DateTime.fromISO(date, 'dd LLLL yyyy');
	const { years, months, days, hours, minutes } = currentDate
		.diff(pastDate, ['years', 'months', 'days', 'hours', 'minutes'])
		.toObject();
	if (years > 1) {
		if (years === 1) {
			return `${years} year ago`;
		} else {
			return `${years} years ago`;
		}
	} else if (months > 1) {
		if (months === 1) {
			return `${months} month ago`;
		} else {
			return `${months} months ago`;
		}
	} else if (days > 1) {
		if (days === 1) {
			return `${days} day ago`;
		} else {
			return `${days} days ago`;
		}
	} else if (hours > 1) {
		if (hours === 1) {
			return `${hours} hour ago`;
		} else {
			return `${hours} hours ago`;
		}
	} else {
		if (minutes === 1) {
			return `${Math.round(minutes)} minute ago`;
		} else {
			return `${Math.round(minutes)} minutes ago`;
		}
	}
};

export default dateFormatter;
