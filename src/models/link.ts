import mongoose from 'mongoose';

export interface ILink {
	shortLink: string;
	fullLink: string;
};

export type LinkDoc = mongoose.Document&ILink;

interface LinkModelInterface extends mongoose.Model<LinkDoc>{
	build(attr: ILink): LinkDoc;
}

const linkSchema = new mongoose.Schema({
	shortLink: {
		type: String,
		required: true,
	},
	fullLink: {
		type: String,
		required: true,
	},
});

linkSchema.statics.build = (attr: ILink) => {
	return new LinkDb(attr);
};

const LinkDb = mongoose.models.Link || mongoose.model<LinkDoc, LinkModelInterface>('Link', linkSchema);

export {
	LinkDb,
};
