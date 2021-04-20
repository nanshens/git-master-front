import { Request, Response } from 'express';

const getModule = (req: Request, res: Response) => {
    res.json({
      data: [
        {
          id: '111111',
          code: 'GEerp',
          name: 'GEerp',
          note: '1231313123',
        },
        {
            id: '111112',
            code: 'FE',
            name: 'FE',
            note: '1231313123',
          },
          {
            id: '111113',
            code: 'CT',
            name: 'CT',
            note: '1231313123',
          },
          {
            id: '111114',
            code: 'accounting',
            name: 'MIM',
            note: '1231313123',
          },
          
      ],
    });
  };
  
  export default {
    'GET /api/module': getModule,
  };
  