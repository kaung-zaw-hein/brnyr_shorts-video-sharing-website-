import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../../utils/client';
import { singleUserQuery,  userCreatedPostsQuery, userLikedPostsQuery  } from '../../../utils/queries';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
      if (req.method === 'GET') {
         const { id } : any = req.query;
         
         const query = singleUserQuery(id);
         const userVideosQuery = userCreatedPostsQuery(id);
         const userLikedVideosQuery = userLikedPostsQuery(id);
         
         const user = await client.fetch(query);
         const userVideos = await client.fetch(userVideosQuery);
         const userLikedVideos = await client.fetch(userLikedVideosQuery);

         const data = { user: user[0], userVideos, userLikedVideos };

         res.status(200).json(data);

      }else if (req.method === 'PUT') {
         const { userName, userId } = req.body;
         const data = await client
            .patch(userId)
            .set({userName : userName})
            .commit();
         res.status(200).json(data);
      } 
   }