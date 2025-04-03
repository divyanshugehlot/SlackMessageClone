import { get, model } from "mongoose";

export default function cudRepository(Schema){
    return{
        model: model(Schema),
        create: async function (data)  {
           const newDoc = await this.model.create(data);
              return newDoc;

        },
        getAll: async function ()  {
            const allDocs = await this.model.find();
            return allDocs;
        },
        getById: async function (id)  {
            const doc = await this.model.findById(id);
            return doc;
        },
        delete: async function (id)  {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        },
        update:async function (id, data)  {
            const updatedDoc = await this.model.findByIdAndUpdate(id, data, {
                new: true,
                // runValidators: true
            });
            return updatedDoc;
        }
    }
}