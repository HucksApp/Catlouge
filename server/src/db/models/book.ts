import mongoose from 'mongoose'


const Schema = mongoose.Schema;


const bookSchema = new Schema({

                        name:{type: String},
                        genre:{type:String},
                        authorId:{type:String}
});





export default mongoose.model('Book', bookSchema)