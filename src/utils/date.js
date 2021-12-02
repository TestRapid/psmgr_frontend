export const htmlDate = (val) => {
	const d = new Date(val);
	return `${d.getFullYear().toString()}-${(d.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
};
