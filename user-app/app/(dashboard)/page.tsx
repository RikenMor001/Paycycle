// one can only use useSession() provided it is wrapped inside a <Provider></Provider> which is know as a sessionProvider
// Can you directly just call sessionProvider(authOptions) this way? yes
// For just keeping the code structure clean, it's better to wrap the codebase this way 
// <SessionProvider>
//  <Appbar>
//    {children}
// </SessionProvider>

import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')      
  }
}