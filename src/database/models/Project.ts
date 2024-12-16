import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Project extends Model {
    static table = 'projects';

    @field('name') name!: string;
    @readonly @date('created_at') createdAt!: Date;
}
