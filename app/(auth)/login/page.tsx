"use client";

// ...imports...
import React from 'react';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../../src/amplifyconfiguration.json';

Amplify.configure(amplifyconfig);
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../../../src/aws-exports'
export default function App() {
  return (
    <div>
      <Authenticator
        initialState="signUp"
        components={{
          SignUp: {
            FormFields() {
              return (
                <>
                  <Authenticator.SignUp.FormFields />
                </>
              );
            },
          },
        }}
        services={{
          async validateCustomSignUp(formData) {
            // this is important
            if (!formData.username) {
              return {
                acknowledgement: "Username is invalid.",
              };
            }

            // match subdomain pattern
            const subdomainRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

            // check if subdomain is valid
            if (!subdomainRegex.test(formData?.username)) {
              return {
                acknowledgement: "Username is invalid.",
              };
            }
          },
        }}
      >
        {({ signOut, user }) => (
          <div>
            <main>
              <h1>Hello, {user?.username}.</h1>
              <div>
                <button onClick={signOut}>Sign out</button>
              </div>
            </main>
          </div>
        )}
      </Authenticator>
    </div>
  );
}