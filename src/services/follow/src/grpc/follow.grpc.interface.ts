import { Observable } from 'rxjs';
import { Follow } from '../follow.entity';

// Should reflect the .proto file!
export interface IFollowService {
  getAllianceFollowers(allianceId: number): Observable<{ followers: Follow[] }>;
}
