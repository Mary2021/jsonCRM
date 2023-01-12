import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import console from 'console';

type Data = {
  name: string;
  description: string;
  tags: string;
  liveUrl: string;
  repositoryUrl: string;
};

export default withSentry(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { query, method } = req;
  const { id }: { id: string } =
    req.query instanceof Array ? req.query[0] : req.query;

  if (req) {
    switch (method) {
      case 'GET':
        try {
          //Return the content of the data file in json format
          const fileContents = await fs.readFile('components/data/services.json', 'utf8');
          const parseContent = JSON.parse(fileContents);
          //get object id value
          const temp = {}
          for (let i = 0; i < parseContent.services.length; i++) {
            temp[parseContent.services[i].id] = parseContent.services[i]; //outcome => [ 88 ] {key:'id' and value:88 ect}
          }
          //get dataobject with unique id
          const result = temp[id]
          res.status(200).json(result);
          res.end();
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
          res.end();
        }
        break;
      case 'PUT':
        try {   
          const fileContents = await fs.readFile('components/data/services.json', 'utf8');
          const parseContent = JSON.parse(fileContents);

          if (id) {
          //get object id values and save objects that match the condition in temp
          let uniqId = ''
          let copyId = ''
          let temp = {}
          for (let i = 0; i < parseContent.services.length; i++) {
            uniqId = (parseContent.services[i].id).toString()
            if (uniqId != id){
              temp[parseContent.services[i].id] = parseContent.services[i]; //outcome => [ 88 ] {key:'id' and value:88 ect}
            } else if (uniqId == id) {
              copyId = req.body.id
                temp[parseContent.services[i].id] = { 
                  id: copyId, 
                  name: req.body.name, 
                  tags: req.body.tags, 
                  description: req.body.description, 
                  liveUrl:req.body.liveUrl,
                  repositoryUrl:req.body.repositoryUrl 
                }
              }
            }
          //clear datafile content
          parseContent.services = []
          // push each of the values back into the datafile array
          for (let o in temp) {          
            parseContent.services.push(temp[o]);
          }
          } else {
            //Read the json data file data.json
            const fileContent = await fs.readFile('components/data/services.json', 'utf8');
            //Return the content of the data file in json format
            const parseContent = JSON.parse(fileContent);
            //push new data
            parseContent.services.push(
              { id:Math.floor(Math.random() * 101), 
                name: req.body.name, 
                tags: req.body.tags, 
                description: req.body.description, 
                liveUrl:req.body.liveUrl,
                repositoryUrl:req.body.repositoryUrl 
              });
          }
          const result = JSON.stringify(parseContent);
          fs.writeFile('components/data/services.json', result);
          res.status(200).json(result);
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ err: 'Error occured while updating service.' });
        }
        break;
      case 'DELETE':
        try {
          //const fsPromises = require('fs').promises; 
          const fileContents = await fs.readFile('components/data/services.json', 'utf8');
          const parseContent = JSON.parse(fileContents);
          const temp = {}
          let uniqId = ''
          //save objects that match the condition in temp
          for (let i = 0; i < parseContent.services.length; i++) {
            uniqId = (parseContent.services[i].id).toString()
            if (uniqId != id){
              temp[parseContent.services[i].id] = parseContent.services[i]; //outcome => [ 88 ] {key:'id' and value:88 ect}
            } 
          }
          //clear datafile content
          parseContent.services = []
          // push each of the values back into the datafile array
          for (let o in temp) {          
            parseContent.services.push(temp[o]);
          }
          const result = JSON.stringify(parseContent);
          fs.writeFile('components/data/services.json', result);
          res.status(200).json(result);
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ err: 'Error occured while removing a service.' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(401);
  }
  res.end();
});