import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req;

  if (req) {
    switch (method) {
      case 'GET':
        try {
          //Read the json data file
          const fileContents = await fs.readFile('components/data/clients.json', 'utf8'); //jsonDirectory + 
          //Return the content of the datafile in json format
          const result = JSON.parse(fileContents);
          res.status(200).json(result);
          res.end();
        } catch (err) {
          (res);
        }
        break;
      case 'POST':
        try {
        //Read the json data file data.json
        const fileContents = await fs.readFile('components/data/clients.json', 'utf8');
        //Return the content of the data file in json format
        const parseContent = JSON.parse(fileContents);
        //push new data
        parseContent.clients.push(
          { id: Math.floor(Math.random() * 101), 
            name: req.body.name, 
            website: req.body.website, 
            companyRegNr: req.body.companyRegNr, 
            vatRegNr: req.body.vatRegNr, 
            notes: req.body.notes,
            contactAddress: req.body.contactAddress
          }
        );
        const result = JSON.stringify(parseContent);
        fs.writeFile('components/data/clients.json', result);
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