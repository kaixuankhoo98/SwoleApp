import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const loginWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return false;
    } else {
      localStorage.setItem('sessionToken', data.session.access_token);
      return true;
    }
  } catch (e) {
    console.error('Unexpected login error: ', e.message);
  }
  return false;
}

export const checkSession = async () => {
  const sessionToken = localStorage.getItem('sessionToken');
  
  if (!sessionToken) {
    return null;
  }
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user);
  return user;
}

export const logout = () => {
  localStorage.removeItem('sessionToken');
  supabase.auth.logout();
}