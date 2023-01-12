import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req;

  if (req) {
    switch (method) {
      case 'GET':
        try {
            //Read the json data file
            const fileContent = await fs.readFile('components/data/services.json', 'utf8');
            //Return the content of the datafile in json format
            const result = JSON.parse(fileContent);
            //const result = parseContent
          res.status(200).json(result);
          res.end();
        } catch (err) {
          (res);
        }
        break;
      case 'POST':
        try {
          //Read the json data file data.json
          const fileContent = await fs.readFile('components/data/services.json', 'utf8');
          //Return the content of the data file in json format
          const parseContent = JSON.parse(fileContent);
          //push new data
          parseContent.services.push(
            { id: Math.floor(Math.random() * 101), 
              name: req.body.name, 
              tags: req.body.tags, 
              description: req.body.description, 
              liveUrl:req.body.liveUrl,
              repositoryUrl:req.body.repositoryUrl 
            });
          const result = JSON.stringify(parseContent);
          fs.writeFile('components/data/services.json', result);
          res.status(200).json(result);
          res.end();
        } catch (err) {
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(401);
  }
  res.end();
}