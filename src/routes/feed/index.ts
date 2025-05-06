import { prismaClient } from "../../integration/prisma";
import { createSecureRoute } from "../middlewares/session-middleware";



export const feedRoute = createSecureRoute();


feedRoute.get("",async (context) =>{
 
     
    
     const latest10Posts = await prismaClient.post.findMany({
         include: {
           author: true,
         },
         take: 10,
       });
    
     
       return context.json(latest10Posts);
})