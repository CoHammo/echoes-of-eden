let ids = 0;
export function getId(): number {
	const id = ids;
	ids++;
	return id;
}
