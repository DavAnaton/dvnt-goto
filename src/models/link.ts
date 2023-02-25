import mongoose from 'mongoose';
import {IVisit, VisitSchema} from './visit';

export interface ILink {
	shortLink: string;
	fullLink: string;
	visits: IVisit[];
};

export type LinkDoc = mongoose.Document&ILink;

interface LinkModelInterface extends mongoose.Model<LinkDoc>{
	build(attr: ILink): LinkDoc;
}

const LinkSchema = new mongoose.Schema({
	shortLink: {
		type: String,
		required: true,
		index: true,
	},
	fullLink: {
		type: String,
		required: true,
	},
	visits: [VisitSchema],
});

LinkSchema.statics.build = (attr: ILink) => {
	return new LinkDb(attr);
};

const LinkDb = mongoose.models.Link || mongoose.model<LinkDoc, LinkModelInterface>('Link', LinkSchema);

export {
	LinkDb,
};
