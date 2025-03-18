import { Receipt } from "../types/receipt";

export function pointCalculator(receipt: Receipt): number {
    let points = 0;

    // Rule 1: One point for every alphanumeric character in the retailer name.
    points += Array.from(receipt.retailer).filter(c => /^[a-z0-9]+$/i.test(c)).length;

    // Rule 2: 50 points if the total is a round dollar amount with no cents.
    if (receipt.total % 1 === 0) {
        points += 50;
    }

    // Rule 3: 25 points if the total is a multiple of 0.25.
    if (receipt.total % 0.25 === 0) {
        points += 25;
    }

    // Rule 4: 5 points for every two items on the receipt.
    points += Math.floor(receipt.items.length / 2) * 5;

    // Rule 5: Check if item descriptions have a length multiple of 3 and apply points for the price adjustment.
    for (const item of receipt.items) {
        const trimmedDescription = item.shortDescription.trim();
        if (trimmedDescription.length % 3 === 0) {
            points += Math.ceil(item.price * 0.2);
        }
    }

    // Rule 6: 6 points if the day in the purchase date is odd.
    const purchaseDay = receipt.purchaseDatetime.getDate();
    if (purchaseDay % 2 === 1) {
        points += 6;
    }

    // Rule 7: 10 points if the time of purchase is after 2:00pm and before 4:00pm.
    const purchaseHour = receipt.purchaseDatetime.getHours();
    if (purchaseHour >= 14 && purchaseHour < 16) {
        points += 10;
    }

    return points;
}

export default pointCalculator;
