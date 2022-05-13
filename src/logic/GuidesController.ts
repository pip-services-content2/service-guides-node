import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { TagsProcessor } from 'pip-services3-commons-nodex';
import { NotFoundException } from 'pip-services3-commons-nodex';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { GuideV1 } from '../data/version1/GuideV1';
import { IGuidesPersistence } from '../persistence/IGuidesPersistence';
import { IGuidesController } from './IGuidesController';
import { GuidesCommandSet } from './GuidesCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class GuidesController implements IConfigurable, IReferenceable, ICommandable, IGuidesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-guides:persistence:*:*:1.0',
        'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(GuidesController._defaultConfig);
    private _persistence: IGuidesPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: GuidesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IGuidesPersistence>('persistence');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new GuidesCommandSet(this);
        return this._commandSet;
    }

    public async getGuides(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<GuideV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getRandomGuide(correlationId: string, filter: FilterParams): Promise<GuideV1> {
        return await this._persistence.getOneRandom(correlationId, filter);
    }

    public async getGuideById(correlationId: string, guideId: string): Promise<GuideV1> {
        return await this._persistence.getOneById(correlationId, guideId);
    }

    public async createGuide(correlationId: string, guide: GuideV1): Promise<GuideV1> {
        let newGuide: GuideV1 = null;

        guide.create_time = new Date();
        guide.all_tags = TagsProcessor.extractHashTags(
            '#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru'
        );

        newGuide = await this._persistence.create(correlationId, guide);

        await this._attachmentsConnector.addAttachments(correlationId, newGuide);

        return newGuide;
    }

    public async updateGuide(correlationId: string, guide: GuideV1): Promise<GuideV1> {
        let oldGuide: GuideV1 = null;
        let newGuide: GuideV1 = null;
        
        guide.all_tags = TagsProcessor.extractHashTags(
            '#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru'
        );

        oldGuide = await this._persistence.getOneById(correlationId, guide.id);

        if (oldGuide == null) {
            throw new NotFoundException(
                correlationId,
                'GUIDE_NOT_FOUND',
                'Guide ' + guide.id + ' was not found'
            ).withDetails('guide_id', guide.id);
        }

        newGuide = await this._persistence.update(correlationId, guide);

        await this._attachmentsConnector.updateAttachments(correlationId, oldGuide, newGuide);

        return newGuide;
    }

    public async deleteGuideById(correlationId: string, guideId: string): Promise<GuideV1> {
        let oldGuide: GuideV1 = null;

        oldGuide = await this._persistence.deleteById(correlationId, guideId);

        await this._attachmentsConnector.removeAttachments(correlationId, oldGuide)

        return oldGuide;
    }

}
