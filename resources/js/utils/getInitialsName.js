export function getInitials(fullName) {
    // Split the full name into an array of words
    let nameParts = fullName.trim().split(" ");

    // Check if there are enough parts to form initials
    if (nameParts.length < 2) {
        return "";
    }

    // Extract the first letter of the first part and the first letter of the last part
    let firstInitial = nameParts[0].charAt(0).toUpperCase();
    let lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

    // Combine the initials
    let initials = firstInitial + lastInitial;

    return initials;
}
