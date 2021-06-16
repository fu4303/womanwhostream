export default class ContentfulApi {
  static async getStreamersByTag(tagSlug) {
    const query = `{
    tagCollection(limit: 1, where: {slug: "${tagSlug}"}) {
      items {
        name
        slug
        linkedFrom {
          streamerCollection {
            total
            items {
              sys {
                id
              }
              githubUsername
              twitchUsername
              twitterUsername
              youtubeChannelId
              websiteUrl
              location
              tagsCollection {
                items {
                  sys {
                    id
                  }
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  }`;

    const response = await this.callApi(query);
    return response.data.tagCollection.items[0].linkedFrom.streamerCollection;
  }

  static async getAllTags() {
    const query = `{
    tagCollection {
      total
      items {
        name
        slug
      }
    }
  }`;

    const tags = await this.callApi(query);
    return tags.data.tagCollection.items;
  }

  static async getTagBySlug(slug) {
    const query = `{
      tagCollection(limit: 1, where: {slug: "${slug}"}) {
        items {
          name
          slug
        }
      }
    }`;

    const tags = await this.callApi(query);
    return tags.data.tagCollection.items[0];
  }

  static async getAllStreamers() {
    const query = `{
  streamerCollection {
    total
    items {
      sys {
        id
      }
      githubUsername
      twitchUsername
      twitterUsername
      youtubeChannelId
      websiteUrl
      location
      tagsCollection {
        items {
          sys {
            id
          }
          name
          slug
        }
      }
    }
  }
}`;

    const streamers = await this.callApi(query);
    return streamers.data.streamerCollection;
  }

  static async callApi(query) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTFL_SPACE_ID}`;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CTFL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) => response.json());
      return data;
    } catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }
}