import { Module, RequestMethod } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CharacterModule } from '../character/character.module';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceModule } from '../alliance/alliance.module';
import { HashtagModule } from '../hashtag/hashtag.module';
import { UniverseLocationModule } from '../universe/location/location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),

    AuthenticationModule,
    CharacterModule,
    CorporationModule,
    AllianceModule,
    HashtagModule,
    UniverseLocationModule,
  ],
  controllers: [
    PostController,
  ],
  providers: [
    PostService,
  ],
  exports: [
    PostService,
  ],
})
export class PostModule {
}
