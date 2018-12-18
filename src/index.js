const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => links.find(link => link.id === args.id)
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };

      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      let foundI = "";
      const foundLink = links.map((link, i) => {
        if (link.id === args.id) {
          foundI = i;
          link.description = args.description || link.description;
          link.url = args.url || link.url;
        }
        return link;
      });

      links = foundLink;
      return foundLink[foundI];
    },
    deleteLink: (root, args) => {
      const newLinks = links.filter(link => link.id !== args.id);

      links = newLinks;
      return links;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
