import mongoose from 'mongoose';

export interface IVisit {
	link: string;
	user: string;
	date: string
};

export type VisitDoc = mongoose.Document&IVisit;

interface VisitModelInterface extends mongoose.Model<VisitDoc>{
	build(attr: IVisit): VisitDoc;
}

const VisitSchema = new mongoose.Schema({
	link: {
		type: String, 
		required: true,
	},
	user: {
		type: String,
		required: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	date: {
		type: Date,
		required: true,
	},
});

VisitSchema.statics.build = (attr: IVisit) => {
	return new VisitDb(attr);
};

const VisitDb = mongoose.models.Visit || mongoose.model<VisitDoc, VisitModelInterface>('Visit', VisitSchema);

export {
	VisitDb,
	VisitSchema,
};
