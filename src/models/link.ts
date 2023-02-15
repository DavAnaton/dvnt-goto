import mongoose from 'mongoose';

interface ILink {
	shortLink: string;
	fullLink: string;
};

export interface LinkDoc extends mongoose.Document {
	shortLink: string;
	fullLink: string;
};

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
	return new Link(attr);
};

const Link = mongoose.models.Link || mongoose.model<LinkDoc, LinkModelInterface>('Link', linkSchema);

export {
	Link,
};
