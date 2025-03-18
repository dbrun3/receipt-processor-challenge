import express, { Request, Response } from 'express';
import { InputReceipt, Receipt } from '../types/receipt';
import { db } from '../database/db';
import { eq } from 'drizzle-orm';
import { receipts } from '../database/schema';
import pointCalculator from '../util/pointsCalculator';

function receiptsRouter() {
    const router = express.Router();

    /*
    *   Takes an InputReceipt and turns it into a Receipt,
    *   inserting it into a database, then returning the newly
    *   generated UUID
    */
    router.post('/process', async (req: Request, res: Response) => {
        try {
            const rawReceipt = req.body as InputReceipt;
            const receipt: Receipt = {
                retailer: rawReceipt.retailer,
                purchaseDatetime: new Date(`${rawReceipt.purchaseDate}%${rawReceipt.purchaseTime}`),
                total: parseFloat(rawReceipt.total),
                items: rawReceipt.items.map((item) => (
                    {
                        shortDescription: item.shortDescription,
                        price: parseFloat(item.price)
                    }
                ))
            }
            console.log("Receipt received:",receipt);
            const result = await db.insert(receipts).values(receipt).returning({ id: receipts.id });
            if(!result || result.length !== 1) {
                console.error("Failed to update database");
                throw Error("Failed to update database")
            }
            res.status(200).json(result[0]);
        } catch (err: unknown) {
            res.status(400).json("The receipt is invalid.");
        }
    });

    /*
    *   Takes an id and pulls the corresponding receipt
    *   from the db. It performs the point calculation described in the doc
    *   generated UUID
    */
    router.get('/:id/points', async (req: Request, res: Response) => {
        try {
            const selectedId = req.params.id;
            const result  = await db.select().from(receipts).where(eq(receipts.id, selectedId));
            if(!result || result.length !== 1) {
                res.status(404).json("No receipt found for that ID.");
                return;
            }
            const {id, ...rest} = result[0];
            const receipt = rest as Receipt;
            const points = pointCalculator(receipt);

            console.log("Receipt received:",receipt);
            res.status(200).json({ points });
        } catch (err: unknown) {
            res.status(500).json(err);
        }
    });

    return router;
}

export default receiptsRouter;
