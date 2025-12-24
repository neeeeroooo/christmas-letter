'use client';
import React from 'react';
import { ApolloLink, HttpLink } from '@apollo/client';

import {
  ApolloNextAppProvider,
  InMemoryCache,
  ApolloClient,
  SSRMultipartLink,
} from '@apollo/client-integration-nextjs';

function makeClient() {
  // คุณสามารถดึง clientId จากที่ไหนก็ได้ในแอปของคุณ

  const apiEndPoint = process.env.AUTH_API_ENDPOINT;

  // สร้าง ApolloLink เพื่อเพิ่ม clientId ใน headers
  const authLink = new ApolloLink((operation, forward) => {
    // เพิ่ม clientId เข้าไปใน headers
    operation.setContext(({ headers = {} }) => {
      const newHeaders = {
        ...headers,
      };

      return {
        headers: newHeaders,
      };
    });

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: apiEndPoint,
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(httpLink), // เชื่อม authLink กับ httpLink
          ])
        : authLink.concat(httpLink), // เชื่อม authLink กับ httpLink สำหรับฝั่ง client
  });
}

export function ApolloWrapper({
  children,
}: React.PropsWithChildren<Record<never, any>>) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
