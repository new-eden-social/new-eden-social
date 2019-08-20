import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { VCreatePost } from './post.validate';
import { POST_TYPES } from './post.constants';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MetascraperGrpcClient } from '@new-eden-social/api-metascraper';
import { IKillmail } from '@new-eden-social/zkillboard';
import { HashtagGrpcClient } from '@new-eden-social/api-hashtag';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
    private readonly metascraperClient: MetascraperGrpcClient,
    private readonly hashtagClient: HashtagGrpcClient,
  ) {
  }

  /**
   * Get single Post
   * @param id
   * @return {Promise<Post>}
   */
  public async get(id: string): Promise<Post> {
    return this.postRepository.findOne(id);
  }

  /**
   * Create Post as character
   * @param {VCreatePost} postData
   * @param {Number} characterId
   * @return {Promise<Post>}
   */
  public async createAsCharacter(
    postData: VCreatePost,
    characterId: number,
  ): Promise<Post> {
    const post = new Post();
    post.content = postData.content;
    post.type = postData.type;
    post.characterId = characterId;

    return this.create(post, postData);
  }

  /**
   * Create Post as corporation
   * @param {VCreatePost} postData
   * @param {Number} corporationId
   * @return {Promise<Post>}
   */
  public async createAsCorporation(
    postData: VCreatePost,
    corporationId: number,
  ): Promise<Post> {
    const post = new Post();
    post.content = postData.content;
    post.type = postData.type;
    post.corporationId = corporationId;

    return this.create(post, postData);
  }

  /**
   * Create Post as alliance
   * @param {VCreatePost} postData
   * @param {Number} allianceId
   * @return {Promise<Post>}
   */
  public async createAsAlliance(
    postData: VCreatePost,
    allianceId: number,
  ): Promise<Post> {
    const post = new Post();
    post.content = postData.content;
    post.type = postData.type;
    post.allianceId = allianceId;

    return this.create(post, postData);
  }

  /**
   * Get character wall
   * @param {Number} characterId
   * @param {Number} limit
   * @param {Number} page
   * @return {Promise<Post[]>}
   */
  public async getCharacterWall(
    characterId: number,
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const [posts, count] = await this.postRepository.getCharacterWall(characterId, limit, page);

    return { posts, count };
  }

  /**
   * Get corporation wall
   * @param {Number} corporationId
   * @param {Number} limit
   * @param {Number} page
   * @return {Promise<Post[]>}
   */
  public async getCorporationWall(
    corporationId: number,
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const [posts, count] = await this.postRepository.getCorporationWall(corporationId, limit, page);

    return { posts, count };
  }

  /**
   * Get alliance wall
   * @param {Number} allianceId
   * @param {Number} limit
   * @param {Number} page
   * @return {Promise<Post[]>}
   */
  public async getAllianceWall(
    allianceId: number,
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const [posts, count] = await this.postRepository.getAllianceWall(allianceId, limit, page);

    return { posts, count };
  }

  /**
   * Get all posts for specific hashtag
   * @param {string} hashtag
   * @param {number} limit
   * @param {number} page
   * @returns {Promise<{posts: Post[]; count: number}>}
   */
  public async getByHashtag(
    hashtag: string,
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const [posts, count] = await this.postRepository.getByHashtag(hashtag, limit, page);

    return { posts, count };
  }

  /**
   * Get all posts for specific location
   * @param {number} locationId
   * @param {number} limit
   * @param {number} page
   * @returns {Promise<{posts: Post[]; count: number}>}
   */
  public async getByLocation(
    locationId: number,
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const [posts, count] = await this.postRepository.getByLocation(locationId, limit, page);

    return { posts, count };
  }

  /**
   * Get latest posts
   * @param {Number} limit
   * @param {Number} page
   * @return {Promise<Post[]>}
   */
  public async getLatest(
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const [posts, count] = await this.postRepository.getLatest(limit, page);

    return { posts, count };
  }

  /**
   * Create killmail post
   * @param {Killmail} killmail
   * @param {Number} finalBlow
   * @return {Promise<Post>}
   */
  public async createKillmailPost(killmail: IKillmail, finalBlow: number): Promise<Post> {
    const post = new Post();
    post.type = POST_TYPES.KILLMAIL;
    post.killmailId = killmail.id;
    post.characterId = finalBlow;
    post.createdAt = killmail.date;
    post.locationId = killmail.locationId;
    return post.create();
  }

  public async getNumOfPostsByCharacter(
    characterId: number,
  ): Promise<number> {
    return this.postRepository.getNumOfPostsByCharacter(characterId);
  }

  public async getNumOfPostsByCorporation(
    corporationId: number,
  ): Promise<number> {
    return this.postRepository.getNumOfPostsByCorporation(corporationId);
  }

  public async getNumOfPostsByAlliance(
    allianceId: number,
  ): Promise<number> {
    return this.postRepository.getNumOfPostsByAlliance(allianceId);
  }

  /**
   * Create post
   * @param {Post} post
   * @param {VCreatePost} postData
   * @returns {Promise<Post>}
   */
  private async create(post: Post, postData: VCreatePost): Promise<Post> {
    if (postData.allianceId) {
      post.allianceWallId = postData.allianceId;
    }

    if (postData.corporationId) {
      post.corporationWallId = postData.corporationId;
    }

    if (postData.characterId) {
      post.characterWallId = postData.characterId;
    }

    if (postData.locationId) {
      post.locationId = postData.locationId;
    }

    if (postData.url) {
      const urlMetadata = await this.metascraperClient.service.processUrl(postData.url).toPromise();
      post.url = urlMetadata;
      post.killmailId = urlMetadata.killmailId;
    }

    post.hashtags = await this.hashtagClient.service.parse(post.content).toPromise();

    return this.postRepository.save(post);
  }
}
