import { Controller } from '@nestjs/common';
import { IPostGrpcService, ICreateAsCharacterRequest, IPostResponse,
  ICreateAsCorporationRequest, ICreateAsAllianceRequest, IGetCharacterWallRequest,
  IPaginatedPostResponse, IGetCorporationWallRequest, IGetAllianceWallRequest,
  IGetHashtagWallRequest, IGetLocationWallRequest, IGetLatestWallRequest, IUrlResponse, IGetRequest } from './post.grpc.interface';
import { PostService } from '../post.service';
import { Observable, from } from 'rxjs';
import { Post } from '../post.entity';
import { map } from 'rxjs/operators';
import { IURLMetadata } from '@new-eden-social/api-metascraper';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class PostGrpcController implements IPostGrpcService {

  constructor(
    private readonly postService: PostService,
    ) {
  }

  @GrpcMethod('PostService')
  get(data: IGetRequest): Observable<IPostResponse> {
    return from(this.postService.get(data.postId)).pipe<IPostResponse>(
      map<Post, IPostResponse>(this.postTransform)
    );
  }

  @GrpcMethod('PostService')
  createAsCharacter(data: ICreateAsCharacterRequest): Observable<IPostResponse> {
    return from(this.postService.createAsCharacter(data.post, data.characterId)).pipe<IPostResponse>(
      map<Post, IPostResponse>(this.postTransform)
    );
  }

  @GrpcMethod('PostService')
  createAsCorporation(data: ICreateAsCorporationRequest): Observable<IPostResponse> {
    return from(this.postService.createAsCorporation(data.post, data.corporationId)).pipe<IPostResponse>(
      map<Post, IPostResponse>(this.postTransform)
    );
  }

  @GrpcMethod('PostService')
  createAsAlliance(data: ICreateAsAllianceRequest): Observable<IPostResponse> {
    return from(this.postService.createAsAlliance(data.post, data.allianceId)).pipe<IPostResponse>(
      map<Post, IPostResponse>(this.postTransform)
    );
  }

  @GrpcMethod('PostService')
  getCharacterWall(data: IGetCharacterWallRequest): Observable<IPaginatedPostResponse> {
    return from(this.postService.getCharacterWall(
      data.characterId,
      data.pagination.limit,
      data.pagination.page,
      )).pipe<IPaginatedPostResponse>(
      map<{posts: Post[], count: number}, IPaginatedPostResponse>(wallData => ({
          posts: wallData.posts.map(this.postTransform),
          count: wallData.count,
        }))
    );
  }

  @GrpcMethod('PostService')
  getCorporationWall(data: IGetCorporationWallRequest): Observable<IPaginatedPostResponse> {
    return from(this.postService.getCorporationWall(
      data.corporationId,
      data.pagination.limit,
      data.pagination.page,
      )).pipe<IPaginatedPostResponse>(
      map<{posts: Post[], count: number}, IPaginatedPostResponse>(wallData => ({
          posts: wallData.posts.map(this.postTransform),
          count: wallData.count,
        }))
    );
  }

  @GrpcMethod('PostService')
  getAllianceWall(data: IGetAllianceWallRequest): Observable<IPaginatedPostResponse> {
    return from(this.postService.getAllianceWall(
      data.allianceId,
      data.pagination.limit,
      data.pagination.page,
      )).pipe<IPaginatedPostResponse>(
      map<{posts: Post[], count: number}, IPaginatedPostResponse>(wallData => ({
          posts: wallData.posts.map(this.postTransform),
          count: wallData.count,
        }))
    );
  }

  @GrpcMethod('PostService')
  getHashtagWall(data: IGetHashtagWallRequest): Observable<IPaginatedPostResponse> {
    return from(this.postService.getHashtagWall(
      data.hashtag,
      data.pagination.limit,
      data.pagination.page,
      )).pipe<IPaginatedPostResponse>(
      map<{posts: Post[], count: number}, IPaginatedPostResponse>(wallData => ({
          posts: wallData.posts.map(this.postTransform),
          count: wallData.count,
        }))
    );
  }

  @GrpcMethod('PostService')
  getLocationWall(data: IGetLocationWallRequest): Observable<IPaginatedPostResponse> {
    return from(this.postService.getLocationWall(
      data.locationId,
      data.pagination.limit,
      data.pagination.page,
      )).pipe<IPaginatedPostResponse>(
      map<{posts: Post[], count: number}, IPaginatedPostResponse>(wallData => ({
          posts: wallData.posts.map(this.postTransform),
          count: wallData.count,
        }))
    );
  }

  @GrpcMethod('PostService')
  getLatestWall(data: IGetLatestWallRequest): Observable<IPaginatedPostResponse> {
    return from(this.postService.getLatestWall(
      data.pagination.limit,
      data.pagination.page,
      )).pipe<IPaginatedPostResponse>(
      map<{posts: Post[], count: number}, IPaginatedPostResponse>(wallData => ({
          posts: wallData.posts.map(this.postTransform),
          count: wallData.count,
        }))
    );
  }

  private postTransform(post: Post): IPostResponse {
    return {
      id: post.id,
      content: post.content,
      type: post.type,
      killmailId: post.killmailId,
      url: this.urlMetadataTransform(post.url),
      createdAt: post.createdAt.toISOString(),
      locationId: post.locationId,
      characterId: post.characterId,
      corporationId: post.corporationId,
      allianceId: post.allianceId,
      characterWallId: post.characterWallId,
      corporationWallId: post.corporationWallId,
      allianceWallId: post.allianceWallId,
      hashtags: post.hashtags,
    };
  }

  private urlMetadataTransform(urlMetadata: IURLMetadata): IUrlResponse {
    return  {
      author: urlMetadata.author,
      date: urlMetadata.date,
      description: urlMetadata.description,
      image: urlMetadata.image,
      video: urlMetadata.video,
      lang: urlMetadata.lang,
      logo: urlMetadata.logo,
      publisher: urlMetadata.publisher,
      title: urlMetadata.title,
      url: urlMetadata.url,
      killmailId: urlMetadata.killmailId,
    };
  }
}
