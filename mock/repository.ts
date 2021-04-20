import { Request, Response } from 'express';

const getRepository = (req: Request, res: Response) => {
    res.json({
      data: [
        {
          id: '111111',
          code: 'GEerp',
          name: 'GEerp',
          gitSource: 'https://ac.csdn.net/intro',
          note: '1231313123',
        },
        {
            id: '111112',
            code: 'FE',
            name: 'FE',
            gitSource: 'https://ac.csdn.net/intro',
            note: '1231313123',
          },
          {
            id: '111113',
            code: 'CT',
            name: 'CT',
            gitSource: 'https://ac.csdn.net/intro',
            note: '1231313123',
          },
          {
            id: '111114',
            code: 'MIM',
            name: 'MIM',
            gitSource: 'https://ac.csdn.net/intro',
            note: '1231313123',
          },
          {
            id: '111115',
            code: 'AER',
            name: 'AER',
            gitSource: 'https://ac.csdn.net/intro',
            note: '1231313123',
          },
      ],
    });
  };
  
  export default {
    'GET /api/repository': getRepository,
  };
  