import { InputType } from '../interafaces';

// Get encoded cities and params I can't recreate from the URL
export const getFinalResultPageURL = (data: InputType, initialResultUrl: string) => {
    // eslint-disable-next-line camelcase
    const { senior, children_0_5, children_6_17, rideDate, adult, student, bike_slot } = data;

    const initialResultPageParams = new URLSearchParams(new URL(initialResultUrl).search);
    const departureCity = initialResultPageParams.get('departureCity');
    const arrivalCity = initialResultPageParams.get('arrivalCity');
    const route = initialResultPageParams.get('route');

    // Create and go to the next URL with filters
    const params: Record<string, string> = {
        departureCity: departureCity || '',
        arrivalCity: arrivalCity || '',
        rideDate: rideDate || '',
        route: route || '',
        adult: String(adult),
        student: String(student),
        children_0_5: String(children_0_5),
        children_6_17: String(children_6_17),
        bike_slot: String(bike_slot),
        senior: String(senior),
    };

    return `${initialResultUrl.split('/search?')[0]}/search?${new URLSearchParams(params)}`;
};
