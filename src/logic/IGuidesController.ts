import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { GuideV1 } from '../data/version1/GuideV1';

export interface IGuidesController {
    getGuides(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<GuideV1>>;

    getRandomGuide(correlationId: string, filter: FilterParams): Promise<GuideV1>;

    getGuideById(correlationId: string, guideId: string): Promise<GuideV1>;

    createGuide(correlationId: string, guide: GuideV1): Promise<GuideV1>;

    updateGuide(correlationId: string, guide: GuideV1): Promise<GuideV1>;

    deleteGuideById(correlationId: string, guideId: string): Promise<GuideV1>;
}
