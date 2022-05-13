import { ReferenceV1 } from 'client-attachments-node';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { GuideV1 } from '../data/version1/GuideV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    private extractAttachmentIds(guide: GuideV1): string[] {
        let ids: string[] = [];

        for (let page of guide.pages) {
            if (page.pic_id)
                ids.push(page.pic_id);
        }

        return ids;
    }

    public async addAttachments(correlationId: string, guide: GuideV1): Promise<void> {
        
        if (this._attachmentsClient == null || guide == null) {
            return;
        }

        let ids = this.extractAttachmentIds(guide);
        let reference = new ReferenceV1(guide.id, 'guide');
        await this._attachmentsClient.addAttachments(correlationId, reference, ids)
    }

    public async updateAttachments(correlationId: string, oldGuide: GuideV1, newGuide: GuideV1): Promise<void> {
        
        if (this._attachmentsClient == null || oldGuide == null || newGuide == null) {
            return;
        }

        let oldIds = this.extractAttachmentIds(oldGuide);
        let newIds = this.extractAttachmentIds(newGuide);
        let reference = new ReferenceV1(newGuide.id, 'guide');
        await this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds)
    }

    public async removeAttachments(correlationId: string, guide: GuideV1): Promise<void> {
        if (this._attachmentsClient == null || guide == null) {
            return;
        }

        let ids = this.extractAttachmentIds(guide);
        let reference = new ReferenceV1(guide.id, 'guide');
        await this._attachmentsClient.removeAttachments(correlationId, reference, ids);
    }

}