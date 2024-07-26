import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { Toaster } from './components/ui/sonner.tsx';
import {Provider} from "react-redux"
import store from './Redux/store.ts';

const uploadLink = createUploadLink({
   uri:import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:4000/graphql" : "/graphql",
   credentials: "include",
})

const client = new ApolloClient({
  link:uploadLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
        <App />
        <Toaster visibleToasts={1} position='top-right' richColors />
        </Provider>
      </ApolloProvider>
    </BrowserRouter>,
)
