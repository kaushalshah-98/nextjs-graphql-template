import { NextApiRequest, NextApiResponse } from 'next';
import { TestController, REQUEST_METHODS } from '@/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> {
  switch (req.method) {
    case REQUEST_METHODS.GET: {
      await TestController.getData(req, res);
      break;
    }

    default:
      break;
  }
}
