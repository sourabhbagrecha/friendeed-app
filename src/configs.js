const configs = {
  development: {
    domain: "friendeed-localhost.us.auth0.com",
    clientId: "gguVf0HIhkalafKjnwlxFUfAc1azRlX2",
    slashGraphQLEndpoint: "friendeed-dev.ap-south-1.aws.cloud.dgraph.io/graphql"
  },
  production: {
    domain: "friendeed-dev.us.auth0.com",
    clientId: "a6OMEu3KekYtabKIJUDti2hrGxzYsLEg",
    slashGraphQLEndpoint: "friendeed.ap-south-1.aws.cloud.dgraph.io/graphql"
  }
}

const envConfigs = configs[process.env.NODE_ENV || "development"]

export default envConfigs