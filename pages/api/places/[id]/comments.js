import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";
import Comment from "../../../../db/models/Comments";

export default async function handler(request, response) {
  await dbConnect();
  const { id, commentID } = request.query;

  if (request.method === "POST") {
    try {
      const commentData = request.body;
      const newComment = await Comment.create(commentData);

      await Place.findByIdAndUpdate(id, {
        $push: { comments: newComment._id },
      });

      response.status(201).json({ status: "Comment created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const commentID = request.body;
      await Comment.findByIdAndDelete(commentID);

      await Place.findByIdAndUpdate(id, {
        $pull: { comments: commentID },
      });

      response
        .status(200)
        .json({ status: `Comment ${commentID} successfully deleted.` });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
