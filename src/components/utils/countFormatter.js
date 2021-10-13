const countFormatter = (number, decPlaces) => {
	if (number === 1) {
		return `${number} view`;
	} else {
		const dPlaces = Math.pow(10, decPlaces);
		const abbreviation = ['K', 'M', 'B', 'T'];
		// Go through the array backwards, so we do the largest first
		for (let i = abbreviation.length - 1; i >= 0; i--) {
			// Convert array index to "1000", "1000000", etc
			let size = Math.pow(10, (i + 1) * 3);
			// If the number is bigger or equal do the abbreviation
			if (size <= number) {
				// Multiply by decPlaces, round, and then divide by decPlaces.
				// This gives us nice rounding to a particular decimal place.
				number = Math.round((number * dPlaces) / size) / dPlaces;
				// Handle special case where we round up to the next abbreviation
				if (number === 1000 && i < abbreviation.length - 1) {
					number = 1;
					i++;
				}
				// Add the letter for the abbreviation
				number += abbreviation[i];
				// We are done... stop
				break;
			}
		}

		return number;
	}
};

export default countFormatter;
