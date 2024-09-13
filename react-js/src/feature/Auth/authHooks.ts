import { useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { apiRequest } from '../../shared/hooks/api';

enum UserEndpoints {
  User = '/api/user'
}


const userSchema = z.object({
  user: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
  }),
});

export type UserSchema = z.infer<typeof userSchema>;

// const fetchUser = async () => {
//   const response = await fetch('http://192.168.1.212:5000/api');

//   console.log(response.body);

//   if (!response.ok) {
//     throw new Error('Failed to fetch user');
//   }

//   const data = await response.json();
//   // userSchema.parse(data);

//   // return data.user;
// };

// const useUser = () => {
//   return useQuery<UserSchema, Error>('user', fetchUser);
// };

const useUser = () => {
  const userResult = useSuspenseQuery({
    queryKey: [UserEndpoints.User],
    queryFn: async () => {
      const result = await apiRequest<UserSchema>(UserEndpoints.User);
      const { user } = userSchema.parse(result);
      console.log(user);
      return user;
      // console.log(result);
      // return result;
    }
  });

  return {
    ...userResult
  }
}

export default useUser;