/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../service/supabaseClient";

//functions for handling supabase auths
//---login user---
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    if (authError) {
      throw authError;
    }
    const authUser = authData.user;

    //fetch user profile on sign in
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();
    if (profileError) {
      throw profileError;
    }
    const user = { ...authUser, profile };
    return user;
  }
);
//---signup user---
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    { email, password, username },
    thunkAPI
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    if (error) {
      throw error;
    }
    const userId = data.user?.id;
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId,
        email,
        username,
      },
    ]);

    if (profileError) console.error("Profile creation error:", profileError);

    return data;
  }
);
//---logout---
export const signOutUser = createAsyncThunk("auth/logoutUser", async () => {
  await supabase.auth.signOut();
  return null;
});
//---session checkout---
export const checkSession = createAsyncThunk("auth/checkSession", async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
});

//  ---user account updaters----
// Update user account details
export const updateAccount = createAsyncThunk(
  "auth/updateAccount",
  async ({ id, username, email }, thunkAPI) => {
    const { error } = await supabase
      .from("profiles")
      .update({ username, email })
      .eq("id", id)
      .select("*");

    if (error) throw error;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    return data;
  }
);
//---fetch user account on sign in---
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (id, thunkAPI) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, email, avatar_url")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  }
);

//---Upload avatar---
export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async ({ userId, file }, thunkAPI) => {
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      return { avatar_url: publicUrl };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Rehydrate session on app start to ensure persistent auth
export const rehydrateSession = createAsyncThunk(
  "auth/rehydrateSession",
  async (_, rejectWithValue) => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const user = session?.user;
      if (!user) {
        return null;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      const userSession = { ...user, profile };
      return userSession;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          username: action.payload.profile.username,
          fullname: action.payload.profile.fullname,
          contact: action.payload.profile.contact,
          billing: action.payload.profile.billing,
          shipping: action.payload.profile.shipping,
          avatar_url: action.payload.profile.avatar_url,
        };
        state.isAuthenticated = true;
        state.token = action.payload.session?.access_token || null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      //signup
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = action.payload.session?.access_token || null;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      //logout
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      //fetch account
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // ---user account updaters---
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.user = { ...state.user, avatar_url: action.payload.avatar_url };
      })

      //---user rehydration---
      .addCase(rehydrateSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(rehydrateSession.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const user = action.payload;
          const profile = user.profile || {};

          state.user = {
            id: user.id,
            email: user.email,
            username: profile.username,
            fullname: profile.fullname,
            contact: profile.contact,
            billing: profile.billing,
            shipping: profile.shipping,
            avatar_url: profile.avatar_url,
          };
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })

      .addCase(rehydrateSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});
export default authSlice.reducer;
