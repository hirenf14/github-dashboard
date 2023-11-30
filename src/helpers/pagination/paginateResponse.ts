import { NextApiResponse } from "next";

export function paginateResponse<T>(res: NextApiResponse<any>, data: T, total: number) {
    res.setHeader("X-Total-Count", total);
    return res.status(200).json(data);
}