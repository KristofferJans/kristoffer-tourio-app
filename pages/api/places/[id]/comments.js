import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";
import Comment from "../../../../db/models/Comments";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "POST") {
    try {
      const commentData = request.body;
      const newComment = await Comment.create(commentData);

      const place = await Place.findById(id);
      if (!place) {
        return response.status(404).json({ status: "Place not found" });
      }

      place.comments.push(newComment._id);
      await place.save();

      response.status(201).json({ status: "Comment created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    response
      .status(405)
      .json({ status: `Method ${request.method} not allowed` });
  }
}

// if (request.method === "POST") {
//   try {
//     const commentData = request.body;
//     await Comment.create(commentData);

//     response.status(201).json({ status: "Comment created" });
//   } catch (error) {
//     console.log(error);
//     response.status(400).json({ error: error.message });
//   }
// }
