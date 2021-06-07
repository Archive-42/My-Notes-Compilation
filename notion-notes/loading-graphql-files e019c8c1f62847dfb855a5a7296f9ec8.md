# loading-graphql-files

To load `.gql` and `.graphql` files, first install the `[graphql](https://www.npmjs.com/package/graphql)` and `[graphql.macro](https://www.npmjs.com/package/graphql.macro)` packages by running:

```
npm install --save graphql graphql.macro
```

Alternatively you may use `yarn`:

```
yarn add graphql graphql.macro
```

Then, whenever you want to load `.gql` or `.graphql` files, import the `loader` from the macro package:

```
import { loader } from 'graphql.macro';const query = loader('./foo.graphql');
```

And your results get automatically inlined! This means that if the file above, `foo.graphql`, contains the following:

```
query {
  hello {
    world
  }
}
```

The previous example turns into:

```
const query = {  'kind': 'Document',  'definitions': [{    ...  }],  'loc': {    ...    'source': {      'body': '\\\\n  query {\\\\n    hello {\\\\n      world\\\\n    }\\\\n  }\\\\n',      'name': 'GraphQL request',      ...    }  }};
```

You can also use the `gql` template tag the same way you would use the non-macro version from `graphql-tag` package with the added benefit of inlined parsing results.

```
import { gql } from 'graphql.macro';const query = gql`  query User {    user(id: 5) {      lastName      ...UserEntry1    }  }`;
```
