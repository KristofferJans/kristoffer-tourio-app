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
      await Comment.findByIdAndDelete(commentId);

      await Place.findByIdAndUpdate(id, {
        $pull: { comments: commentId },
      });

      response
        .status(200)
        .json({ status: `Comment ${commentId} successfully deleted.` });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
