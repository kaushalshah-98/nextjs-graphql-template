/**
 * Catch All routes that does not exist
 */
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string;
  route: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(404).json({ error: `Page Not Found`, route: JSON.stringify(req.query.slug) });
}
