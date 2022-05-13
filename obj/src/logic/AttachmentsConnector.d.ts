import { IAttachmentsClientV1 } from 'client-attachments-node';
import { GuideV1 } from '../data/version1/GuideV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(_attachmentsClient: IAttachmentsClientV1);
    private extractAttachmentIds;
    addAttachments(correlationId: string, guide: GuideV1): Promise<void>;
    updateAttachments(correlationId: string, oldGuide: GuideV1, newGuide: GuideV1): Promise<void>;
    removeAttachments(correlationId: string, guide: GuideV1): Promise<void>;
}
