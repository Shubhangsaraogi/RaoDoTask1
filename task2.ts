//Interface defining the structure of the trip
interface Trip {
    start: string;
    end: string;
}

//Function to calculate if the trip is valid or not
function isValidTrips(shipment: { pickups: string[], drops: string[] }, trips: Trip[]): boolean {
    const visitedPickups = new Set<string>();
    const visitedDrops = new Set<string>();

    for (const trip of trips) {
        const { start, end } = trip;

        // Check if trip starts with a pick-up point and ends with a drop point
        if (!shipment.pickups.includes(start) || !shipment.drops.includes(end)) {
            return false;
        }

        // Check if start point has not been visited as drop before
        if (visitedDrops.has(start)) {
            return false;
        }

        // Check if end point has not been visited as pickup before
        if (visitedPickups.has(end)) {
            return false;
        }

        // Mark start and end points as visited
        visitedPickups.add(start);
        visitedDrops.add(end);

        // Check if any intermediate point is not a valid via point
        if (trip.length > 2) {
            for (let i = 1; i < trip.length - 1; i++) {
                if (!shipment.pickups.includes(trip[i]) && !shipment.drops.includes(trip[i])) {
                    return false;
                }
            }
        }
    }

    // Check if all pickups and drops are visited exactly once
    return visitedPickups.size === shipment.pickups.length && visitedDrops.size === shipment.drops.length;
}

// Sample data
const shipment = {
    pickups: ['A', 'B'],
    drops: ['C', 'D']
};

const trips1: Trip[] = [
    { start: 'A', end: 'W' },
    { start: 'B', end: 'W' },
    { start: 'W', end: 'C' },
    { start: 'W', end: 'D' }
];

const trips2: Trip[] = [
    { start: 'A', end: 'W1' },
    { start: 'B', end: 'W2' },
    { start: 'W3', end: 'C' },
    { start: 'W4', end: 'D' }
];

//According to the given task
console.log('Trips 1 are valid:', isValidTrips(shipment, trips1)); // Should output: true
console.log('Trips 2 are valid:', isValidTrips(shipment, trips2)); // Should output: false
