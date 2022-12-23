import {model, Schema, Types} from 'mongoose';

export interface IDocument {
    title: string;
    content: string;
}

export const DcoumentSchema = new Schema<IDocument>(
    {
        title: { type: 'String', required: true},
        content: { type: 'String', required: true},
    },
    {timestamps: true },
)

export const Document = model<IDocument>('documents',DcoumentSchema);