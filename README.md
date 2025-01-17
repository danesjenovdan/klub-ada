This is the Klub Ada website built with [Next.js](https://nextjs.org), React and Typescript.

## Getting Started with the project

If you only cloned the project, start by installing the packages, needed to run the app:

```bash
npm install
```

Then start the project on the local server by using:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Writing content for the website

We use Sanity to make sure the content is easy to edit on the go. Sanity works by setting a schema for the content types (e.g. a blog post or in our case activity or event).

In the schema you specify the properties for each type (like that the blog post will have a title and image) - you can read more about the type definitions and available types [here](https://www.sanity.io/docs/schemas-and-forms). After making changes to the schema (or other setup related things) you always need to run `npx sanity deploy` so that the schema is updated on the deployed version of Sanity Studio (more on that below). This will later be automised but for now requires a manual process.

For editing the actual content we use something called Sanity Studio. There are two ways to reach it:

- you can run the app locally or access the website and use the `/studio` route
- by using the Sanity deployed version, which is available at [https://klub-ada.sanity.studio/](https://klub-ada.sanity.studio/)

You need to have a Sanity login for both of these since the editor is protected. Contact Neža to get access.

## Learn More about Next

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
