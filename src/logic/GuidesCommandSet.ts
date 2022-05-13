import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { GuideV1Schema } from '../data/version1/GuideV1Schema';
import { IGuidesController } from './IGuidesController';

export class GuidesCommandSet extends CommandSet {
    private _logic: IGuidesController;

	constructor(logic: IGuidesController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetGuidesCommand());
		this.addCommand(this.makeGetRandomGuideCommand());
		this.addCommand(this.makeGetGuideByIdCommand());
		this.addCommand(this.makeCreateGuideCommand());
		this.addCommand(this.makeUpdateGuideCommand());
		this.addCommand(this.makeDeleteGuideByIdCommand());
	}

	private makeGetGuidesCommand(): ICommand {
		return new Command(
			"get_guides",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getGuides(correlationId, filter, paging);
			}
		);
	}

	private makeGetRandomGuideCommand(): ICommand {
		return new Command(
			"get_random_guide",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				return await this._logic.getRandomGuide(correlationId, filter);
			}
		);
	}

	private makeGetGuideByIdCommand(): ICommand {
		return new Command(
			"get_guide_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('guide_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let guideId = args.getAsNullableString("guide_id");
				return await this._logic.getGuideById(correlationId, guideId);
			}
		);
	}

	private makeCreateGuideCommand(): ICommand {
		return new Command(
			"create_guide",
			new ObjectSchema(true)
				.withRequiredProperty('guide', new GuideV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let guide = args.get("guide");
				return await this._logic.createGuide(correlationId, guide);
			}
		);
	}

	private makeUpdateGuideCommand(): ICommand {
		return new Command(
			"update_guide",
			new ObjectSchema(true)
				.withRequiredProperty('guide', new GuideV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let guide = args.get("guide");
				return await this._logic.updateGuide(correlationId, guide);
			}
		);
	}

	private makeDeleteGuideByIdCommand(): ICommand {
		return new Command(
			"delete_guide_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('guide_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let guideId = args.getAsNullableString("guide_id");
				return await this._logic.deleteGuideById(correlationId, guideId);
			}
		);
	}

}