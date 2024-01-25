// // /app/(auth)/login/BioForm.tsx
// "use client";

// import { useEffect, useState } from "react";
// import type { FormEvent } from "react";

// import { Amplify } from "aws-amplify";
// import { createUser, updateUser } from "@/src/graphql/mutations";
// import * as queries from "/src/graphql/queries";
// import { getCurrentUser } from "@aws-amplify/auth";
// import { generateClient } from "aws-amplify/api";

// import awsExports from "@/src/aws-exports";

// Amplify.configure(awsExports);

// const client = generateClient();

// export default function BioForm() {
//   const [loggedInUser, setLoggedInUser] = useState<any>(null);
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const [userProfileExists, setUserProfileExists] = useState<boolean>(false);
 
//   async function onSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const form = new FormData(event.currentTarget);
//     const description = form.get("description") || userProfile?.description;
//     const link = form.get("link") || userProfile?.link;

//     if (userProfileExists) {
//       await onUpdate({
//         id: userProfile?.id,
//         username: loggedInUser?.username,
//         description,
//         link,
//       });
//     } else {
//       await onCreate({
//         username: loggedInUser?.username,
//         description,
//         link,
//       });
//     }
//   }

//   // include mutation handlers to update user profile
//   const onCreate = async (formData: {
//     username: string;
//     description: string;
//     link: string;
//   }) => {
//     const { username, description, link } = formData;
//     const input = { username, description, link };
//     await client.graphql({
//       query: createUser,
//       variables: { input },
//       authMode: "userPool",
//     });
//   };

//   const onUpdate = async (formData: {
//     id: string;
//     username: string;
//     description: string;
//     link: string;
//   }) => {
//     const { id, username, description, link } = formData;
//     const input = { id, username, description, link };
//     await client.graphql({
//       query: updateUser,
//       variables: { input },
//       authMode: "userPool",
//     });
//   };

//   const getUserProfile = async (username: string) => {
//     return await client.graphql({
//       query: queries.byUsername,
//       variables: { username },
//       authMode: "userPool",
//     });
//   };

//   useEffect(() => {
//     const getUser = async () => {
//       const user = await getCurrentUser();
//       if (user) {
//         setLoggedInUser(user as any);

//         const { data } = await getUserProfile(user?.username);

//         const profile = data?.byUsername?.items[0];

//         if (profile) {
//           setUserProfileExists(true);
//           setUserProfile(profile as any);
//         }
//       }
//     };

//     getUser();
//   }, []);

//   return (
//     <form onSubmit={onSubmit}>
//       <div>
//         <input
//           type="text"
//           name="username"
//           id="username"
//           value={loggedInUser?.username}
//           disabled={true}
//         />
//       </div>

//       <div>
//         <textarea name="description" id="description" />
//       </div>

//       <div>
//         <label htmlFor="link">Link</label>
//         <input type="url" name="link" id="link" />
//       </div>

//       <div>
//         <button type="submit">
//           {userProfileExists ? "Update" : "Create"}
//         </button>
//       </div>
//     </form>
//   );
// }