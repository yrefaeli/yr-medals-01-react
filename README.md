# Medals App

## Steps to run

1. **Clone the repo**

   ```bash
   git clone https://github.com/yrefaeli/yr-medals-01-react.git
   ```

2. **Change into the project directory**

   ```bash
   cd yr-medals-01-react
   ```

3. **Checkout the `feat/medal-count` branch**

   ```bash
   git checkout feat/medal-count
   ```

4. **Install dependencies & start the mock dev server**
   ```bash
   npm install
   npm run dev-mock
   ```
   **Or instead, to mock a 500 error from the API**
   ```bash
   npm run dev-mock-error
   ```

## Additional Info

You can view my entire implementation in a single pull request:

[PR Files](https://github.com/yrefaeli/yr-medals-01-react/pull/1)

### Implementation Details

This app uses Vite, React, SWC, Typescript, TailwindCSS and Express (for the tiny mock server)

App.tsx fetches the medals.json through the Express server (located in the /mock folder).

The data is then passed into the MedalsPage, and subsequently into the MedalTable. The MedalTable is a concrete implementation of its child MultiSortTable, which takes some props including sortPriorities which informs it on how to deal with tie-breakers. Note that only a single tie-breaker was specified in the requirements for each field, but you could pass in additional sort priorities, for instance:

```code
  {
     total: ["gold"],
     gold: ["silver"],
     silver: ["gold"],
     bronze: ["gold, silver"],
  }
```

One known bug is that the blank header for country names is clickable/sortable.

I did also want to implement a version using Next.js, but ran out of time unfortunately.
◊