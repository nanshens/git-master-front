import { Request, Response } from 'express';

const getProject = (req: Request, res: Response) => {
    res.json({
      data: [
        {
          id: '111111',
          code: 'GE',
          name: 'GE',
          currentBranch: '2021W01',
          currentCreateDate: '2021-01-07',
          currentReleaseDate: '2021-01-17',
          prepareBranch: '2021W11',
          prepareCreateDate: '2021-04-01',
          prepareReleaseDate: 'null',
          releaseProcess: '90%'
        },
        {
            id: '111112',
            code: 'FE',
            name: 'FE',
            currentBranch: '2021W01',
            currentCreateDate: '2021-01-07',
            currentReleaseDate: '2021-01-17',
            prepareBranch: '2021W11',
            prepareCreateDate: '2021-04-01',
            prepareReleaseDate: 'null',
            releaseProcess: '90%'
          },
          {
            id: '111113',
            code: 'CT',
            name: 'CT',
            currentBranch: '2021W01',
            currentCreateDate: '2021-01-07',
            currentReleaseDate: '2021-01-17',
            prepareBranch: '2021W11',
            prepareCreateDate: '2021-04-01',
            prepareReleaseDate: 'null',
            releaseProcess: '90%'
          },
          {
            id: '111114',
            code: 'MIM',
            name: 'MIM',
            currentBranch: '2021W01',
            currentCreateDate: '2021-01-07',
            currentReleaseDate: '2021-01-17',
            prepareBranch: '2021W11',
            prepareCreateDate: '2021-04-01',
            prepareReleaseDate: 'null',
            releaseProcess: '90%'
          },
          {
            id: '111115',
            code: 'AER',
            name: 'AER',
            currentBranch: '2021W01',
            currentCreateDate: '2021-01-07',
            currentReleaseDate: '2021-01-17',
            prepareBranch: '2021W11',
            prepareCreateDate: '2021-04-01',
            prepareReleaseDate: 'null',
            releaseProcess: '90%'
          },
      ],
    });
  };
  
  export default {
    'GET /api/project': getProject,
  };
  