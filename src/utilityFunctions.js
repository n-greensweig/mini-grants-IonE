//Returns a first and last name object given a single string containing the full name
export function parseName(fullName) {
    let names = fullName.split(/, | /); // Splitting based on comma or space

    if (names.length === 2) {
        return {
            firstName: names[1],
            lastName: names[0]
        };
    } else {
        // Assuming the default order as first name followed by last name
        return {
            firstName: names[0],
            lastName: names[1]
        };
    }
}


