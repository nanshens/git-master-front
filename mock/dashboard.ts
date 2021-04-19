import { Request, Response } from 'express';

const getDashboard = (req: Request, res: Response) => {
    res.json({
      data: [
        {
          id: '111111',
          code: 'GE',
          currentBranch: '2021W01',
          currentCreateDate: '2021-01-07',
          currentReleaseDate: '2021-01-17',
          prepareBranch: '2021W11',
          prepareCreateDate: '2021-04-01',
          prepareReleaseDate: 'null'
        },
        {
            id: '111112',
            code: 'FE',
            currentBranch: '2021W01',
            currentCreateDate: '2021-01-07',
            currentReleaseDate: '2021-01-17',
            prepareBranch: '2021W11',
            prepareCreateDate: '2021-04-01',
            prepareReleaseDate: 'null'
          },
          {
            id: '111113',
            code: 'CT',
            currentBranch: '2021W01',
            currentCreateDate: '2021-01-07',
            currentReleaseDate: '2021-01-17',
            prepareBranch: '2021W11',
            prepareCreateDate: '2021-04-01',
            prepareReleaseDate: 'null'
          },
          {
            id: '111114',
            code: 'MIM',
            currentBranch: '2021W01',
            currentCreateDate: '2021-01-07',
            currentReleaseDate: '2021-01-17',
            prepareBranch: '2021W11',
            prepareCreateDate: '2021-04-01',
            prepareReleaseDate: 'null'
          },
          {
            id: '111115',
            code: 'AER',
            currentBranch: '2021W01',
            currentCreateDate: '2021-01-07',
            currentReleaseDate: '2021-01-17',
            prepareBranch: '2021W11',
            prepareCreateDate: '2021-04-01',
            prepareReleaseDate: 'null'
          },
      ],
    });
  };
  
  export default {
    'GET /api/dashboard': getDashboard,
  };
  