import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

// Helper function for token expiration check
// const isTokenExpired = (token: string): boolean => {
//   try {
//     const decodedToken = jwtDecode(token);
//     return decodedToken.exp! * 1000 < Date.now(); // `exp` is in seconds
//   } catch (error) {
//     console.error('Invalid token:', error);
//     return true; // Treat invalid token as expired
//   }
// };
export default async function Home() {
  // JWT Authentication logic
  // const accessToken = (await cookies()).get('accessToken')?.value;
  // const refreshToken = (await cookies()).get('refreshToken')?.value;

  // if (accessToken && refreshToken) {
  //   // Check if the token is valid
  //   if (!isTokenExpired(refreshToken)) {
  //     return redirect('/app'); // Redirect from login page if already authenticated
  //   }
  // }
  // return redirect('/login');
  return redirect('/home');
}
