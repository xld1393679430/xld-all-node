/* eslint-disable quotes */
module.exports = app => {
  const { mongoose } = app;
  const Schema = mongoose.Schema;
  const ProjectSchema = new Schema({
    name: { type: String },
    value: { type: String },
    npmName: { type: String },
    version: { type: String },
  });

  return mongoose.model("projects", ProjectSchema);
};
